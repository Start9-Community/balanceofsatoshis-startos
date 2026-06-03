import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showOutboundLiquidity = sdk.Action.withoutInput(
  'show-outbound-liquidity',

  async ({ effects }) => ({
    name: i18n('Show Outbound Liquidity'),
    description: i18n('Show the total outbound (local) channel liquidity'),
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
      'bos-outbound-liquidity',
      async (sub) => sub.execFail(['bos', 'outbound-liquidity']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
