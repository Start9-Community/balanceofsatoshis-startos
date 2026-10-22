import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '25.0.0:2',
  releaseNotes: {
    en_US: 'Updates Node.js to 24.22.1 with security fixes.',
    es_ES: 'Actualiza Node.js a 24.22.1 con correcciones de seguridad.',
    de_DE: 'Aktualisiert Node.js auf 24.22.1 mit Sicherheitskorrekturen.',
    pl_PL: 'Aktualizuje Node.js do wersji 24.22.1 z poprawkami bezpieczeństwa.',
    fr_FR: 'Met à jour Node.js vers 24.22.1 avec des correctifs de sécurité.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
