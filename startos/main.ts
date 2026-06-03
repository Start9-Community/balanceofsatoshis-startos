import { storeJson } from './fileModels/store.json'
import { telegramApiKey } from './fileModels/telegramApiKey'
import { i18n } from './i18n'
import { sdk } from './sdk'
import { bosHomeDir, lndMount } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup ========================
   */
  console.info(i18n('Starting Balance of Satoshis...'))

  const mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: bosHomeDir,
      readonly: false,
    })
    .mountDependency({
      dependencyId: 'lnd',
      volumeId: 'main',
      subpath: null,
      mountpoint: lndMount,
      readonly: true,
    })

  const bosSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'balanceofsatoshis' },
    mounts,
    'balanceofsatoshis-sub',
  )

  /**
   * Telegram state. Read through the file models so that writing them (via the
   * Telegram actions) re-runs `main` and rebuilds the daemon set below — no
   * manual restart needed.
   *
   * - The API key lives at `~/.bos/telegram_bot_api_key` because BoS reads it
   *   from there directly; its presence gates whether we run the bot at all.
   * - The connect code and on/off flag live in the package `store.json`.
   *
   * Absent (or `true`) `telegramEnabled` counts as enabled, so the bot comes up
   * as soon as an API key is set.
   */
  const apiKey = await telegramApiKey.read().const(effects)
  const store = await storeJson.read().const(effects)
  const connectCode = store?.telegramConnectCode?.trim()
  const telegramEnabled = store?.telegramEnabled !== false

  /**
   * ======================== Daemons ========================
   *
   * `primary` is a long-lived idle process that keeps the subcontainer alive so
   * users can `start-cli package attach` in and run `bos` commands. Its
   * readiness check (`bos peers`) doubles as the LND-reachability signal.
   *
   * BoS runs as root so it can read LND's root-owned 0600 admin.macaroon from
   * the read-only LND volume mount.
   */
  const daemons = sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: bosSub,
    exec: {
      command: ['tail', '-f', '/dev/null'],
    },
    ready: {
      display: i18n('Command Line'),
      fn: async () => {
        const res = await bosSub.exec(['bos', 'peers'])
        if (res.exitCode === 0) {
          return {
            result: 'success',
            message: i18n('Balance of Satoshis is ready'),
          }
        }
        return {
          result: 'loading',
          message: i18n('Balance of Satoshis is not responding'),
        }
      },
      gracePeriod: 15_000,
    },
    requires: [],
  })

  /**
   * The `telegram` daemon is added only once an API key has been saved AND the
   * bot is enabled. It shares `bosSub` (both daemons `spawn` into it, so they
   * don't conflict).
   *
   *   - API key, no connect code  -> `bos telegram`
   *     The bot runs so you can message it `/connect` and get your code.
   *   - API key + connect code    -> `bos telegram --connect <code>`
   *     The authorized, fully-connected bot.
   *
   * StartOS supervises and restarts it on crash; the `pgrep` health check
   * reports real liveness. It deliberately does NOT `requires: ['primary']`:
   * `bos telegram` tolerates LND not being reachable yet, and tying it to
   * primary's `bos peers` readiness caused the bot to be torn down and
   * reconnected on every transient readiness flap.
   */
  if (!apiKey || !telegramEnabled) return daemons

  const command: [string, ...string[]] = connectCode
    ? ['bos', 'telegram', '--connect', connectCode]
    : ['bos', 'telegram']

  return daemons.addDaemon('telegram', {
    subcontainer: bosSub,
    exec: { command },
    ready: {
      display: i18n('Telegram Bot'),
      fn: () =>
        sdk.healthCheck.runHealthScript(['pgrep', '-f', 'telegram'], bosSub, {
          errorMessage: i18n('The Telegram bot is not running'),
          message: () => i18n('The Telegram bot is running'),
        }),
      gracePeriod: 30_000,
    },
    requires: [],
  })
})
