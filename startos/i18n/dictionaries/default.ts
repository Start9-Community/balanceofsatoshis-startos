export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Balance of Satoshis...': 0,
  'Command Line': 1,
  'Balance of Satoshis is ready': 2,
  'Balance of Satoshis is not responding': 3,

  // actions — discovery / connectivity
  'Show Peers': 4,
  'List the peers currently connected to your LND node': 5,
  'Show Version': 6,
  'Show the installed Balance of Satoshis version': 7,
  'Show Help': 8,
  'List all available Balance of Satoshis commands': 9,
  Success: 10,

  // actions — reporting shortcuts
  'Show Balance': 11,
  'Show a detailed breakdown of on-chain, off-chain, and pending balances': 12,
  'Show Report': 13,
  'Show a general activity report for your node': 14,
  'Show Inbound Liquidity': 15,
  'Show the total inbound (remote) channel liquidity': 16,
  'Show Outbound Liquidity': 17,
  'Show the total outbound (local) channel liquidity': 18,
  'Show Forwards': 19,
  'Show a per-peer summary of recent forwarding activity': 20,
  'Show Fees Earned': 21,
  'Show a chart of routing fees earned over time': 22,
  'Show Payments Received': 23,
  'Show a chart of payments received over time': 24,
  'Show UTXOs': 25,
  'List on-chain UTXOs held by the node': 26,
  'Show Chain Fees': 27,
  'Show current on-chain fee estimates at common confirmation targets': 28,
  'Show Closed Channels': 29,
  'Show on-chain resolution details for recently closed channels': 30,

  // action groups
  'Balance & Liquidity': 31,
  'Forwards & Earnings': 32,
  'On-chain Inspection': 33,
  Telegram: 34,

  // set telegram api key
  'Set Telegram API Key': 35,
  'Store the Telegram bot API key so Balance of Satoshis can connect to your bot (run first)': 36,
  'Telegram Bot API Key': 37,
  'The HTTP API token issued by @BotFather when you created your Telegram bot. Looks like 123456789:ABCdef...': 38,
  'API key saved. In Telegram, send your bot /connect to get your code, then run Connect Telegram.': 39,

  // connect telegram
  'Connect Telegram': 40,
  'Connect the running Telegram bot using the code it gave you after /connect. The bot then runs and auto-resumes after service restarts.': 41,
  'Telegram Connect Code': 42,
  'The numeric code your bot replies with when you send it /connect on Telegram': 43,
  'Connect code must be a positive integer': 44,
  'Connect code saved. The Telegram bot is connected and will auto-resume after service restarts.': 45,

  // enable / disable telegram
  'Disable Telegram': 46,
  'Enable Telegram': 47,
  'Stop the Telegram bot now and keep it off across restarts. Your API key and connect code are kept, so you can re-enable it any time.': 48,
  'Start the Telegram bot again using your saved API key and connect code, and resume it automatically after restarts.': 49,
  'Telegram bot disabled.': 50,
  'Telegram bot enabled.': 51,

  // telegram daemon (main.ts)
  'Telegram Bot': 52,
  'The Telegram bot is running': 53,
  'The Telegram bot is not running': 54,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
