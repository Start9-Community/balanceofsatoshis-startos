import { T } from '@start9labs/start-sdk'
import { gRPCPort as lndGrpcPort } from 'lnd-startos/startos/interfaces'
import { sdk } from './sdk'

/**
 * Bridge address (`10.0.3.1:<assigned external port>`) of a dependency's
 * binding, as a minimal reactive value. Chain `.const()` in main: the mapped
 * string only changes when the address itself does, so main restarts exactly
 * on dependency install/uninstall/port-change and never on dependency
 * updates. Chain `.once()` in an action context. `fallbackPort` keeps the
 * value non-null while the dependency is absent — sanctioned only for tor's
 * allocator-guaranteed SOCKS 9050. Drop-in for the planned SDK
 * `sdk.host.getBridgeAddress` helper.
 */
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort: number
  },
): { const(): Promise<string>; once(): Promise<string> }
export function bridgeAddress(
  effects: T.Effects,
  opts: { packageId: string; hostId: string; internalPort: number },
): { const(): Promise<string | null>; once(): Promise<string | null> }
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort?: number
  },
) {
  const watchable = async () => {
    const osIp = await sdk.getOsIp(effects)
    return sdk.host.get(
      effects,
      { packageId: opts.packageId, hostId: opts.hostId },
      (host) => {
        const port =
          host?.bindings[opts.internalPort]?.net.assignedPort ??
          opts.fallbackPort
        return port != null ? `${osIp}:${port}` : null
      },
    )
  }
  return {
    const: async () => (await watchable()).const(),
    once: async () => (await watchable()).once(),
  }
}

export const bosSavedNode = 'embassy' as const
export const bosHomeDir = '/root' as const
export const lndMount = '/mnt/lnd' as const
/**
 * Loopback placeholder for BoS's saved-node `socket`. `main` resolves LND's
 * gRPC bridge address reactively (see `bridgeAddress`) and writes the real
 * `host:port` into credentials.json; this stands in only while LND is absent
 * or before its wallet is first unlocked (gRPC binds at unlock), and as the
 * file model's `.catch()` seed. A dead loopback is just connection-refused,
 * which BoS's `bos peers` readiness reports as not-yet-ready — and `main`
 * heals with one restart the moment LND's gRPC binding appears.
 */
export const lndPlaceholderSocket = `127.0.0.1:${lndGrpcPort}` as const
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
