import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const current = VersionInfo.of({
  version: '22.0.1:3',
  releaseNotes: {
    en_US:
      'New UI shortcut actions let you check node state without opening a shell: balance, liquidity, report, forwards, fees earned, payments received, peers, UTXOs, chain fees, and closed channels. Telegram is now set up and managed entirely from the UI — set your bot API key, connect with the code your bot replies, and enable or disable the bot at any time. It runs supervised, reconnects automatically after restarts, and no longer restarts when node readiness briefly flaps.',
    es_ES:
      'Nuevas acciones rápidas en la interfaz permiten consultar el estado del nodo sin abrir una terminal: balance, liquidez, informe, reenvíos, comisiones ganadas, pagos recibidos, pares, UTXOs, comisiones en cadena y canales cerrados. Telegram ahora se configura y gestiona por completo desde la interfaz: establece la clave API de tu bot, conéctalo con el código que te responde el bot y actívalo o desactívalo cuando quieras. Se ejecuta supervisado, se reconecta automáticamente tras los reinicios y ya no se reinicia cuando la disponibilidad del nodo fluctúa brevemente.',
    de_DE:
      'Neue Schnellaktionen in der Benutzeroberfläche zeigen den Knotenstatus an, ohne eine Shell zu öffnen: Guthaben, Liquidität, Bericht, Weiterleitungen, verdiente Gebühren, empfangene Zahlungen, Peers, UTXOs, On-Chain-Gebühren und geschlossene Kanäle. Telegram lässt sich jetzt vollständig über die Benutzeroberfläche einrichten und verwalten: Bot-API-Schlüssel festlegen, mit dem vom Bot gesendeten Code verbinden und den Bot jederzeit aktivieren oder deaktivieren. Er läuft überwacht, verbindet sich nach Neustarts automatisch wieder und startet nicht mehr neu, wenn die Bereitschaft des Knotens kurz schwankt.',
    pl_PL:
      'Nowe akcje skrótów w interfejsie pozwalają sprawdzić stan węzła bez otwierania powłoki: saldo, płynność, raport, przekazania, zarobione opłaty, otrzymane płatności, peery, UTXO, opłaty on-chain i zamknięte kanały. Telegram można teraz w pełni skonfigurować i obsługiwać z poziomu interfejsu: ustaw klucz API bota, połącz go kodem, który odsyła bot, oraz włączaj i wyłączaj bota w dowolnej chwili. Działa pod nadzorem, automatycznie łączy się ponownie po restartach i nie restartuje się już, gdy gotowość węzła chwilowo się waha.',
    fr_FR:
      "De nouvelles actions de raccourci dans l'interface permettent de consulter l'état du nœud sans ouvrir de shell : solde, liquidité, rapport, transferts, frais gagnés, paiements reçus, pairs, UTXO, frais on-chain et canaux fermés. Telegram se configure et se gère désormais entièrement depuis l'interface : définissez la clé API de votre bot, connectez-le avec le code qu'il vous envoie, puis activez ou désactivez-le à tout moment. Il s'exécute sous supervision, se reconnecte automatiquement après les redémarrages et ne redémarre plus lorsque la disponibilité du nœud fluctue brièvement.",
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
