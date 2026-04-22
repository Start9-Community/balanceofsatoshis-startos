import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_20_1_3_0 = VersionInfo.of({
  version: '20.1.3:0',
  releaseNotes: {
    en_US:
      'Balance of Satoshis v20.1.3 ported to StartOS 0.4.0. Packaging rewritten on top of @start9labs/start-sdk 1.2.1.',
    es_ES:
      'Balance of Satoshis v20.1.3 portado a StartOS 0.4.0. Empaquetado reescrito sobre @start9labs/start-sdk 1.2.1.',
    de_DE:
      'Balance of Satoshis v20.1.3 wurde auf StartOS 0.4.0 portiert. Das Paket wurde auf Basis von @start9labs/start-sdk 1.2.1 neu geschrieben.',
    pl_PL:
      'Balance of Satoshis v20.1.3 przeniesione na StartOS 0.4.0. Pakiet przepisany na @start9labs/start-sdk 1.2.1.',
    fr_FR:
      'Balance of Satoshis v20.1.3 porte vers StartOS 0.4.0. Packaging reecrit sur la base de @start9labs/start-sdk 1.2.1.',
  },
  migrations: {
    up: async ({ effects }) => {
      // Clean up legacy 0.3.5.1 `start9` directory if present on the main
      // volume. BoS 0.3.5.1 did not create anything meaningful there but
      // other start9 wrappers did, so we follow the same sweep pattern.
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(() => {})
    },
    down: IMPOSSIBLE,
  },
})
