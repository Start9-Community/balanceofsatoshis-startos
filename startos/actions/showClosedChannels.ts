import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showClosedChannels = sdk.Action.withoutInput(
  'show-closed-channels',

  async ({ effects }) => ({
    name: i18n('Show Closed Channels'),
    description: i18n(
      'Show on-chain resolution details for recently closed channels',
    ),
    warning: null,
    allowedStatuses: 'only-running',
    group: i18n('On-chain Inspection'),
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const res = await sdk.SubContainer.withTemp(
      effects,
      { imageId: 'balanceofsatoshis' },
      sdk.Mounts.of()
        .mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint: bosHomeDir,
          readonly: true,
        })
        .mountDependency({
          dependencyId: 'lnd',
          volumeId: 'main',
          subpath: null,
          mountpoint: lndMount,
          readonly: true,
        }),
      'bos-closed',
      async (sub) => sub.execFail(['bos', 'closed']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
