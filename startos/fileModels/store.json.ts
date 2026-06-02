import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

/**
 * Package-owned StartOS state, kept on the (backed-up) `main` volume and
 * separate from BoS's own `~/.bos` files. Currently just the Telegram connect
 * code: BoS's `bos telegram --connect <code>` pairing is one-time and is not
 * persisted by BoS itself, so we store it here and re-run the pairing on every
 * start (see `main.ts`).
 */
export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: '.startos/store.json' },
  z.object({
    telegramConnectCode: z.string().optional().catch(undefined),
  }),
)
