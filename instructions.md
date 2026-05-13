# Balance of Satoshis

Balance of Satoshis is command-line only. To use it day-to-day you connect to your StartOS server over SSH and run `bos` commands inside the service's container. Set up an SSH key on your server before installing, or this service will be unreachable.

## Documentation

- [Balance of Satoshis README](https://github.com/alexbosworth/balanceofsatoshis#readme) — upstream overview, install notes, and configuration guidance.
- [Balance of Satoshis command reference](https://github.com/alexbosworth/balanceofsatoshis/blob/master/commands/README.md) — every `bos` subcommand with flags and examples.

## What you get on StartOS

- A `bos` CLI globally installed in the service's container, pre-wired to talk to the bundled LND dependency over its private gRPC socket — no manual `credentials.json` editing.
- A persistent `~/.bos` directory on the `main` volume that survives restarts and is included in backups (saved nodes, tags, notes).
- A small set of read-only convenience actions in the StartOS UI so you can sanity-check connectivity without opening a shell.

There is no web interface and no network port — `bos` is reached only via SSH.

## Getting set up

1. Install LND first and let it finish syncing. Balance of Satoshis cannot start without it.
2. Configure an SSH key on your StartOS server if you haven't already (see the Start9 SSH guide in the StartOS docs).
3. Start Balance of Satoshis from its service page.
4. SSH into your StartOS server and open a shell in the container:

   ```bash
   sudo podman exec -it balanceofsatoshis.startos /bin/bash
   ```

5. Run `bos help` to see the full command list, then `bos peers` to confirm BoS can reach LND.

## Using Balance of Satoshis

The CLI is the interface. Inside the container shell you have the full `bos` command set; the upstream command reference above is the canonical guide. The saved node is named `embassy` and is selected automatically, so you can omit `--node` from any command.

### Actions

The service page also exposes three read-only actions you can run from the StartOS UI without opening a shell:

- **Show Peers** — runs `bos peers` and shows the connected peer list. Useful as a quick "is LND reachable?" check.
- **Show Version** — shows the installed `bos` version.
- **Show Help** — shows the full `bos help` command list, the same output you'd see in the shell.
