import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '25.0.0:1',
  releaseNotes: {
    en_US:
      'Restarting Balance of Satoshis while it is still starting stops every process of the previous run.',
    es_ES:
      'Reiniciar Balance of Satoshis mientras aún se está iniciando detiene todos los procesos de la ejecución anterior.',
    de_DE:
      'Ein Neustart von Balance of Satoshis, während es noch startet, beendet alle Prozesse des vorherigen Laufs.',
    pl_PL:
      'Ponowne uruchomienie Balance of Satoshis w trakcie uruchamiania zatrzymuje wszystkie procesy poprzedniego uruchomienia.',
    fr_FR:
      "Redémarrer Balance of Satoshis pendant son démarrage arrête tous les processus de l'exécution précédente.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
