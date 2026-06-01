import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { telegramConnectCode } from '../fileModels/telegramConnectCode'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  connectCode: Value.text({
    name: 'Telegram Connect Code',
    description: 'Paste the Telegram connect code from bos telegram',
    required: true,
    default: '',
  }),
})

export const saveTelegramConnectCode = sdk.Action.withInput(
  'save-telegram-connect-code',
	
async () => ({
  name: 'Save Telegram Connect Code',
  description: 'Store the Telegram connect code for automatic reconnects',
  warning: null,
  allowedStatuses: 'any',
  group: null,
  visibility: 'enabled',
}),

inputSpec,

async () => ({}),

async ({ effects, input }) => {
  await telegramConnectCode.write(
    effects,
    input.connectCode.trim()
  )

  return {
    version: '1',
    title: i18n('Success'),
    message:
      'Telegram connect code saved. Restart the Balance of Satoshis service once to activate automatic Telegram reconnect.',
    result: null,
  }
},
)
