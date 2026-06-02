export const DEFAULT_LANG = 'en_US'

const dict = {
  // main.ts
  'Starting Balance of Satoshis...': 0,
  'Command Line': 1,
  'Balance of Satoshis is ready': 2,
  'Balance of Satoshis is not responding': 3,

  // actions
  'Show Peers': 4,
  'List the peers currently connected to your LND node': 5,
  'Show Version': 6,
  'Show the installed Balance of Satoshis version': 7,
  'Show Help': 8,
  'List all available Balance of Satoshis commands': 9,
  Success: 10,
  'Save Telegram Connect Code': 11,
  'Store the Telegram connect code for automatic reconnects': 12,
  'Telegram connect code saved. Balance of Satoshis will connect to Telegram automatically.': 13,
  'Telegram connect code cleared. The Telegram bot will not start.': 17,

  // main.ts (Telegram daemon)
  'Telegram Bot': 14,
  'The Telegram bot is running': 15,
  'The Telegram bot is not running': 16,
} as const

/**
 * Plumbing. DO NOT EDIT.
 */
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
