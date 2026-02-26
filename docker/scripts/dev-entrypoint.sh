#!/bin/sh

set -eu

cd /workspace

corepack enable >/dev/null 2>&1 || true

pnpm config set store-dir "${PNPM_STORE_DIR:-/pnpm/store}" >/dev/null

if [ "${RESET_NEXT_WEB_CACHE_ON_START:-0}" = "1" ]; then
  next_web_dist_dir="${NEXT_WEB_DOCKER_DIST_DIR:-.next}"
  next_web_dev_cache_dir="apps/web/${next_web_dist_dir}/dev/cache"
  next_web_legacy_cache_dir="apps/web/${next_web_dist_dir}/cache"

  if [ -d "${next_web_dev_cache_dir}" ]; then
    echo "[docker-local] Clearing ${next_web_dev_cache_dir} to avoid stale Turbopack cache corruption in Docker bind mounts..."
    rm -rf "${next_web_dev_cache_dir}"
  fi

  if [ -d "${next_web_legacy_cache_dir}" ]; then
    echo "[docker-local] Clearing ${next_web_legacy_cache_dir} to avoid stale Turbopack cache corruption in Docker bind mounts..."
    rm -rf "${next_web_legacy_cache_dir}"
  fi
fi

if [ "${FORCE_PNPM_INSTALL:-0}" = "1" ] || [ ! -f node_modules/.modules.yaml ]; then
  echo "[docker-local] Installing workspace dependencies with pnpm..."
  pnpm install --frozen-lockfile
fi

echo "[docker-local] Starting: $*"
exec "$@"
