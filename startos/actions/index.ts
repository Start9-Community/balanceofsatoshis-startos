import { sdk } from '../sdk'
import { showHelp } from './showHelp'
import { showPeers } from './showPeers'
import { showVersion } from './showVersion'

export const actions = sdk.Actions.of()
  .addAction(showPeers)
  .addAction(showVersion)
  .addAction(showHelp)
