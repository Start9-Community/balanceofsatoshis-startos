import { i18n } from '../i18n'
import { sdk } from '../sdk'

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
      async (sub) => sub.exec(['bos', '--version'], { user: 'root' }),
    )

    const out = (res.stdout.toString() || res.stderr.toString() || '').trim()

    return {
      version: '1',
      title: i18n('Success'),
      message: out || 'unknown',
      result: null,
    }
  },
)
