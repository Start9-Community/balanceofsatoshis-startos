import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showFeesEarned = sdk.Action.withoutInput(
  'show-fees-earned',

  async ({ effects }) => ({
    name: i18n('Show Fees Earned'),
    description: i18n('Show a chart of routing fees earned over time'),
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
      'bos-chart-fees-earned',
      async (sub) => sub.execFail(['bos', 'chart-fees-earned']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
