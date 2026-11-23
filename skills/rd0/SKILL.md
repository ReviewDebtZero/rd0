---
name: rd0
description: Before opening or updating a pull request, check the change for review debt with the rd0 tools - Fence (edits outside the task), Trellis (broken repo rules and agent slop) and Jinx (an open PR that already does this). Use whenever you are about to open a PR, push to a PR branch, or are asked to self-review a change.
---

# rd0: review debt, to zero

Run three cheap, offline checks on your branch before a human reviews it. No LLM, no API key, CPU only.

| Tool | Question it answers |
|---|---|
| Fence | Did I change more than the task asked for? |
| Trellis | Did I break a rule written in AGENTS.md / CLAUDE.md, or leave slop (workaround comments, bare suppressions, commented-out code)? |
| Jinx | Is there already an open PR doing the same work? |

## Install (once)

```bash
pip install rd0-jinx rd0-trellis \
  "git+https://github.com/ReviewDebtZero/rd0-fence#subdirectory=packages/rd0-fence"
```

Jinx needs the open-PR list; with the GitHub CLI logged in (`gh auth status`), the script fetches it.

## Run

1. Save the task **verbatim** to a file: the user's original request, or the linked issue/ticket title and body.
   Do not summarise or rewrite it. A paraphrase lets the scope check excuse your own extra changes.
2. Commit your work, then run from the repo root:

```bash
<this skill dir>/scripts/rd0-check.sh --title "<task title, verbatim>" --body-file task.txt --base origin/main
```

Pass `--queue open_prs.json` instead of relying on `gh` when the repo is not on GitHub (a JSON list of
`{number, title, body, files: [paths]}`).

## Act on the results

- **Fence flags a file:** revert the change unless the task needs it. If it is needed, say why in the PR
  description, one line per flagged file. Never widen the task text to make Fence pass.
- **Fence says scope is unknown:** the task names nothing concrete. Tell the user and ask which files or
  modules are in scope instead of guessing.
- **Trellis finding:** apply the `fix:` it prints. If `trellis check` reports an error-level rule got worse,
  fix it before opening the PR.
- **Jinx lists an open PR with a high score or shared files and a matching title:** stop. Tell the user which
  PR already covers the work and ask whether to continue, build on it, or close yours. Read the reasons, not
  just the score: a match under the threshold that shares the same files and intent is still worth raising.
- **Report** a short summary in the PR description: what each check found and what you did about it.

These checks advise; they do not replace review or CI. If the repo runs the rd0 GitHub Actions, they run
again on the PR independently of you.

## Optional, once per repo

`trellis audit .` lists written rules that no tool enforces and prints lint config (ESLint, Ruff,
import-linter) for the checkable ones. Offer it to the user; do not change their lint config unasked.
