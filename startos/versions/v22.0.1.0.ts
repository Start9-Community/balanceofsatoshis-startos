import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_22_0_1_0 = VersionInfo.of({
  version: '22.0.1:0',
  releaseNotes: {
    en_US: `**Bumps**

- Balance of Satoshis → 22.0.1
- start-sdk → 1.5.0`,
    es_ES: `**Actualizaciones**

- Balance of Satoshis → 22.0.1
- start-sdk → 1.5.0`,
    de_DE: `**Aktualisierungen**

- Balance of Satoshis → 22.0.1
- start-sdk → 1.5.0`,
    pl_PL: `**Aktualizacje**

- Balance of Satoshis → 22.0.1
- start-sdk → 1.5.0`,
    fr_FR: `**Mises à jour**

- Balance of Satoshis → 22.0.1
- start-sdk → 1.5.0`,
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
