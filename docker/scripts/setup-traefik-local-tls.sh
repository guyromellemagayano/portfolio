#!/bin/sh

set -eu

LOCAL_DEV_DOMAIN="${1:-guyromellemagayano.local}"

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
REPO_ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/../.." && pwd)

CERTS_DIR="$REPO_ROOT/docker/traefik/certs"
DYNAMIC_DIR="$REPO_ROOT/docker/traefik/dynamic"
ACTIVE_TLS_CONFIG="$DYNAMIC_DIR/local-tls.yml"
CERT_FILENAME="$LOCAL_DEV_DOMAIN.pem"
KEY_FILENAME="$LOCAL_DEV_DOMAIN-key.pem"
CERT_PATH="$CERTS_DIR/$CERT_FILENAME"
KEY_PATH="$CERTS_DIR/$KEY_FILENAME"

if ! command -v mkcert >/dev/null 2>&1; then
  printf 'mkcert is required but was not found in PATH.\n'
  printf 'Install it first (macOS): brew install mkcert && mkcert -install\n'
  exit 1
fi

mkdir -p "$CERTS_DIR" "$DYNAMIC_DIR"

printf 'Installing/updating local mkcert CA (safe to re-run)...\n'
mkcert -install

printf 'Generating local TLS cert for %s and *.%s ...\n' "$LOCAL_DEV_DOMAIN" "$LOCAL_DEV_DOMAIN"
mkcert \
  -cert-file "$CERT_PATH" \
  -key-file "$KEY_PATH" \
  "$LOCAL_DEV_DOMAIN" \
  "*.$LOCAL_DEV_DOMAIN"

cat >"$ACTIVE_TLS_CONFIG" <<EOF
tls:
  stores:
    default:
      defaultCertificate:
        certFile: /certs/$CERT_FILENAME
        keyFile: /certs/$KEY_FILENAME
EOF

printf 'Traefik local TLS configured for %s\n' "$LOCAL_DEV_DOMAIN"
printf 'cert: %s\n' "$CERT_PATH"
printf 'key:  %s\n' "$KEY_PATH"
printf 'tls config: %s\n' "$ACTIVE_TLS_CONFIG"
printf 'Next: make up-edge-tls-watch\n'
