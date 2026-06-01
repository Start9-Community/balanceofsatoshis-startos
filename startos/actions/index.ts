import { sdk } from '../sdk'
import { showHelp } from './showHelp'
import { showPeers } from './showPeers'
import { showVersion } from './showVersion'
import { saveTelegramConnectCode } from './saveTelegramConnectCode'

export const actions = sdk.Actions.of()
  .addAction(showPeers)
  .addAction(showVersion)
  .addAction(showHelp)
  .addAction(saveTelegramConnectCode)
