import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * Package-owned StartOS state, kept on the (backed-up) `main` volume and
 * separate from BoS's own `~/.bos` files.
 *
 * - `telegramConnectCode`: BoS's `bos telegram --connect <code>` pairing is
 *   one-time and is not persisted by BoS itself, so we store it here and
 *   re-run the pairing on every start (see `main.ts`).
 * - `telegramEnabled`: on/off switch for the Telegram bot, toggled by the
 *   Enable/Disable Telegram action. Absent or `true` means enabled, so the
 *   bot comes up as soon as an API key is set. Disabling stops the bot
 *   without discarding the saved connect code.
 */
export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '.startos/store.json' },
  z.object({
    telegramConnectCode: z.string().optional().catch(undefined),
    telegramEnabled: z.boolean().optional().catch(undefined),
  }),
)
