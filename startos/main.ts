import { storeJson } from './fileModels/store.json'
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
   * Re-runs `main` whenever the saved connect code changes, so writing it via
   * the Save Telegram Connect Code action brings the bot up without a manual
   * restart.
   */
  const connectCode = (
    await storeJson.read((s) => s.telegramConnectCode).const(effects)
  )?.trim()

  /**
   * ======================== Daemons ========================
   *
   * BoS is a CLI tool. We run a long-lived idle daemon so that users can
   * `podman exec` into the container and invoke `bos` commands, and we
   * expose the `bos peers` check as the readiness indicator.
   *
   * BoS runs as root so it can read LND's root-owned 0600 admin.macaroon
   * from the read-only LND volume mount.
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
   * When a connect code has been saved, run the Telegram bot as its own
   * supervised daemon — StartOS restarts it if it crashes, and `requires`
   * orders it after `primary` so LND is reachable before it connects.
   */
  if (!connectCode) return daemons

  return daemons.addDaemon('telegram', {
    subcontainer: bosSub,
    exec: {
      command: ['bos', 'telegram', '--connect', connectCode],
    },
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
