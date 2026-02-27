#!/bin/sh

set -eu

APP_DIR="${1:-}"
OUTPUT_FILE="${2:-.env.local}"
ENV_TARGET="${3:-development}"
GIT_BRANCH="${4:-}"

if [ -z "$APP_DIR" ]; then
  printf 'Usage: %s <app-dir> [output-file] [environment] [git-branch]\n' "$0" >&2
  exit 64
fi

if command -v vercel >/dev/null 2>&1; then
  VERCEL_CLI_CMD="vercel"
elif command -v pnpm >/dev/null 2>&1; then
  VERCEL_CLI_CMD="pnpm dlx vercel@37.12.0"
else
  printf 'vercel-env-pull: neither `vercel` nor `pnpm` is available in PATH.\n' >&2
  exit 127
fi

if [ ! -d "$APP_DIR" ]; then
  printf 'vercel-env-pull: app directory not found: %s\n' "$APP_DIR" >&2
  exit 66
fi

if [ ! -f "$APP_DIR/.vercel/project.json" ]; then
  printf 'vercel-env-pull: %s/.vercel/project.json is missing. Run `vercel link` in %s first.\n' "$APP_DIR" "$APP_DIR" >&2
  exit 65
fi

project_json="$APP_DIR/.vercel/project.json"
project_id="$(sed -n 's/.*"projectId":"\([^"]*\)".*/\1/p' "$project_json" | head -n 1)"
org_id="$(sed -n 's/.*"orgId":"\([^"]*\)".*/\1/p' "$project_json" | head -n 1)"

if [ -z "$project_id" ] || [ -z "$org_id" ]; then
  printf 'vercel-env-pull: failed to parse projectId/orgId from %s\n' "$project_json" >&2
  exit 65
fi

printf 'vercel-env-pull: app=%s env=%s output=%s\n' "$APP_DIR" "$ENV_TARGET" "$OUTPUT_FILE"

if [ -n "$GIT_BRANCH" ]; then
  (
    cd "$APP_DIR"
    VERCEL_PROJECT_ID="$project_id" VERCEL_ORG_ID="$org_id" \
      sh -lc "$VERCEL_CLI_CMD env pull \"$OUTPUT_FILE\" --environment \"$ENV_TARGET\" --git-branch \"$GIT_BRANCH\" --yes"
  )
else
  (
    cd "$APP_DIR"
    VERCEL_PROJECT_ID="$project_id" VERCEL_ORG_ID="$org_id" \
      sh -lc "$VERCEL_CLI_CMD env pull \"$OUTPUT_FILE\" --environment \"$ENV_TARGET\" --yes"
  )
fi
