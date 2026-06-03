import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { formatBosOutput } from '../utils'

export const showHelp = sdk.Action.withoutInput(
  'show-help',

  async ({ effects }) => ({
    name: i18n('Show Help'),
    description: i18n('List all available Balance of Satoshis commands'),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const res = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'balanceofsatoshis' },
      sdk.Mounts.of(),
      'bos-help',
      async (sub) => sub.execFail(['bos', 'help']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
