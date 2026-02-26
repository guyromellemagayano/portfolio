#!/bin/sh

set -eu

DOMAIN="${1:-}"

if [ -z "${DOMAIN}" ]; then
  echo "usage: $0 <local-dev-domain>" >&2
  exit 1
fi

if [ "$(uname -s)" != "Darwin" ]; then
  echo "This helper currently supports macOS only (dnsmasq via Homebrew)." >&2
  exit 1
fi

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required but 'brew' is not available in PATH." >&2
  exit 1
fi

BREW_BIN="$(command -v brew)"
BREW_PREFIX="$($BREW_BIN --prefix)"
DNSMASQ_CONF_DIR="$BREW_PREFIX/etc/dnsmasq.d"
DNSMASQ_MAIN_CONF="$BREW_PREFIX/etc/dnsmasq.conf"
DNSMASQ_DOMAIN_CONF="$DNSMASQ_CONF_DIR/portfolio-local.conf"
RESOLVER_FILE="/etc/resolver/$DOMAIN"

mkdir -p "$DNSMASQ_CONF_DIR"

if ! grep -Eq '^[[:space:]]*conf-dir=.*/dnsmasq\.d,\*\.conf[[:space:]]*$' "$DNSMASQ_MAIN_CONF"; then
  printf '\nconf-dir=%s/etc/dnsmasq.d,*.conf\n' "$BREW_PREFIX" >>"$DNSMASQ_MAIN_CONF"
fi

cat >"$DNSMASQ_DOMAIN_CONF" <<EOF
address=/$DOMAIN/127.0.0.1
EOF

sudo mkdir -p /etc/resolver
sudo tee "$RESOLVER_FILE" >/dev/null <<EOF
nameserver 127.0.0.1
port 53
EOF

if ! sudo "$BREW_BIN" services restart dnsmasq; then
  "$BREW_BIN" services restart dnsmasq
fi

sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

printf 'dnsmasq local domain configured for %s\n' "$DOMAIN"
printf 'dnsmasq rule: %s\n' "$DNSMASQ_DOMAIN_CONF"
printf 'resolver file: %s\n' "$RESOLVER_FILE"
