## Before opening a PR (rd0)

Install once: `pip install rd0-jinx rd0-trellis "git+https://github.com/ReviewDebtZero/rd0-fence#subdirectory=packages/rd0-fence"`

Copy `skills/rd0/scripts/rd0-check.sh` from ReviewDebtZero/rd0 onto your PATH. Before every PR, save the task text verbatim to `task.txt` and run
`rd0-check.sh --title "<task title>" --body-file task.txt --base origin/main`, then:
- revert edits Fence flags as out of scope, or justify each one in the PR description;
- apply every Trellis `fix:`;
- if Jinx shows an open PR doing the same work, stop and ask before opening another.
