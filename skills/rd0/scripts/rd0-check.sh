#!/usr/bin/env bash
# Run the three rd0 checks on the current branch before opening a PR.
# Usage: rd0-check.sh --title "task title" --body-file task.txt [--base origin/main] [--queue open_prs.json]
set -uo pipefail

base="origin/main" title="" body_file="" queue=""
while [ $# -gt 0 ]; do
  case "$1" in
    --base) base="$2"; shift 2 ;;
    --title) title="$2"; shift 2 ;;
    --body-file) body_file="$2"; shift 2 ;;
    --queue) queue="$2"; shift 2 ;;
    -h|--help) sed -n 2,3p "$0"; exit 0 ;;
    *) echo "rd0: unknown argument $1" >&2; exit 2 ;;
  esac
done
[ -n "$title" ] || { echo "rd0: --title is required (the task title, verbatim)" >&2; exit 2; }
body=""
[ -n "$body_file" ] && body="$(cat "$body_file")"

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
git rev-parse --verify --quiet "$base^{commit}" >/dev/null \
  || { echo "rd0: base $base not found (try --base main, or git fetch origin)" >&2; exit 2; }
git diff --no-color --no-ext-diff "$base...HEAD" > "$work/pr.diff" || { echo "rd0: git diff $base...HEAD failed" >&2; exit 2; }
if [ ! -s "$work/pr.diff" ]; then
  echo "rd0: no changes between $base and HEAD"; exit 0
fi

echo "== Fence: changes outside the task"
if command -v fence >/dev/null; then
  fence check --diff "$work/pr.diff" --title "$title" --body "$body"
else
  echo "fence not installed; skipped"
fi

echo; echo "== Trellis: repo rules and agent slop"
if command -v trellis >/dev/null; then
  trellis scan --base "$base" --title "$title" --body "$body"
  trellis check --base "$base" --title "$title" --body "$body"
else
  echo "trellis not installed; skipped"
fi

echo; echo "== Jinx: open PRs that may already do this"
if ! command -v jinx >/dev/null; then
  echo "jinx not installed; skipped"
else
  if [ -z "$queue" ] && command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
    queue="$work/queue.json"
    if ! gh pr list --state open --limit 200 --json number,title,body,author,url,files \
      | jq '[.[] | {number, title, body, author: .author.login, html_url: .url, files: [.files[].path]}]' \
      > "$queue"; then
      echo "could not list open PRs with gh"
      queue=""
    fi
  fi
  if [ -z "$queue" ]; then
    echo "no open-PR list (log in with gh, or pass --queue FILE); skipped"
  else
    self_pr="$(gh pr view --json number -q .number 2>/dev/null || true)"
    if [ -n "$self_pr" ]; then
      jq --argjson n "$self_pr" '[.[] | select(.number != $n)]' "$queue" > "$work/queue_others.json"
      queue="$work/queue_others.json"
    fi
    jq -n --arg t "$title" --arg b "$body" --argjson n "${self_pr:-0}" '{number: $n, title: $t, body: $b}' > "$work/new.json"
    jinx check "$work/new.json" --open-queue "$queue" --diff "$work/pr.diff"
  fi
fi
