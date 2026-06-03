import { telegramApiKey } from '../fileModels/telegramApiKey'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  apiKey: Value.text({
    name: i18n('Telegram Bot API Key'),
    description: i18n(
      'The HTTP API token issued by @BotFather when you created your Telegram bot. Looks like 123456789:ABCdef...',
    ),
    required: true,
    default: null,
    masked: true,
    minLength: 1,
  }),
})

export const setTelegramApiKey = sdk.Action.withInput(
  'telegram-api-key',

  async ({ effects }) => ({
    name: i18n('Set Telegram API Key'),
    description: i18n(
      'Store the Telegram bot API key so Balance of Satoshis can connect to your bot (run first)',
    ),
    warning: null,
    allowedStatuses: 'only-running',
    group: i18n('Telegram'),
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const current = await telegramApiKey.read().once()
    return { apiKey: current ?? undefined }
  },

  async ({ effects, input }) => {
    // Writing through the file model re-runs `main` (which reads this key via
    // `.const`), so the bot comes up without an explicit restart.
    await telegramApiKey.write(effects, input.apiKey)
    return {
      version: '1',
      title: i18n('Success'),
      message: i18n(
        'API key saved. In Telegram, send your bot /connect to get your code, then run Connect Telegram.',
      ),
      result: null,
    }
  },
)
