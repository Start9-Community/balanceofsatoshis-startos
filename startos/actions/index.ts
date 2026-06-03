import { sdk } from '../sdk'
import { connectTelegram } from './connectTelegram'
import { setTelegramApiKey } from './setTelegramApiKey'
import { showBalance } from './showBalance'
import { showChainFees } from './showChainFees'
import { showClosedChannels } from './showClosedChannels'
import { showFeesEarned } from './showFeesEarned'
import { showForwards } from './showForwards'
import { showHelp } from './showHelp'
import { showInboundLiquidity } from './showInboundLiquidity'
import { showOutboundLiquidity } from './showOutboundLiquidity'
import { showPaymentsReceived } from './showPaymentsReceived'
import { showPeers } from './showPeers'
import { showReport } from './showReport'
import { showUtxos } from './showUtxos'
import { showVersion } from './showVersion'
import { toggleTelegram } from './toggleTelegram'

export const actions = sdk.Actions.of()
  // Balance & Liquidity
  .addAction(showBalance)
  .addAction(showInboundLiquidity)
  .addAction(showOutboundLiquidity)
  .addAction(showReport)
  // Forwards & Earnings
  .addAction(showForwards)
  .addAction(showFeesEarned)
  .addAction(showPaymentsReceived)
  // On-chain Inspection
  .addAction(showPeers)
  .addAction(showUtxos)
  .addAction(showChainFees)
  .addAction(showClosedChannels)
  // Telegram
  .addAction(setTelegramApiKey)
  .addAction(connectTelegram)
  .addAction(toggleTelegram)
  // Discovery
  .addAction(showVersion)
  .addAction(showHelp)
