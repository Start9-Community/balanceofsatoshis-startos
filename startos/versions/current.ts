import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '25.0.0:0',
  releaseNotes: {
    en_US: `Updated Balance of Satoshis to 25.0.0.

**Breaking changes**

- The \`price\`, \`change-channel-capacity\`, \`services\`, \`triggers\` and \`use\` commands are removed.

**Features**

- New \`pending\` command shows pending channels and in-flight HTLCs.
- \`invoice\` can hide your node behind blinded paths (\`--encrypted-hints\`), and \`pay\` and \`probe\` can pay invoices that use them.
- \`fees\` and \`rebalance\` can repeat on an interval with \`--repeat-interval-ms\`.
- Support for LND 0.21.4 and 0.20.5.

**Package**

- The unused network interface left behind by the StartOS 0.3.5 version of this package is removed and its port freed.
- Show Balance, Show Report and the other reporting actions display their output in a field you can copy, and each multi-line report can also be downloaded as a text file.
- Enable Telegram and Disable Telegram ask for confirmation before running.

[Full changelog](https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md)`,
    es_ES: `Balance of Satoshis actualizado a 25.0.0.

**Cambios incompatibles**

- Se eliminan los comandos \`price\`, \`change-channel-capacity\`, \`services\`, \`triggers\` y \`use\`.

**Novedades**

- El nuevo comando \`pending\` muestra los canales pendientes y los HTLC en curso.
- \`invoice\` puede ocultar tu nodo tras rutas cegadas (\`--encrypted-hints\`), y \`pay\` y \`probe\` pueden pagar facturas que las usan.
- \`fees\` y \`rebalance\` pueden repetirse a intervalos con \`--repeat-interval-ms\`.
- Compatibilidad con LND 0.21.4 y 0.20.5.

**Paquete**

- Se elimina la interfaz de red sin uso que dejó la versión de este paquete para StartOS 0.3.5 y se libera su puerto.
- «Mostrar balance», «Mostrar informe» y las demás acciones de consulta presentan su resultado en un campo que puedes copiar, y cada informe de varias líneas también se puede descargar como archivo de texto.
- «Activar Telegram» y «Desactivar Telegram» piden confirmación antes de ejecutarse.

[Registro de cambios completo](https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md)`,
    de_DE: `Balance of Satoshis auf 25.0.0 aktualisiert.

**Inkompatible Änderungen**

- Die Befehle \`price\`, \`change-channel-capacity\`, \`services\`, \`triggers\` und \`use\` wurden entfernt.

**Neuerungen**

- Der neue Befehl \`pending\` zeigt ausstehende Kanäle und laufende HTLCs an.
- \`invoice\` kann deinen Knoten hinter verschleierten Pfaden (Blinded Paths) verbergen (\`--encrypted-hints\`), und \`pay\` und \`probe\` können Rechnungen bezahlen, die sie verwenden.
- \`fees\` und \`rebalance\` lassen sich mit \`--repeat-interval-ms\` in einem Intervall wiederholen.
- Unterstützung für LND 0.21.4 und 0.20.5.

**Paket**

- Die ungenutzte Netzwerkschnittstelle, die die StartOS-0.3.5-Version dieses Pakets hinterlassen hatte, wird entfernt und ihr Port freigegeben.
- „Saldo anzeigen“, „Bericht anzeigen“ und die übrigen Auswertungsaktionen zeigen ihre Ausgabe in einem Feld, das du kopieren kannst; jeder mehrzeilige Bericht lässt sich außerdem als Textdatei herunterladen.
- „Telegram aktivieren“ und „Telegram deaktivieren“ fragen vor der Ausführung nach einer Bestätigung.

[Vollständiges Änderungsprotokoll](https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md)`,
    pl_PL: `Zaktualizowano Balance of Satoshis do wersji 25.0.0.

**Zmiany niekompatybilne**

- Usunięto polecenia \`price\`, \`change-channel-capacity\`, \`services\`, \`triggers\` i \`use\`.

**Nowości**

- Nowe polecenie \`pending\` pokazuje oczekujące kanały i HTLC w toku.
- \`invoice\` może ukryć twój węzeł za zaślepionymi ścieżkami (\`--encrypted-hints\`), a \`pay\` i \`probe\` mogą opłacać faktury, które z nich korzystają.
- \`fees\` i \`rebalance\` mogą powtarzać się cyklicznie dzięki \`--repeat-interval-ms\`.
- Obsługa LND 0.21.4 i 0.20.5.

**Pakiet**

- Nieużywany interfejs sieciowy pozostawiony przez wersję tego pakietu dla StartOS 0.3.5 zostaje usunięty, a jego port zwolniony.
- „Pokaż saldo”, „Pokaż raport” i pozostałe akcje raportowe wyświetlają wynik w polu, które możesz skopiować, a każdy wielowierszowy raport można też pobrać jako plik tekstowy.
- „Włącz Telegram” i „Wyłącz Telegram” proszą o potwierdzenie przed uruchomieniem.

[Pełny dziennik zmian](https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md)`,
    fr_FR: `Balance of Satoshis mis à jour en 25.0.0.

**Changements incompatibles**

- Les commandes \`price\`, \`change-channel-capacity\`, \`services\`, \`triggers\` et \`use\` sont supprimées.

**Nouveautés**

- La nouvelle commande \`pending\` affiche les canaux en attente et les HTLC en cours.
- \`invoice\` peut masquer votre nœud derrière des chemins aveuglés (\`--encrypted-hints\`), et \`pay\` et \`probe\` peuvent payer les factures qui les utilisent.
- \`fees\` et \`rebalance\` peuvent se répéter à intervalle régulier avec \`--repeat-interval-ms\`.
- Prise en charge de LND 0.21.4 et 0.20.5.

**Paquet**

- L'interface réseau inutilisée laissée par la version de ce paquet pour StartOS 0.3.5 est supprimée et son port libéré.
- « Afficher le solde », « Afficher le rapport » et les autres actions de consultation présentent leur résultat dans un champ que vous pouvez copier, et chaque rapport sur plusieurs lignes peut aussi être téléchargé comme fichier texte.
- « Activer Telegram » et « Désactiver Telegram » demandent une confirmation avant de s'exécuter.

[Journal des modifications complet](https://github.com/alexbosworth/balanceofsatoshis/blob/master/CHANGELOG.md)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
