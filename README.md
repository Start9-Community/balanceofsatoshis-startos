<p align="center">
  <img src="icon.png" alt="Balance of Satoshis Logo" width="21%">
</p>

# Balance of Satoshis on StartOS

> **Upstream docs:** <https://github.com/alexbosworth/balanceofsatoshis#readme>
>
> **Command reference:** <https://github.com/alexbosworth/balanceofsatoshis/blob/master/commands/README.md>
>
> Everything not listed in this document should behave the same as upstream
> Balance of Satoshis. If a feature, setting, or behavior is not mentioned
> here, the upstream documentation is accurate and fully applicable.

[Balance of Satoshis](https://github.com/alexbosworth/balanceofsatoshis)
(BoS) is a command-line tool for working with balances on a self-hosted
LND Lightning node. It lets you open balanced channels, manage fees,
inspect HTLCs, and perform a wide range of advanced routing and liquidity
operations. **BoS is a command-line tool only — there is no web UI.**

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Configuration Management](#configuration-management)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Dependencies](#dependencies)
- [Actions](#actions)
- [Telegram](#telegram)
- [Backups and Restore](#backups-and-restore)
- [Health Checks](#health-checks)
- [Limitations and Differences](#limitations-and-differences)
- [What Is Unchanged from Upstream](#what-is-unchanged-from-upstream)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

| Property | Value |
|----------|-------|
| Base image | `node:lts-alpine` (built from local `Dockerfile`) |
| Install method | `npm install -g balanceofsatoshis` |
| Image source | `dockerBuild` (no upstream Docker image is published) |
| Architectures | x86_64, aarch64 |

The image installs `balanceofsatoshis` globally via npm. Upstream does not
publish an official Docker image, so we build one. The pinned release lives
in the `Dockerfile`.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/root` | BoS home directory; holds `.bos/embassy/credentials.json` and any saved nodes, notes, and tags |
| (LND dependency) | `/mnt/lnd` | Read-only access to LND TLS cert and admin macaroon |

BoS runs as root inside the container. This is required so it can read
LND's root-owned `0600` `admin.macaroon`, which is mounted read-only and
cannot be re-permissioned from this side.

**Key paths on the `main` volume:**

- `.bos/embassy/credentials.json` — how BoS reaches LND (managed by StartOS)
- `.bos/telegram_bot_api_key` — the Telegram bot API key (managed by the Set Telegram API Key action; read by BoS directly)
- `.startos/store.json` — package state managed by StartOS (the saved Telegram connect code and on/off flag; see [Telegram](#telegram))

`BOS_DEFAULT_SAVED_NODE=embassy` is set in the daemon environment, which
lets `bos` commands find the saved node without extra flags.

---

## Installation and First-Run Flow

| Step | Upstream | StartOS |
|------|----------|---------|
| Installation | `npm install -g balanceofsatoshis` | Install from marketplace |
| LND connection | Manual `credentials.json` | Auto-generated with correct paths |
| Access | Local shell | SSH to server, exec into container |

**First-run steps:**

1. Install LND on StartOS and let it finish syncing.
2. Install Balance of Satoshis from the marketplace. Read the install
   alert — this service is SSH-only.
3. Configure an SSH key on your StartOS server.
4. SSH into the server and attach to the BoS subcontainer:

   ```bash
   start-cli package attach balanceofsatoshis
   ```

5. Run `bos help` to see the full command list.

---

## Configuration Management

### credentials.json (auto-generated)

| Setting | Default | Purpose |
|---------|---------|---------|
| `cert_path` | `/mnt/lnd/tls.cert` | LND TLS certificate path |
| `macaroon_path` | `/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon` | LND admin macaroon path |
| `socket` | LND's gRPC bridge address (loopback placeholder until resolved) | LND gRPC socket |

`cert_path` and `macaroon_path` are locked to the correct paths for the
bundled LND dependency, enforced on every merge by `z.literal(...).catch(...)`
in the file model. `socket` is resolved reactively from LND's gRPC address
over the LXC bridge and written into the file: the `bridgeAddress` helper in
`utils.ts` maps LND's exported `gRPCHostId`/`gRPCPort` to
`10.0.3.1:<assigned port>` and `main` chains `.const()` on it, so the service
restarts exactly once whenever LND is installed, uninstalled, or moves ports —
never on an LND update, and never on lock/unlock cycles (the binding entry and
assigned port survive). LND binds gRPC only after its wallet is first unlocked;
until then (and while LND is absent) the address resolves null and `socket`
falls back to a `127.0.0.1:10009` loopback placeholder, healing with one
restart when LND's gRPC appears. LND's StartOS-issued cert covers its bridge
address, so the pinned gRPC connection still verifies.

### Environment Variables (fixed)

| Variable | Value | Purpose |
|----------|-------|---------|
| `BOS_DEFAULT_SAVED_NODE` | `embassy` | Default saved-node directory under `~/.bos/` |
| `HOME` | `/root` | Anchors `~/.bos` to the `main` volume |

There is no user-visible configuration. Advanced users can create
additional saved nodes by writing to `/root/.bos/<name>/credentials.json`
from inside the container.

---

## Network Access and Interfaces

Balance of Satoshis does **not** expose any network interface. It is a
command-line tool that speaks to LND's gRPC over the private LXC bridge.
No ports are opened on the host, Tor, or LAN.

Access is via SSH only.

---

## Dependencies

| Dependency | Required | Purpose |
|------------|----------|---------|
| LND | Required | Lightning node to manage |

The LND `main` volume is mounted read-only into the BoS container at
`/mnt/lnd`. BoS uses the admin macaroon, so all destructive LND
operations are available.

---

## Actions

The StartOS UI surfaces convenience actions, grouped by purpose. The reporting
actions are read-only shortcuts that run a single `bos` command and print its
output — they exist so users can glance at node state without attaching a
shell, **not** as a replacement for the CLI. The Telegram actions configure the
optional bot (see [Telegram](#telegram)).

Reporting output is HTML-escaped and wrapped in a `<pre>` tag by
`formatBosOutput` ([`utils.ts`](startos/utils.ts)); the StartOS action-result
modal renders it via `[innerHTML]`, so `<pre>` is what yields monospace +
preserved layout. Lines wider than the modal overflow horizontally (the
sanitizer strips `style`/`class`, so no scrollbar can be added package-side).

**Balance & Liquidity**

| Action | Command |
|--------|---------|
| Show Balance | `bos balance --detailed` |
| Show Inbound Liquidity | `bos inbound-liquidity` |
| Show Outbound Liquidity | `bos outbound-liquidity` |
| Show Report | `bos report` |

**Forwards & Earnings**

| Action | Command |
|--------|---------|
| Show Forwards | `bos forwards` |
| Show Fees Earned | `bos chart-fees-earned` |
| Show Payments Received | `bos chart-payments-received` |

**On-chain Inspection**

| Action | Command |
|--------|---------|
| Show Peers | `bos peers` |
| Show UTXOs | `bos utxos` |
| Show Chain Fees | `bos chainfees` |
| Show Closed Channels | `bos closed` |

**Telegram**

| Action | Effect |
|--------|--------|
| Set Telegram API Key | Writes `~/.bos/telegram_bot_api_key` (run first) |
| Connect Telegram | Saves the `/connect` code to `store.json`, bringing the bot up |
| Enable / Disable Telegram | Toggles the bot on/off without discarding credentials (hidden until an API key is set) |

**Discovery (ungrouped)**

| Action | Command |
|--------|---------|
| Show Version | `bos --version` |
| Show Help | `bos help` |

All other BoS functionality is available from inside the container shell.

---

## Telegram

BoS can post node activity to a Telegram bot and accept commands from it
(upstream `bos telegram`). The whole flow is driven by actions — no shell
required — and the [bot](https://github.com/alexbosworth/balanceofsatoshis/blob/master/telegram/README.md)
reconnects automatically after restarts.

**State (on the `main` volume):**

| Location | Holds | Written by |
|----------|-------|-----------|
| `~/.bos/telegram_bot_api_key` | BotFather API token | Set Telegram API Key action (BoS reads it from here directly) |
| `.startos/store.json` `telegramConnectCode` | `/connect` code | Connect Telegram action |
| `.startos/store.json` `telegramEnabled` | on/off flag (absent/`true` = on) | Enable / Disable Telegram action |

**Mechanism:**

- `main` reads the API key and store via the file models (`.const`), so writing
  any of them re-runs `main` and rebuilds the daemon set — no manual restart.
- The `telegram` daemon is added only when an API key is set **and** the bot is
  enabled. It shares `bosSub` (both daemons `spawn`, so no leader conflict) and
  is supervised — StartOS restarts it on crash. Liveness is the `pgrep -f
  telegram` health check. It deliberately does **not** depend on `primary`
  (`requires: []`): tying it to primary's `bos peers` readiness caused the bot
  to be torn down and reconnected on every transient readiness flap.
- Two phases:
  - **API key, no connect code** → `bos telegram`. The bot runs so you can
    message it `/connect` and obtain your code.
  - **API key + connect code** → `bos telegram --connect <code>`. Fully
    connected, and auto-resumes on every restart.
- Disabling (Enable / Disable Telegram) drops the daemon but keeps the API key
  and connect code, so re-enabling is one click.

End-user setup steps live in `instructions.md`.

---

## Backups and Restore

**Included in backup:**

- `main` volume — credentials.json, saved nodes, notes, and tags

**Restore behavior:**

- Configuration restored; `credentials.json` re-validates against the
  schema on next start, correcting paths automatically if LND's layout
  has changed.

**Note:** BoS stores no funds. All funds reside in LND. Back up LND — not
BoS — to preserve your on-chain and channel state.

---

## Health Checks

| Check | Display Name | Method | Messages |
|-------|--------------|--------|----------|
| Primary daemon | Command Line | Runs `bos peers` in the daemon subcontainer | Ready / Not responding |
| Telegram daemon | Telegram Bot | Runs `pgrep -f telegram` (only present when the bot is configured) | Running / Not running |

A successful `bos peers` invocation means BoS can reach LND using the
generated credentials. The Telegram Bot check appears only when an API key is
set and the bot is enabled (see [Telegram](#telegram)).

---

## Limitations and Differences

1. **No web UI.** BoS is CLI-only.
2. **No external interfaces.** No Tor or LAN interface is declared. BoS
   speaks to LND's gRPC over the private LXC bridge, plus an
   outbound connection to Telegram's API if the bot is configured.
3. **Fixed saved-node name.** `BOS_DEFAULT_SAVED_NODE=embassy` is kept
   for backwards compatibility with existing backups and user snippets.
4. **Minimal user config.** Connection settings are derived from the
   bundled LND dependency; the only user-supplied settings are the optional
   Telegram API key, connect code, and on/off flag (see [Telegram](#telegram)).

---

## What Is Unchanged from Upstream

- Every `bos` subcommand (see the upstream command reference)
- All routing, liquidity, channel management, and reporting features
- gRPC communication with LND via the admin macaroon
- Saved-node files, tags, and notes stored under `~/.bos/`

---

## Quick Reference for AI Consumers

```yaml
package_id: balanceofsatoshis
image: local-dockerBuild (node:lts-alpine + npm balanceofsatoshis)
architectures: [x86_64, aarch64]
volumes:
  main: /root
ports: []
dependencies:
  lnd (required; see manifest for version range)
actions:
  - show-balance
  - show-inbound-liquidity
  - show-outbound-liquidity
  - show-report
  - show-forwards
  - show-fees-earned
  - show-payments-received
  - show-peers
  - show-utxos
  - show-chain-fees
  - show-closed-channels
  - telegram-api-key
  - telegram-connect
  - telegram-toggle
  - show-version
  - show-help
daemons:
  - primary: tail -f /dev/null (readiness via `bos peers`)
  - telegram: bos telegram [--connect <code>] (present only when api key set AND enabled; shares bosSub; requires: [] so primary flaps don't restart it; auto-resumes)
health_checks:
  - primary: bos peers exit == 0
  - telegram: pgrep -f telegram exit == 0 (only when bot configured)
backup_volumes:
  - main
fixed_config:
  BOS_DEFAULT_SAVED_NODE: embassy
  HOME: /root
  credentials.json.cert_path: /mnt/lnd/tls.cert
  credentials.json.macaroon_path: /mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon
  credentials.json.socket: LND gRPC bridge address, resolved over the LXC bridge at each start
telegram_state:
  ~/.bos/telegram_bot_api_key: BotFather API token (managed via telegram-api-key)
  .startos/store.json telegramConnectCode: bot /connect reply (managed via telegram-connect)
  .startos/store.json telegramEnabled: on/off flag, absent = enabled (managed via telegram-toggle)
access: SSH-only; `start-cli package attach balanceofsatoshis`
```
