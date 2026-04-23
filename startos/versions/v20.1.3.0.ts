import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_20_1_3_0 = VersionInfo.of({
  version: '20.1.3:0',
  releaseNotes: {
    en_US: 'Ported to StartOS 0.4.0. Packaging rewritten on the new SDK.',
    es_ES: 'Portado a StartOS 0.4.0. Empaquetado reescrito sobre el nuevo SDK.',
    de_DE:
      'Auf StartOS 0.4.0 portiert. Das Paket wurde auf Basis des neuen SDK neu geschrieben.',
    pl_PL: 'Przeniesione na StartOS 0.4.0. Pakiet przepisany na nowym SDK.',
    fr_FR: 'Porte vers StartOS 0.4.0. Packaging reecrit sur le nouveau SDK.',
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
