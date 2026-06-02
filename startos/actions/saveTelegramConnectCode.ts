import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  connectCode: Value.text({
    name: 'Telegram Connect Code',
    description:
      'Paste the connect code shown by `bos telegram`. Leave empty to disable the bot.',
    required: false,
    default: null,
  }),
})

export const saveTelegramConnectCode = sdk.Action.withInput(
  'save-telegram-connect-code',

  async () => ({
    name: i18n('Save Telegram Connect Code'),
    description: i18n(
      'Store the Telegram connect code for automatic reconnects',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  // Prefill the saved code so opening the action shows the current value and
  // submitting unchanged keeps it (rather than clearing it).
  async () => ({
    connectCode:
      (await storeJson.read((s) => s.telegramConnectCode).once()) ?? '',
  }),

  async ({ effects, input }) => {
    const code = input.connectCode?.trim()
    await storeJson.merge(effects, { telegramConnectCode: code || undefined })

    return {
      version: '1',
      title: i18n('Success'),
      message: code
        ? i18n(
            'Telegram connect code saved. Balance of Satoshis will connect to Telegram automatically.',
          )
        : i18n(
            'Telegram connect code cleared. The Telegram bot will not start.',
          ),
      result: null,
    }
  },
)
