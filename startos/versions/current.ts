import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '22.1.7:0',
  releaseNotes: {
    en_US:
      'Updated Balance of Satoshis to 22.1.7.\n\n' +
      'Highlights since 22.0.1:\n' +
      '- Added support for LND 0.21.0 and 0.21.1\n' +
      '- Improved SOCKS proxy support on older Node.js versions\n' +
      '- Dropped support for LND 0.19 and below\n\n' +
      'Changelog: https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md\n\n' +
      'Also includes internal updates for start-sdk 2.0.',
    es_ES:
      'Balance of Satoshis actualizado a 22.1.7.\n\n' +
      'Novedades desde 22.0.1:\n' +
      '- Compatibilidad con LND 0.21.0 y 0.21.1\n' +
      '- Mejor compatibilidad con el proxy SOCKS en versiones antiguas de Node.js\n' +
      '- Se retira la compatibilidad con LND 0.19 y anteriores\n\n' +
      'Registro de cambios: https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md\n\n' +
      'También incluye actualizaciones internas para start-sdk 2.0.',
    de_DE:
      'Balance of Satoshis auf 22.1.7 aktualisiert.\n\n' +
      'Höhepunkte seit 22.0.1:\n' +
      '- Unterstützung für LND 0.21.0 und 0.21.1 hinzugefügt\n' +
      '- Verbesserte SOCKS-Proxy-Unterstützung auf älteren Node.js-Versionen\n' +
      '- Unterstützung für LND 0.19 und älter entfernt\n\n' +
      'Änderungsprotokoll: https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md\n\n' +
      'Enthält außerdem interne Aktualisierungen für start-sdk 2.0.',
    pl_PL:
      'Zaktualizowano Balance of Satoshis do 22.1.7.\n\n' +
      'Najważniejsze zmiany od 22.0.1:\n' +
      '- Dodano obsługę LND 0.21.0 i 0.21.1\n' +
      '- Ulepszona obsługa proxy SOCKS na starszych wersjach Node.js\n' +
      '- Usunięto obsługę LND 0.19 i starszych\n\n' +
      'Lista zmian: https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md\n\n' +
      'Zawiera również wewnętrzne aktualizacje dla start-sdk 2.0.',
    fr_FR:
      'Balance of Satoshis mis à jour vers 22.1.7.\n\n' +
      'Nouveautés depuis 22.0.1 :\n' +
      '- Prise en charge de LND 0.21.0 et 0.21.1\n' +
      '- Meilleure prise en charge du proxy SOCKS sur les anciennes versions de Node.js\n' +
      '- Fin de la prise en charge de LND 0.19 et versions antérieures\n\n' +
      'Journal des modifications : https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md\n\n' +
      'Comprend également des mises à jour internes pour start-sdk 2.0.',
  },
  migrations: {
    up: async ({ effects }) => {
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(() => {})
    },
    down: IMPOSSIBLE,
  },
})
