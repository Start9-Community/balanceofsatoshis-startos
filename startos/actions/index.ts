import { sdk } from '../sdk'
import { saveTelegramConnectCode } from './saveTelegramConnectCode'
import { showHelp } from './showHelp'
import { showPeers } from './showPeers'
import { showVersion } from './showVersion'

export const actions = sdk.Actions.of()
  .addAction(showPeers)
  .addAction(showVersion)
  .addAction(showHelp)
  .addAction(saveTelegramConnectCode)
