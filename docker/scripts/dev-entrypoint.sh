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

should_install_pnpm_dependencies=0
pnpm_install_reason=""
pnpm_modules_manifest="node_modules/.modules.yaml"
pnpm_install_lock_dir=".pnpm-install.lock"

evaluate_pnpm_install_need() {
  should_install_pnpm_dependencies=0
  pnpm_install_reason=""

  if [ "${FORCE_PNPM_INSTALL:-0}" = "1" ]; then
    should_install_pnpm_dependencies=1
    pnpm_install_reason="FORCE_PNPM_INSTALL=1"
    return
  fi

  if [ ! -f "${pnpm_modules_manifest}" ]; then
    should_install_pnpm_dependencies=1
    pnpm_install_reason="missing ${pnpm_modules_manifest}"
    return
  fi

  if [ "pnpm-lock.yaml" -nt "${pnpm_modules_manifest}" ]; then
    should_install_pnpm_dependencies=1
    pnpm_install_reason="\"pnpm-lock.yaml\" is newer than ${pnpm_modules_manifest}"
    return
  fi

  workspace_manifests="package.json apps/*/package.json packages/*/package.json"

  for manifest in ${workspace_manifests}; do
    if [ -f "${manifest}" ] && [ "${manifest}" -nt "${pnpm_modules_manifest}" ]; then
      should_install_pnpm_dependencies=1
      pnpm_install_reason="${manifest} is newer than ${pnpm_modules_manifest}"
      return
    fi
  done
}

release_pnpm_install_lock() {
  rmdir "${pnpm_install_lock_dir}" >/dev/null 2>&1 || true
}

evaluate_pnpm_install_need

if [ "${should_install_pnpm_dependencies}" = "1" ]; then
  while ! mkdir "${pnpm_install_lock_dir}" >/dev/null 2>&1; do
    echo "[docker-local] Waiting for another container to finish pnpm install..."
    sleep 1
  done

  trap release_pnpm_install_lock EXIT INT TERM

  # Re-evaluate after acquiring the lock in case another container already installed dependencies.
  evaluate_pnpm_install_need

  if [ "${should_install_pnpm_dependencies}" = "1" ]; then
    echo "[docker-local] Installing workspace dependencies with pnpm (${pnpm_install_reason})..."
    pnpm install --frozen-lockfile
  fi

  release_pnpm_install_lock
  trap - EXIT INT TERM
fi

echo "[docker-local] Starting: $*"
exec "$@"
