import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  connectCode: Value.text({
    name: i18n('Telegram Connect Code'),
    description: i18n(
      'The numeric code your bot replies with when you send it /connect on Telegram',
    ),
    required: true,
    default: null,
    inputmode: 'tel',
    minLength: 1,
    patterns: [
      {
        regex: '^\\d+$',
        description: i18n('Connect code must be a positive integer'),
      },
    ],
  }),
})

export const connectTelegram = sdk.Action.withInput(
  'telegram-connect',

  async ({ effects }) => ({
    name: i18n('Connect Telegram'),
    description: i18n(
      'Connect the running Telegram bot using the code it gave you after /connect. The bot then runs and auto-resumes after service restarts.',
    ),
    warning: null,
    allowedStatuses: 'only-running',
    group: i18n('Telegram'),
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const current = await storeJson.read((s) => s.telegramConnectCode).once()
    return { connectCode: current ?? undefined }
  },

  async ({ effects, input }) => {
    // Saved to the package store; `main` reads it via `.const` and brings the
    // bot up (with `--connect`) without an explicit restart.
    await storeJson.merge(effects, { telegramConnectCode: input.connectCode })
    return {
      version: '1',
      title: i18n('Success'),
      message: i18n(
        'Connect code saved. The Telegram bot is connected and will auto-resume after service restarts.',
      ),
      result: null,
    }
  },
)
