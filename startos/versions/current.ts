import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '23.1.6:0',
  releaseNotes: {
    en_US: `Balance of Satoshis 23.1.6, which understands the LND you are actually running.

The previous release supported LND up to 0.21.1, and LND on StartOS has since moved past that. This version adds support for LND 0.21.2 and 0.20.3, adds \`--avoid-append\` to build an avoid list from a formula, and drops two dependencies.

One upstream change is worth knowing about if you write your own formulas: version 23 narrowed the set of functions they accept to the list at github.com/alexbosworth/formulas. Nothing this package does from the service page uses formulas — the actions are all reporting and Telegram setup — so this only matters for formulas you type yourself in the shell.

The instructions also linked two upstream pages that no longer exist; \`bos help <command>\` is now given as the per-command reference, since it comes from the version you have installed.`,
    es_ES: `Balance of Satoshis 23.1.6, que entiende el LND que realmente estás ejecutando.

La versión anterior admitía LND hasta la 0.21.1, y LND en StartOS ya la ha superado. Esta versión añade compatibilidad con LND 0.21.2 y 0.20.3, incorpora \`--avoid-append\` para construir una lista de exclusión a partir de una fórmula y elimina dos dependencias.

Un cambio de upstream conviene conocerlo si escribes tus propias fórmulas: la versión 23 redujo el conjunto de funciones que aceptan a la lista de github.com/alexbosworth/formulas. Nada de lo que este paquete hace desde la página del servicio usa fórmulas —las acciones son de informes y configuración de Telegram—, así que esto solo afecta a las fórmulas que escribas tú en la terminal.

Las instrucciones también enlazaban a dos páginas de upstream que ya no existen; ahora se indica \`bos help <comando>\` como referencia por comando, porque procede de la versión que tienes instalada.`,
    de_DE: `Balance of Satoshis 23.1.6, das das LND versteht, das du tatsächlich betreibst.

Die vorherige Version unterstützte LND bis 0.21.1, und LND auf StartOS ist inzwischen darüber hinaus. Diese Version ergänzt Unterstützung für LND 0.21.2 und 0.20.3, fügt \`--avoid-append\` hinzu, um eine Ausschlussliste aus einer Formel zu erzeugen, und entfernt zwei Abhängigkeiten.

Eine Upstream-Änderung ist wichtig, falls du eigene Formeln schreibst: Version 23 hat die Menge der zulässigen Funktionen auf die Liste unter github.com/alexbosworth/formulas eingeschränkt. Nichts, was dieses Paket über die Dienstseite tut, verwendet Formeln — die Aktionen sind Auswertungen und die Telegram-Einrichtung —, das betrifft also nur Formeln, die du selbst in der Shell eingibst.

Die Anleitung verwies außerdem auf zwei Upstream-Seiten, die es nicht mehr gibt; als Referenz je Befehl wird jetzt \`bos help <Befehl>\` genannt, da sie aus der installierten Version stammt.`,
    pl_PL: `Balance of Satoshis 23.1.6, który rozumie LND, na którym faktycznie działasz.

Poprzednie wydanie obsługiwało LND do wersji 0.21.1, a LND na StartOS już ją wyprzedził. Ta wersja dodaje obsługę LND 0.21.2 i 0.20.3, wprowadza \`--avoid-append\` do budowania listy wykluczeń na podstawie formuły oraz usuwa dwie zależności.

Jedna zmiana w upstreamie jest istotna, jeśli piszesz własne formuły: wersja 23 zawęziła zbiór akceptowanych funkcji do listy pod adresem github.com/alexbosworth/formulas. Nic, co ten pakiet robi ze strony usługi, nie korzysta z formuł — akcje to raporty i konfiguracja Telegrama — więc dotyczy to wyłącznie formuł wpisywanych przez Ciebie w powłoce.

Instrukcje odsyłały też do dwóch stron upstreamu, które już nie istnieją; jako referencję dla pojedynczego polecenia podano teraz \`bos help <polecenie>\`, ponieważ pochodzi ona z zainstalowanej wersji.`,
    fr_FR: `Balance of Satoshis 23.1.6, qui comprend le LND que vous exécutez réellement.

La version précédente prenait en charge LND jusqu'à 0.21.1, et LND sur StartOS a depuis dépassé cette version. Celle-ci ajoute la prise en charge de LND 0.21.2 et 0.20.3, introduit \`--avoid-append\` pour construire une liste d'exclusion à partir d'une formule, et retire deux dépendances.

Un changement en amont mérite d'être connu si vous écrivez vos propres formules : la version 23 a restreint l'ensemble des fonctions acceptées à la liste publiée sur github.com/alexbosworth/formulas. Rien de ce que ce paquet fait depuis la page du service n'utilise de formules — les actions relèvent du rapport et de la configuration de Telegram — cela ne concerne donc que les formules que vous saisissez vous-même dans le shell.

Les instructions renvoyaient par ailleurs vers deux pages amont qui n'existent plus ; \`bos help <commande>\` est désormais indiqué comme référence par commande, puisqu'elle provient de la version que vous avez installée.`,
  },
  migrations: {},
})
