#!/bin/sh

set -eu

DOMAIN="${1:-}"

if [ -z "$DOMAIN" ]; then
  echo "usage: $0 <local-dev-domain>" >&2
  exit 1
fi

case "$DOMAIN" in
  *.localhost)
    printf 'dnsmasq-health: skipped for %s (.localhost fallback mode usually does not require dnsmasq).\n' "$DOMAIN"
    exit 0
    ;;
esac

OS_NAME="$(uname -s 2>/dev/null || printf 'unknown')"
STATUS=0

pass() {
  printf 'PASS  %-18s %s\n' "$1" "$2"
}

warn() {
  printf 'WARN  %-18s %s\n' "$1" "$2"
}

fail() {
  printf 'FAIL  %-18s %s\n' "$1" "$2"
  STATUS=1
}

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

if [ "$OS_NAME" = "Darwin" ]; then
  RESOLVER_FILE="/etc/resolver/$DOMAIN"
  if [ -f "$RESOLVER_FILE" ]; then
    pass resolver-file "$RESOLVER_FILE exists"
    if grep -Eq '^[[:space:]]*nameserver[[:space:]]+127\.0\.0\.1[[:space:]]*$' "$RESOLVER_FILE"; then
      pass resolver-ns "nameserver 127.0.0.1"
    else
      fail resolver-ns "expected nameserver 127.0.0.1 in $RESOLVER_FILE"
    fi
    if grep -Eq '^[[:space:]]*port[[:space:]]+53[[:space:]]*$' "$RESOLVER_FILE"; then
      pass resolver-port "port 53"
    else
      warn resolver-port "port 53 not found in $RESOLVER_FILE (may still work if defaulting to 53)"
    fi
  else
    fail resolver-file "$RESOLVER_FILE is missing (run make dnsmasq-local)"
  fi
else
  warn resolver-file "Skipping /etc/resolver check on $OS_NAME (macOS-specific)"
fi

LISTENER_OK=0
if command -v lsof >/dev/null 2>&1; then
  if lsof -nP -iTCP:53 -sTCP:LISTEN 2>/dev/null | grep -Eq 'dnsmasq([[:space:]]|$).*(127\.0\.0\.1:53|\[::1\]:53|localhost:53|\*:53)'; then
    LISTENER_OK=1
  elif lsof -nP -iUDP:53 2>/dev/null | grep -Eq 'dnsmasq([[:space:]]|$).*(127\.0\.0\.1:53|\[::1\]:53|localhost:53|\*:53)'; then
    LISTENER_OK=1
  fi
fi

if [ "$LISTENER_OK" -eq 0 ] && command -v nc >/dev/null 2>&1; then
  if nc -z -w 1 127.0.0.1 53 >/dev/null 2>&1; then
    LISTENER_OK=1
  elif nc -z -w 1 ::1 53 >/dev/null 2>&1; then
    LISTENER_OK=1
  elif nc -u -z -w 1 127.0.0.1 53 >/dev/null 2>&1; then
    LISTENER_OK=1
  elif nc -u -z -w 1 ::1 53 >/dev/null 2>&1; then
    LISTENER_OK=1
  fi
fi
RESOLVE_LOOPBACK_PASS_COUNT=0

for HOST in "$DOMAIN" "api.$DOMAIN" "admin.$DOMAIN" "traefik.$DOMAIN"; do
  case "$HOST" in
    "$DOMAIN")
      LABEL='resolve:web'
      ;;
    api.*)
      LABEL='resolve:api'
      ;;
    admin.*)
      LABEL='resolve:admin'
      ;;
    traefik.*)
      LABEL='resolve:traefik'
      ;;
    *)
      LABEL='resolve:host'
      ;;
  esac
  RESULT="$(resolve_host "$HOST" | tr '\n' ' ' | sed 's/[[:space:]]*$//')"
  if [ -z "$RESULT" ]; then
    fail "$LABEL" "$HOST -> no DNS result"
    continue
  fi

  case " $RESULT " in
    *" 127.0.0.1 "*|*" ::1 "*)
      RESOLVE_LOOPBACK_PASS_COUNT=$((RESOLVE_LOOPBACK_PASS_COUNT + 1))
      pass "$LABEL" "$HOST -> $RESULT"
      ;;
    *)
      warn "$LABEL" "$HOST resolved to $RESULT (expected loopback)"
      ;;
  esac
done

if [ "$LISTENER_OK" -eq 1 ]; then
  pass listener "port 53 reachable on loopback (dnsmasq)"
elif [ "$RESOLVE_LOOPBACK_PASS_COUNT" -gt 0 ]; then
  warn listener "listener probe failed, but wildcard resolution works on loopback (common lsof permission/race false negative on macOS)"
else
  fail listener "no loopback port 53 listener detected for dnsmasq"
fi

if [ "$STATUS" -ne 0 ]; then
  printf 'dnsmasq-health: FAILED for %s\n' "$DOMAIN" >&2
else
  printf 'dnsmasq-health: OK for %s\n' "$DOMAIN"
fi

exit "$STATUS"
