export const bosSavedNode = 'embassy' as const
export const bosHomeDir = '/root' as const
export const lndMount = '/mnt/lnd' as const
export const lndGrpcPort = 10009 as const
/**
 * Fallback socket only. `.startos` DNS is deprecated in favor of the LXC
 * bridge; `main` resolves LND's gRPC bridge address (`sdk.host.get` on LND's
 * exported `gRPCHostId`) and writes the real `host:port` into
 * credentials.json — this literal is just the file model's `.catch()` default
 * before that runs. LND's StartOS-issued cert covers its bridge address, so
 * pinning that address still verifies.
 */
export const lndSocket = `lnd.startos:${lndGrpcPort}` as const
export const lndCertPath = `${lndMount}/tls.cert` as const
export const lndMacaroonPath =
  `${lndMount}/data/chain/bitcoin/mainnet/admin.macaroon` as const

/**
 * Escape `&`, `<`, `>` for safe insertion into HTML text. StartOS renders
 * an action result's `message` via Taiga's dialog template, which uses
 * `[innerHTML]` and runs Angular's `DomSanitizer` — meaning any unescaped
 * `<...>` in raw command output would be parsed as HTML (and most likely
 * stripped). Escape first, then wrap in `<pre>` to get monospace +
 * preserved whitespace.
 */
export const htmlEscape = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Wrap arbitrary CLI stdout for display in a StartOS action-result modal.
 * `<pre>` is the path that survives Angular's HTML sanitizer and gives
 * us the browser UA defaults `font-family: monospace` +
 * `white-space: pre` — so the bos command's text output renders with
 * preserved newlines and column alignment exactly as it would in a
 * terminal. Lines wider than the modal overflow horizontally; the
 * `style` and `class` attributes are both stripped by the sanitizer,
 * so there is no way to add a scrollbar or wrap from this side.
 */
export const formatBosOutput = (stdout: string | Buffer): string =>
  `<pre>${htmlEscape(stdout.toString().trim())}</pre>`
