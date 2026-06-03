import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { formatBosOutput } from '../utils'

export const showVersion = sdk.Action.withoutInput(
  'show-version',

  async ({ effects }) => ({
    name: i18n('Show Version'),
    description: i18n('Show the installed Balance of Satoshis version'),
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
      'bos-version',
      async (sub) => sub.execFail(['bos', '--version']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
