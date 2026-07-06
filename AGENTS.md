# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (architecture, for developers and LLMs) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Package id is `balanceofsatoshis`.** This is a command-line-only service: it binds no ports and exports no service interface (`setInterfaces` returns `[]`). Users interact with it by SSH'ing into the server and running `bos` commands inside the container.
- **Hard dependency on LND.** BoS mounts LND's `main` volume read-only at `/mnt/lnd` to read `tls.cert` and the admin macaroon, and reaches LND's gRPC over the LXC bridge — `main.ts` resolves LND's gRPC bridge address through the reactive `bridgeAddress` helper in `utils.ts` (mapping `gRPCHostId`/`gRPCPort` imported from `lnd-startos/startos/interfaces` to `10.0.3.1:<assigned port>`) and writes the resolved `host:port` into the saved-node `credentials.json`. The helper is chained with `.const()`, so the map reads `host.bindings[gRPCPort].net.assignedPort` (never `addressInfo` hostnames) and `main` restarts only when that port actually changes — not on LND updates or lock/unlock cycles. LND binds gRPC only after its wallet is first unlocked; until then (and while LND is absent) the address resolves null and `socket` is left unset (`z.string().optional().catch(undefined)`) rather than pointed at an unreachable placeholder, so `bos peers` reports not-yet-ready and `main` heals with one restart when LND's gRPC appears. LND's StartOS-issued cert covers its bridge address, so the pinned connection still verifies.
- **Saved node is named `embassy`** (kept for backwards compatibility). Its credentials live on the `main` volume at `.bos/embassy/credentials.json`; with `main` mounted at `/root`, BoS finds them at `~/.bos/embassy/credentials.json`.
- **Optional Telegram bot** runs as a second daemon, gated by the API-key file (`~/.bos/telegram_bot_api_key`) and the `telegramEnabled` flag in the package `store.json`; both are managed by the Telegram actions, which re-run `main` on write.

## Inspecting a running install

To run a command inside the service's container (read its generated config, grep app logs), use `start-cli package attach balanceofsatoshis -n balanceofsatoshis-sub -- <cmd>`. Select the subcontainer by **name** with `-n` (the name passed to `SubContainer.of` in `main.ts` — here `balanceofsatoshis-sub`) or by image with `-i`. Note: `-s/--subcontainer` matches the internal **Guid**, not the name, so passing a name to `-s` fails with "no matching subcontainers".
