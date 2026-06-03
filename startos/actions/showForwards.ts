import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showForwards = sdk.Action.withoutInput(
  'show-forwards',

  async ({ effects }) => ({
    name: i18n('Show Forwards'),
    description: i18n('Show a per-peer summary of recent forwarding activity'),
    warning: null,
    allowedStatuses: 'only-running',
    group: i18n('Forwards & Earnings'),
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
      'bos-forwards',
      async (sub) => sub.execFail(['bos', 'forwards']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
