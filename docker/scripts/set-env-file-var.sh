#!/bin/sh

set -eu

ENV_FILE_PATH="${1:-}"
ENV_KEY="${2:-}"
ENV_VALUE="${3:-}"

if [ -z "$ENV_FILE_PATH" ] || [ -z "$ENV_KEY" ] || [ -z "$ENV_VALUE" ]; then
  echo "usage: $0 <env-file> <key> <value>" >&2
  exit 1
fi

ENV_FILE_DIR=$(dirname "$ENV_FILE_PATH")
if [ ! -d "$ENV_FILE_DIR" ]; then
  mkdir -p "$ENV_FILE_DIR"
fi

TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT

if [ -f "$ENV_FILE_PATH" ]; then
  grep -Ev "^[[:space:]]*${ENV_KEY}=" "$ENV_FILE_PATH" >"$TMP_FILE" || true
fi

printf '%s="%s"\n' "$ENV_KEY" "$ENV_VALUE" >>"$TMP_FILE"
mv "$TMP_FILE" "$ENV_FILE_PATH"

printf 'Updated %s in %s\n' "$ENV_KEY" "$ENV_FILE_PATH"
