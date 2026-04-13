#!/bin/sh

set -eu

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"

if [ -z "$repo_root" ]; then
  printf 'bootstrap-workspace: must be run inside the repository.\n' >&2
  exit 1
fi

cd "$repo_root"

git submodule sync --recursive
git submodule update --init --recursive

if command -v pnpm >/dev/null 2>&1; then
  pnpm install "$@"
else
  printf 'bootstrap-workspace: pnpm was not found in PATH.\n' >&2
  exit 127
fi
