# AGENTS.md

This is a StartOS service-package repository — it builds a `.s9pk` for StartOS.

Develop it inside a StartOS packaging workspace created by `start-cli s9pk init-workspace`,
which provides the packaging guide and agent context one level up. If you're reading this in a
bare clone with no workspace, the full guide is at <https://docs.start9.com/packaging>.

Work this package's `TODO.md` from top to bottom. Keep `README.md` (technical reference for an AI support or administering agent) and `instructions.md` (end-user docs) in sync with your changes.

## This repo

- **Import LND's host id and port from `lnd-startos/startos/interfaces`** rather than hardcoding, so a change on LND's side is a compile error here.
- **The `telegram` daemon must stay `requires: []`.** Tying it to `primary`'s `bos peers` readiness tore the bot down and re-paired it on every transient flap; `bos telegram` tolerates LND being unreachable on its own.
- **The saved node is `embassy` and cannot be renamed.** It is the 0.3.5.1 package's name, and existing users' backups and command snippets depend on it.
- **`BOS_DEFAULT_SAVED_NODE` lives in the `Dockerfile`, not in `main.ts`.** The daemon is given no environment; don't document or add one without checking which side actually sets the value.
