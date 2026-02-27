#!/bin/sh

set -eu

DOMAIN="${1:-}"

if [ -z "$DOMAIN" ]; then
  echo "usage: $0 <local-dev-domain>" >&2
  exit 1
fi

OS_NAME="$(uname -s 2>/dev/null || printf 'unknown')"
REPO_ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"

resolve_host() {
  HOSTNAME="$1"
  if [ "$OS_NAME" = "Darwin" ] && command -v dscacheutil >/dev/null 2>&1; then
    dscacheutil -q host -a name "$HOSTNAME" 2>/dev/null | awk '/^ip_address: / {print $2}'
  elif command -v getent >/dev/null 2>&1; then
    getent hosts "$HOSTNAME" 2>/dev/null | awk '{print $1}'
  elif command -v dig >/dev/null 2>&1; then
    dig +short "$HOSTNAME" 2>/dev/null
  fi
}

printf 'edge-dns-doctor: LOCAL_DEV_DOMAIN=%s\n' "$DOMAIN"

case "$DOMAIN" in
  *.localhost)
    printf '\n'
    printf 'Using .localhost fallback mode. dnsmasq is typically unnecessary for this domain.\n'
    printf 'If a browser still fails, check:\n'
    printf '  - make down-edge && make up-edge-watch\n'
    printf '  - make edge-smoke\n'
    printf '  - browser DNS cache / extensions / VPN\n'
    exit 0
    ;;
esac

printf '\nRunning hostname resolution check (system resolver)...\n'
if make --no-print-directory -C "$REPO_ROOT" dnsmasq-verify LOCAL_DEV_DOMAIN="$DOMAIN"; then
  SAMPLE_HOST="api.$DOMAIN"
  SAMPLE_RESULT="$(resolve_host "$SAMPLE_HOST" | tr '\n' ' ' | sed 's/[[:space:]]*$//')"

  printf '\nSystem resolver appears healthy for %s.\n' "$DOMAIN"
  if [ -n "$SAMPLE_RESULT" ]; then
    printf 'Sample lookup: %s -> %s\n' "$SAMPLE_HOST" "$SAMPLE_RESULT"
  fi

  printf '\nIf Chromium-based browsers still show DNS_PROBE_* while curl works:\n'
  printf '  1. Disable Secure DNS / DNS-over-HTTPS in your dev browser profile\n'
  printf '  2. Clear host cache: chrome://net-internals/#dns\n'
  printf '  3. Flush sockets: chrome://net-internals/#sockets\n'
  printf '  4. Restart the browser (or use chrome://restart)\n'
  printf '  5. Retry the URL (web root, api, traefik)\n'
  printf '\nFallback option (no dnsmasq):\n'
  printf '  make use-localhost-domain && make down-edge && make up-edge-watch\n'
  exit 0
fi

printf '\nDNS resolution is failing for %s.\n' "$DOMAIN" >&2
printf 'Recommended fixes:\n' >&2
printf '  1. make dnsmasq-local\n' >&2
printf '  2. make dnsmasq-health\n' >&2
printf '  3. make dnsmasq-status  # advisory only\n' >&2
printf '  4. make up-edge-watch\n' >&2
printf '\nFallback (skip dnsmasq entirely):\n' >&2
printf '  make use-localhost-domain && make down-edge && make up-edge-watch\n' >&2
exit 1
