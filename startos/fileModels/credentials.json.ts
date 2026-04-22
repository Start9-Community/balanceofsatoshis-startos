import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import {
  bosSavedNode,
  lndCertPath,
  lndMacaroonPath,
  lndSocket,
} from '../utils'

const shape = z.object({
  cert_path: z.literal(lndCertPath).catch(lndCertPath),
  macaroon_path: z.literal(lndMacaroonPath).catch(lndMacaroonPath),
  socket: z.literal(lndSocket).catch(lndSocket),
})

/**
 * BoS reads credentials from
 *   ~/.bos/<saved-node>/credentials.json
 *
 * `bosSavedNode` is set to `embassy` (preserved for backwards compatibility
 * with the 0.3.5.1 package). The file lives on the `main` volume at
 * `./.bos/embassy/credentials.json` and, with `main` mounted at `/root`
 * inside the subcontainer, appears as `/root/.bos/embassy/credentials.json`
 * which is exactly where BoS looks.
 */
export const credentialsJson = FileHelper.json(
  {
    base: sdk.volumes.main,
    subpath: `./.bos/${bosSavedNode}/credentials.json`,
  },
  shape,
)
