import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { bosHomeDir, bosSavedNode, lndMount } from '../utils'

export const showPeers = sdk.Action.withoutInput(
  'show-peers',

  async ({ effects }) => ({
    name: i18n('Show Peers'),
    description: i18n('List the peers currently connected to your LND node'),
    warning: null,
    allowedStatuses: 'only-running',
    group: null,
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
      'bos-peers',
      async (sub) =>
        sub.exec(['bos', 'peers'], {
          user: 'root',
          env: {
            BOS_DEFAULT_SAVED_NODE: bosSavedNode,
            HOME: bosHomeDir,
          },
        }),
    )

    const out = res.stdout.toString() || res.stderr.toString() || ''

    return {
      version: '1',
      title: i18n('Success'),
      message: out,
      result: null,
    }
  },
)
