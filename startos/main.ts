import { i18n } from './i18n'
import { sdk } from './sdk'
import { bosHomeDir, bosSavedNode, lndMount } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup ========================
   */
  console.info(i18n('Starting Balance of Satoshis...'))

  const mounts = sdk.Mounts.of()
    .mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: bosHomeDir,
      readonly: false,
    })
    .mountDependency({
      dependencyId: 'lnd',
      volumeId: 'main',
      subpath: null,
      mountpoint: lndMount,
      readonly: true,
    })

  const bosSub = await sdk.SubContainer.of(
    effects,
    { imageId: 'balanceofsatoshis' },
    mounts,
    'balanceofsatoshis-sub',
  )

  /**
   * ======================== Daemons ========================
   *
   * BoS is a CLI tool. We run a long-lived idle daemon so that users can
   * `podman exec` into the container and invoke `bos` commands, and we
   * expose the `bos peers` check as the readiness indicator.
   */
  return sdk.Daemons.of(effects)
    .addOneshot('prepare-config', {
      subcontainer: bosSub,
      exec: {
        command: [
          'sh',
          '-c',
          // FileHelper.json wrote the file with mode 0600; BoS needs to be
          // able to read it. Also make sure the directory tree is executable.
          `mkdir -p ${bosHomeDir}/.bos/${bosSavedNode} && chmod -R a+rX ${bosHomeDir}/.bos`,
        ],
        user: 'root',
      },
      requires: [],
    })
    .addDaemon('primary', {
      subcontainer: bosSub,
      exec: {
        command: ['tail', '-f', '/dev/null'],
        env: {
          BOS_DEFAULT_SAVED_NODE: bosSavedNode,
          HOME: bosHomeDir,
        },
      },
      ready: {
        display: i18n('Command Line'),
        fn: async () => {
          const res = await bosSub.exec(['bos', 'peers'], { user: 'root' })
          if (res.exitCode === 0) {
            return {
              result: 'success',
              message: i18n('Balance of Satoshis is ready'),
            }
          }
          return {
            result: 'loading',
            message: i18n('Balance of Satoshis is not responding'),
          }
        },
        gracePeriod: 15_000,
      },
      requires: ['prepare-config'],
    })
})
