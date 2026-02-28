#!/bin/sh

set -eu

MODE="${1:-}"
REPO_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"

if [ -z "$MODE" ]; then
  echo "usage: $0 <foreground|watch|detached>" >&2
  exit 1
fi

LOCAL_DEV_DOMAIN="${LOCAL_DEV_DOMAIN:-guyromellemagayano.local}"
SKIP_DNS_SETUP="${SKIP_DNS_SETUP:-0}"

run_make() {
  make --no-print-directory -C "$REPO_ROOT" "$@"
}

case "$MODE" in
  foreground) START_TARGET="up-edge" ;;
  watch) START_TARGET="up-edge-watch" ;;
  detached) START_TARGET="up-edge-detached" ;;
  *)
    echo "invalid mode: $MODE (expected foreground|watch|detached)" >&2
    exit 1
    ;;
esac

run_make validate-edge

if [ "$SKIP_DNS_SETUP" = "1" ]; then
  printf 'Skipping local DNS setup (SKIP_DNS_SETUP=1)\n'
elif printf '%s' "$LOCAL_DEV_DOMAIN" | grep -Eq '\.localhost$$'; then
  printf 'Skipping local DNS setup for %s (.localhost fallback mode)\n' "$LOCAL_DEV_DOMAIN"
elif printf '%s' "$LOCAL_DEV_DOMAIN" | grep -Eq '\.local$$'; then
  printf 'Skipping local DNS setup for %s (OrbStack custom-domain mode)\n' "$LOCAL_DEV_DOMAIN"
elif [ "$(uname -s)" = "Darwin" ] && command -v brew >/dev/null 2>&1; then
  run_make dnsmasq-local
else
  printf 'dnsmasq auto-setup skipped (macOS/Homebrew only). Add manual hosts entries:\n'
  run_make edge-hosts
fi

if printf '%s' "$LOCAL_DEV_DOMAIN" | grep -Eq '\.localhost$$'; then
  printf 'DNS setup skipped by design for %s (.localhost fallback mode).\n' "$LOCAL_DEV_DOMAIN"
elif printf '%s' "$LOCAL_DEV_DOMAIN" | grep -Eq '\.local$$'; then
  printf 'DNS setup skipped by design for %s (OrbStack custom-domain mode).\n' "$LOCAL_DEV_DOMAIN"
else
  printf 'If the browser shows DNS_PROBE_* while curl works, run `make edge-dns-doctor`.\n'
fi

run_make "$START_TARGET"
