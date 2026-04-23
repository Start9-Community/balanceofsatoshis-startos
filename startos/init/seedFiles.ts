import { credentialsJson } from '../fileModels/credentials.json'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  await credentialsJson.merge(effects, {})
})
