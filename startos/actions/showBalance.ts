import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showBalance = sdk.Action.withoutInput(
  'show-balance',

  async ({ effects }) => ({
    name: i18n('Show Balance'),
    description: i18n(
      'Show a detailed breakdown of on-chain, off-chain, and pending balances',
    ),
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
      'bos-balance',
      async (sub) => sub.execFail(['bos', 'balance', '--detailed']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
