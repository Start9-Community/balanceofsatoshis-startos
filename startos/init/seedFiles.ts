import { credentialsJson } from '../fileModels/credentials.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  // Seed credentials.json with the literal defaults declared in the schema.
  // BoS reads this file from ~/.bos/embassy/credentials.json to know how to
  // reach the local LND node.
  await credentialsJson.merge(effects, {})
})
