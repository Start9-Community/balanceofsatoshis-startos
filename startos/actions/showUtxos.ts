import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showUtxos = sdk.Action.withoutInput(
  'show-utxos',

  async ({ effects }) => ({
    name: i18n('Show UTXOs'),
    description: i18n('List on-chain UTXOs held by the node'),
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
      'bos-utxos',
      async (sub) => sub.execFail(['bos', 'utxos']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
