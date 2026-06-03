# Balance of Satoshis

Balance of Satoshis is command-line only. To use it day-to-day you connect to your StartOS server over SSH and run `bos` commands inside the service's container. Set up an SSH key on your server before installing, or this service will be unreachable.

## Documentation

- [Balance of Satoshis README](https://github.com/alexbosworth/balanceofsatoshis#readme) — upstream overview, install notes, and configuration guidance.
- [Balance of Satoshis command reference](https://github.com/alexbosworth/balanceofsatoshis/blob/master/commands/README.md) — every `bos` subcommand with flags and examples.

## What you get on StartOS

- A `bos` CLI globally installed in the service's container, pre-wired to talk to the bundled LND dependency over its private gRPC socket — no manual `credentials.json` editing.
- A persistent `~/.bos` directory on the `main` volume that survives restarts and is included in backups (saved nodes, tags, notes).
- A set of StartOS UI actions: read-only reporting shortcuts, plus actions that set up the optional Telegram bot end-to-end — all without opening a shell.

There is no web interface and no network port — `bos` is reached only via SSH.

## Getting set up

1. Install LND first and let it finish syncing. Balance of Satoshis cannot start without it.
2. Configure an SSH key on your StartOS server if you haven't already (see the Start9 SSH guide in the StartOS docs).
3. Start Balance of Satoshis from its service page.
4. SSH into your StartOS server and open a shell in the container:

   ```bash
   start-cli package attach balanceofsatoshis
   ```

5. Run `bos help` to see the full command list, then `bos peers` to confirm BoS can reach LND.

## Using Balance of Satoshis

The CLI is the interface. Inside the container shell you have the full `bos` command set; the upstream command reference above is the canonical guide. The saved node is named `embassy` and is selected automatically, so you can omit `--node` from any command.

### Actions

The service page also exposes actions you can run from the StartOS UI without opening a shell. The reporting actions are quick read-only shortcuts — they are **not** a substitute for the CLI.

**Balance & Liquidity:** Show Balance, Show Inbound Liquidity, Show Outbound Liquidity, Show Report.

**Forwards & Earnings:** Show Forwards, Show Fees Earned, Show Payments Received.

**On-chain Inspection:** Show Peers, Show UTXOs, Show Chain Fees, Show Closed Channels.

**Discovery:** Show Version, Show Help.

**Telegram:** Set Telegram API Key, Connect Telegram, Enable / Disable Telegram (see below).

## Telegram bot (optional)

Balance of Satoshis can run a [Telegram bot](https://github.com/alexbosworth/balanceofsatoshis/blob/master/telegram/README.md) for node notifications and commands. The whole setup is done from the service page — no shell needed:

1. Create a bot with [@BotFather](https://t.me/BotFather) on Telegram and copy its API token.
2. Run the **Set Telegram API Key** action and paste the token. The bot starts running.
3. In Telegram, message your new bot `/connect`. It replies with a numeric connect code.
4. Run the **Connect Telegram** action and paste that code.

The bot then connects and **reconnects automatically after every restart** — you don't need to set it up again; your API key and connect code are saved. To turn the bot off (and keep it off across restarts without losing your saved details), run the **Enable / Disable Telegram** action; run it again to turn it back on.
