import { storeJson } from '../fileModels/store.json'
import { telegramApiKey } from '../fileModels/telegramApiKey'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

/**
 * Dynamic on/off toggle for the Telegram bot. Reads the current enabled state
 * to present as either "Enable Telegram" or "Disable Telegram", flips the
 * `telegramEnabled` flag in the package store, and lets `main` re-run (it reads
 * the store via `.const`) to add or remove the telegram daemon. Credentials
 * (API key + connect code) are never touched, so disabling stops the bot now
 * and re-enabling brings it straight back.
 *
 * Hidden until an API key has been saved — there is nothing to toggle before
 * then.
 */
export const toggleTelegram = sdk.Action.withoutInput(
  'telegram-toggle',

  async ({ effects }) => {
    const apiKey = await telegramApiKey.read().const(effects)
    const enabled =
      (await storeJson.read((s) => s.telegramEnabled).const(effects)) !== false

    return {
      name: enabled ? i18n('Disable Telegram') : i18n('Enable Telegram'),
      description: enabled
        ? i18n(
            'Stop the Telegram bot now and keep it off across restarts. Your API key and connect code are kept, so you can re-enable it any time.',
          )
        : i18n(
            'Start the Telegram bot again using your saved API key and connect code, and resume it automatically after restarts.',
          ),
      warning: null,
      allowedStatuses: 'only-running',
      group: i18n('Telegram'),
      visibility: apiKey ? 'enabled' : 'hidden',
    }
  },

  async ({ effects }) => {
    const enabled =
      (await storeJson.read((s) => s.telegramEnabled).once()) !== false
    await storeJson.merge(effects, { telegramEnabled: !enabled })

    return {
      version: '1',
      title: i18n('Success'),
      message: enabled
        ? i18n('Telegram bot disabled.')
        : i18n('Telegram bot enabled.'),
      result: null,
    }
  },
)
