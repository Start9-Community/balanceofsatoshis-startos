import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '22.0.1:3',
  releaseNotes: {
    en_US:
      'Mitigate Telegram bot reconnect loops by allowing the Telegram daemon to continue running during temporary primary readiness failures. Updated docs for StartOS 0.4 shell access.',

    de_DE:
      'Reduziert Telegram-Bot-Reconnect-Schleifen, indem der Telegram-Daemon bei temporären Readiness-Problemen des Hauptdienstes weiterläuft. Dokumentation für den Shell-Zugriff unter StartOS 0.4 aktualisiert.',

    es_ES:
      'Reduce los bucles de reconexión del bot de Telegram permitiendo que el daemon de Telegram siga ejecutándose durante fallos temporales de disponibilidad del servicio principal. Documentación actualizada para el acceso a la consola en StartOS 0.4.',

    pl_PL:
      'Ogranicza pętle ponownego łączenia bota Telegram, pozwalając demonowi Telegram działać dalej podczas tymczasowych problemów z gotowością głównej usługi. Zaktualizowano dokumentację dostępu do powłoki dla StartOS 0.4.',

    fr_FR:
      'Réduit les boucles de reconnexion du bot Telegram en permettant au démon Telegram de continuer à fonctionner lors de défaillances temporaires de disponibilité du service principal. Documentation mise à jour pour l’accès au shell sous StartOS 0.4.',
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
