import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '22.0.1:2',
  releaseNotes: {
    en_US:
      'The Telegram bot now reconnects automatically after restarts: save your connect code with the new "Save Telegram Connect Code" action. Updated to start-sdk 1.5.3.',
    es_ES:
      'El bot de Telegram ahora se reconecta automáticamente tras los reinicios: guarda tu código de conexión con la nueva acción "Guardar código de conexión de Telegram". Actualizado a start-sdk 1.5.3.',
    de_DE:
      'Der Telegram-Bot verbindet sich nach Neustarts jetzt automatisch wieder: Speichern Sie Ihren Verbindungscode mit der neuen Aktion „Telegram-Verbindungscode speichern". Aktualisierung auf start-sdk 1.5.3.',
    pl_PL:
      'Bot Telegram łączy się teraz automatycznie po ponownym uruchomieniu: zapisz kod połączenia za pomocą nowej akcji „Zapisz kod połączenia Telegram". Zaktualizowano do start-sdk 1.5.3.',
    fr_FR:
      'Le bot Telegram se reconnecte désormais automatiquement après un redémarrage : enregistrez votre code de connexion avec la nouvelle action « Enregistrer le code de connexion Telegram ». Mise à jour vers start-sdk 1.5.3.',
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
