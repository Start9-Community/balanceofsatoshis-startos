import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '23.1.6:1',
  releaseNotes: {
    en_US: `- The unused network interface left behind by the StartOS 0.3.5 version of this package is removed and its port freed.
- Show Balance, Show Report and the other reporting actions display their output in a field you can copy, and each multi-line report can also be downloaded as a text file.
- Enable Telegram and Disable Telegram ask for confirmation before running.`,
    es_ES: `- Se elimina la interfaz de red sin uso que dejó la versión de este paquete para StartOS 0.3.5 y se libera su puerto.
- «Mostrar balance», «Mostrar informe» y las demás acciones de consulta presentan su resultado en un campo que puedes copiar, y cada informe de varias líneas también se puede descargar como archivo de texto.
- «Activar Telegram» y «Desactivar Telegram» piden confirmación antes de ejecutarse.`,
    de_DE: `- Die ungenutzte Netzwerkschnittstelle, die die StartOS-0.3.5-Version dieses Pakets hinterlassen hatte, wird entfernt und ihr Port freigegeben.
- „Saldo anzeigen“, „Bericht anzeigen“ und die übrigen Auswertungsaktionen zeigen ihre Ausgabe in einem Feld, das du kopieren kannst; jeder mehrzeilige Bericht lässt sich außerdem als Textdatei herunterladen.
- „Telegram aktivieren“ und „Telegram deaktivieren“ fragen vor der Ausführung nach einer Bestätigung.`,
    pl_PL: `- Nieużywany interfejs sieciowy pozostawiony przez wersję tego pakietu dla StartOS 0.3.5 zostaje usunięty, a jego port zwolniony.
- „Pokaż saldo”, „Pokaż raport” i pozostałe akcje raportowe wyświetlają wynik w polu, które możesz skopiować, a każdy wielowierszowy raport można też pobrać jako plik tekstowy.
- „Włącz Telegram” i „Wyłącz Telegram” proszą o potwierdzenie przed uruchomieniem.`,
    fr_FR: `- L'interface réseau inutilisée laissée par la version de ce paquet pour StartOS 0.3.5 est supprimée et son port libéré.
- « Afficher le solde », « Afficher le rapport » et les autres actions de consultation présentent leur résultat dans un champ que vous pouvez copier, et chaque rapport sur plusieurs lignes peut aussi être téléchargé comme fichier texte.
- « Activer Telegram » et « Désactiver Telegram » demandent une confirmation avant de s'exécuter.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.MultiHost.of(effects, 'main').retire()
    },
    down: IMPOSSIBLE,
  },
})
