#!/bin/sh
set -eu

domain="${1:-guyromellemagayano.local}"
enable_docker_provider="${TRAEFIK_ENABLE_DOCKER_PROVIDER:-0}"
repo_root="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"
dynamic_dir="$repo_root/docker/traefik/dynamic"
http_only_dir="$dynamic_dir/http"

mkdir -p "$dynamic_dir" "$http_only_dir"

tmp_http="$(mktemp)"
tmp_full="$(mktemp)"
trap 'rm -f "$tmp_http" "$tmp_full"' EXIT

case "$enable_docker_provider" in
  1|true|TRUE|yes|YES|on|ON)
  cat >"$http_only_dir/local-routes.yml" <<'EOF'
# File-provider routes intentionally disabled because TRAEFIK_ENABLE_DOCKER_PROVIDER=1.
# This avoids duplicate routers across file + Docker providers.
EOF
  cat >"$dynamic_dir/local-routes.yml" <<'EOF'
# File-provider routes intentionally disabled because TRAEFIK_ENABLE_DOCKER_PROVIDER=1.
# TLS config may still be loaded from other files in this directory (e.g. local-tls.yml).
EOF
  printf 'Rendered Traefik local routes for %s (Docker provider mode: file routes disabled)\n' "$domain"
  printf '  - %s\n' "$http_only_dir/local-routes.yml"
  printf '  - %s\n' "$dynamic_dir/local-routes.yml"
  exit 0
  ;;
esac

cat >"$tmp_http" <<'EOF'
http:
  middlewares:
    traefik-dashboard-root-redirect:
      redirectRegex:
        regex: "^http://([^/]+)/?$"
        replacement: "http://${1}/dashboard/"
        permanent: false
  routers:
    traefik-root:
      rule: "Host(`traefik.__LOCAL_DEV_DOMAIN__`) && Path(`/`)"
      entryPoints:
        - web
      priority: 100
      middlewares:
        - traefik-dashboard-root-redirect
      service: api@internal
    traefik:
      rule: "Host(`traefik.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: api@internal
    portfolio-api:
      rule: "Host(`api.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: portfolio-api
    portfolio-web:
      rule: "Host(`__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: portfolio-web
    portfolio-admin:
      rule: "Host(`admin.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: portfolio-admin
  services:
    portfolio-api:
      loadBalancer:
        servers:
          - url: "http://api:5001"
    portfolio-web:
      loadBalancer:
        servers:
          - url: "http://web:3000"
    portfolio-admin:
      loadBalancer:
        servers:
          - url: "http://admin:3001"
EOF

cat >"$tmp_full" <<'EOF'
http:
  middlewares:
    traefik-dashboard-root-redirect:
      redirectRegex:
        regex: "^http://([^/]+)/?$"
        replacement: "http://${1}/dashboard/"
        permanent: false
    traefik-dashboard-root-redirect-secure:
      redirectRegex:
        regex: "^https://([^/]+)/?$"
        replacement: "https://${1}/dashboard/"
        permanent: false
  routers:
    traefik-root:
      rule: "Host(`traefik.__LOCAL_DEV_DOMAIN__`) && Path(`/`)"
      entryPoints:
        - web
      priority: 100
      middlewares:
        - traefik-dashboard-root-redirect
      service: api@internal
    traefik:
      rule: "Host(`traefik.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: api@internal
    traefik-root-secure:
      rule: "Host(`traefik.__LOCAL_DEV_DOMAIN__`) && Path(`/`)"
      entryPoints:
        - websecure
      priority: 100
      middlewares:
        - traefik-dashboard-root-redirect-secure
      tls: {}
      service: api@internal
    traefik-secure:
      rule: "Host(`traefik.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - websecure
      tls: {}
      service: api@internal
    portfolio-api:
      rule: "Host(`api.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: portfolio-api
    portfolio-api-secure:
      rule: "Host(`api.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - websecure
      tls: {}
      service: portfolio-api
    portfolio-web:
      rule: "Host(`__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: portfolio-web
    portfolio-web-secure:
      rule: "Host(`__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - websecure
      tls: {}
      service: portfolio-web
    portfolio-admin:
      rule: "Host(`admin.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - web
      service: portfolio-admin
    portfolio-admin-secure:
      rule: "Host(`admin.__LOCAL_DEV_DOMAIN__`)"
      entryPoints:
        - websecure
      tls: {}
      service: portfolio-admin
  services:
    portfolio-api:
      loadBalancer:
        servers:
          - url: "http://api:5001"
    portfolio-web:
      loadBalancer:
        servers:
          - url: "http://web:3000"
    portfolio-admin:
      loadBalancer:
        servers:
          - url: "http://admin:3001"
EOF

sed "s/__LOCAL_DEV_DOMAIN__/${domain}/g" "$tmp_http" >"$http_only_dir/local-routes.yml"
sed "s/__LOCAL_DEV_DOMAIN__/${domain}/g" "$tmp_full" >"$dynamic_dir/local-routes.yml"

printf 'Rendered Traefik local routes for %s\n' "$domain"
printf '  - %s\n' "$http_only_dir/local-routes.yml"
printf '  - %s\n' "$dynamic_dir/local-routes.yml"
