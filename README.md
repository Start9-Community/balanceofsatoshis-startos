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
| BoS version | `balanceofsatoshis@20.1.3` (installed via `npm install -g`) |
| Image source | `dockerBuild` (no upstream Docker image is published) |
| Architectures | x86_64, aarch64 |

The image installs `balanceofsatoshis` globally via npm. Upstream does not
publish an official Docker image, so we build one. The `BOS_VERSION` build
arg in the Dockerfile controls the pinned release.

---

## Volume and Data Layout

| Volume | Mount Point | Purpose |
|--------|-------------|---------|
| `main` | `/root` | BoS home directory; holds `.bos/embassy/credentials.json` and any saved nodes, notes, and tags |
| (LND dependency) | `/mnt/lnd` | Read-only access to LND TLS cert and admin macaroon |

**Key paths on the `main` volume:**

- `.bos/embassy/credentials.json` — how BoS reaches LND (managed by StartOS)

`BOS_DEFAULT_SAVED_NODE=embassy` is set in the daemon environment. This
preserves the 0.3.5.1 on-disk layout and lets `bos` commands find the
saved node without extra flags.

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
4. SSH into the server and open a shell in the BoS container:

   ```bash
   sudo podman exec -it balanceofsatoshis.startos /bin/bash
   ```

5. Run `bos help` to see the full command list.

---

## Configuration Management

### credentials.json (auto-generated)

| Setting | Default | Purpose |
|---------|---------|---------|
| `cert_path` | `/mnt/lnd/tls.cert` | LND TLS certificate path |
| `macaroon_path` | `/mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon` | LND admin macaroon path |
| `socket` | `lnd.startos:10009` | LND gRPC socket |

All three values are locked to the correct paths for the bundled LND
dependency. They are enforced on every merge by `z.literal(...).catch(...)`
in the file model, so manual edits are corrected automatically.

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
command-line tool that speaks to LND over the private `lnd.startos` gRPC
socket. No ports are opened on the host, Tor, or LAN.

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

The StartOS UI surfaces three convenience actions. They are not a
substitute for a shell — they exist so users can confirm connectivity
without SSH'ing in.

| Action | Purpose |
|--------|---------|
| Show Peers | Run `bos peers` and display the output |
| Show Version | Display the installed BoS version |
| Show Help | Display `bos help` for command discovery |

All other BoS functionality is available from inside the container shell.

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

A successful `bos peers` invocation means BoS can reach LND using the
generated credentials.

---

## Limitations and Differences

1. **No web UI.** All 0.3.5.1 behavior is preserved — this service was
   always CLI-only.
2. **No external interfaces.** The 0.3.5.1 manifest declared a Tor/LAN
   network interface with `ui: false`, but nothing actually listened on
   it. The 0.4.0 port drops the vestigial interface declaration.
3. **Fixed saved-node name.** `BOS_DEFAULT_SAVED_NODE=embassy` is kept
   for backwards compatibility with existing backups and snippets. The
   on-disk layout matches 0.3.5.1.
4. **No user config.** The 0.3.5.1 package exposed no config surface; the
   0.4.0 port does the same.

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
image: local-dockerBuild (node:lts-alpine + npm balanceofsatoshis@20.1.3)
architectures: [x86_64, aarch64]
volumes:
  main: /root
ports: []
dependencies:
  lnd (required, >=0.20.1-beta:1)
actions:
  - show-peers
  - show-version
  - show-help
health_checks:
  - primary: bos peers exit == 0
backup_volumes:
  - main
fixed_config:
  BOS_DEFAULT_SAVED_NODE: embassy
  HOME: /root
  credentials.json.cert_path: /mnt/lnd/tls.cert
  credentials.json.macaroon_path: /mnt/lnd/data/chain/bitcoin/mainnet/admin.macaroon
  credentials.json.socket: lnd.startos:10009
access: SSH-only; `sudo podman exec -it balanceofsatoshis.startos /bin/bash`
```
