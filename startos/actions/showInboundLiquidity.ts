import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showInboundLiquidity = sdk.Action.withoutInput(
  'show-inbound-liquidity',

  async ({ effects }) => ({
    name: i18n('Show Inbound Liquidity'),
    description: i18n('Show the total inbound (remote) channel liquidity'),
    warning: null,
    allowedStatuses: 'only-running',
    group: i18n('Balance & Liquidity'),
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
      'bos-inbound-liquidity',
      async (sub) => sub.execFail(['bos', 'inbound-liquidity']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
