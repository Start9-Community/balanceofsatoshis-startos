import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_22_0_1_1 = VersionInfo.of({
  version: '22.0.1:1',
  releaseNotes: {
    en_US: 'Updated to start-sdk 1.5.2.',
    es_ES: 'Actualizado a start-sdk 1.5.2.',
    de_DE: 'Aktualisierung auf start-sdk 1.5.2.',
    pl_PL: 'Zaktualizowano do start-sdk 1.5.2.',
    fr_FR: 'Mise à jour vers start-sdk 1.5.2.',
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
