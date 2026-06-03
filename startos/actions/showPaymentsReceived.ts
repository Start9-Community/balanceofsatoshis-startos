import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showPaymentsReceived = sdk.Action.withoutInput(
  'show-payments-received',

  async ({ effects }) => ({
    name: i18n('Show Payments Received'),
    description: i18n('Show a chart of payments received over time'),
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
      'bos-chart-payments-received',
      async (sub) => sub.execFail(['bos', 'chart-payments-received']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
