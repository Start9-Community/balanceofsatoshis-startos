import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, formatBosOutput, lndMount } from '../utils'

export const showChainFees = sdk.Action.withoutInput(
  'show-chain-fees',

  async ({ effects }) => ({
    name: i18n('Show Chain Fees'),
    description: i18n(
      'Show current on-chain fee estimates at common confirmation targets',
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
      'bos-chainfees',
      async (sub) => sub.execFail(['bos', 'chainfees']),
    )

    return {
      version: '1',
      title: i18n('Success'),
      message: formatBosOutput(res.stdout),
      result: null,
    }
  },
)
