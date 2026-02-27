#!/bin/sh

set -eu

ROOT_ENV_FILE="${1:-.env.local}"
WEB_ENV_FILE="${2:-apps/web/.env.local}"
API_ENV_FILE="${3:-apps/api/.env.local}"
ADMIN_ENV_FILE="${4:-apps/admin/.env.local}"

pick_env_value() {
  key="$1"
  fallback="$2"
  shift 2

  for file_path in "$@"; do
    [ -f "$file_path" ] || continue

    candidate_value=$(
      awk -v key="$key" '
        BEGIN { pattern = "^[[:space:]]*" key "=" }
        $0 ~ pattern {
          sub(/^[^=]*=/, "", $0)
          value = $0
        }
        END {
          if (value != "") {
            print value
          }
        }
      ' "$file_path"
    )

    [ -n "${candidate_value:-}" ] || continue

    compact_value=$(printf '%s' "$candidate_value" | tr -d '[:space:]')
    if [ -n "$compact_value" ] && [ "$compact_value" != "\"\"" ] && [ "$compact_value" != "''" ]; then
      printf '%s' "$candidate_value"
      return 0
    fi
  done

  printf '%s' "$fallback"
}

SOURCE_FILES="$ROOT_ENV_FILE $WEB_ENV_FILE $API_ENV_FILE $ADMIN_ENV_FILE"

local_dev_domain=$(pick_env_value "LOCAL_DEV_DOMAIN" "\"guyromellemagayano.test\"" $SOURCE_FILES)
# Keep host-side defaults local-safe. Edge compose overlays override these for hostname routing.
api_gateway_url="\"http://localhost:5001\""
next_public_api_url="\"http://localhost:5001\""
next_public_site_url="\"http://localhost:3000\""
api_gateway_content_provider=$(pick_env_value "API_GATEWAY_CONTENT_PROVIDER" "\"sanity\"" $SOURCE_FILES)
api_gateway_cors_origins=$(pick_env_value "API_GATEWAY_CORS_ORIGINS" "\"\"" $SOURCE_FILES)

next_public_sanity_project_id=$(pick_env_value "NEXT_PUBLIC_SANITY_PROJECT_ID" "\"\"" $SOURCE_FILES)
next_public_sanity_dataset=$(pick_env_value "NEXT_PUBLIC_SANITY_DATASET" "\"production\"" $SOURCE_FILES)
next_public_sanity_api_version=$(pick_env_value "NEXT_PUBLIC_SANITY_API_VERSION" "\"2025-02-19\"" $SOURCE_FILES)
sanity_project_id=$(pick_env_value "SANITY_PROJECT_ID" "\"\"" $SOURCE_FILES)
sanity_dataset=$(pick_env_value "SANITY_DATASET" "\"production\"" $SOURCE_FILES)
sanity_api_version=$(pick_env_value "SANITY_API_VERSION" "\"2025-02-19\"" $SOURCE_FILES)
sanity_use_cdn=$(pick_env_value "SANITY_USE_CDN" "\"true\"" $SOURCE_FILES)
sanity_api_read_token=$(pick_env_value "SANITY_API_READ_TOKEN" "\"\"" $SOURCE_FILES)
sanity_webhook_secret=$(pick_env_value "SANITY_WEBHOOK_SECRET" "\"\"" $SOURCE_FILES)
sanity_request_timeout_ms=$(pick_env_value "SANITY_REQUEST_TIMEOUT_MS" "\"\"" $SOURCE_FILES)
sanity_request_max_retries=$(pick_env_value "SANITY_REQUEST_MAX_RETRIES" "\"\"" $SOURCE_FILES)
sanity_request_retry_delay_ms=$(pick_env_value "SANITY_REQUEST_RETRY_DELAY_MS" "\"\"" $SOURCE_FILES)

sitemap_site_url="\"http://localhost:3000\""
sitemap_include_cms_content=$(pick_env_value "SITEMAP_INCLUDE_CMS_CONTENT" "\"true\"" $SOURCE_FILES)
sitemap_fail_on_cms_fetch_error=$(pick_env_value "SITEMAP_FAIL_ON_CMS_FETCH_ERROR" "\"false\"" $SOURCE_FILES)

e2e_base_url=$(pick_env_value "E2E_BASE_URL" "\"http://127.0.0.1:3000\"" $SOURCE_FILES)
e2e_use_external_servers=$(pick_env_value "E2E_USE_EXTERNAL_SERVERS" "\"\"" $SOURCE_FILES)
e2e_sanity_article_slug=$(pick_env_value "E2E_SANITY_ARTICLE_SLUG" "\"\"" $SOURCE_FILES)
e2e_sanity_page_slug=$(pick_env_value "E2E_SANITY_PAGE_SLUG" "\"\"" $SOURCE_FILES)

enable_experimental_corepack=$(pick_env_value "ENABLE_EXPERIMENTAL_COREPACK" "\"1\"" $SOURCE_FILES)
eslint_use_flat_config=$(pick_env_value "ESLINT_USE_FLAT_CONFIG" "\"true\"" $SOURCE_FILES)
bundle_analyze=$(pick_env_value "BUNDLE_ANALYZE" "\"false\"" $SOURCE_FILES)
npm_token=$(pick_env_value "NPM_TOKEN" "\"\"" $SOURCE_FILES)
turbo_remote_cache_signature_key=$(pick_env_value "TURBO_REMOTE_CACHE_SIGNATURE_KEY" "\"\"" $SOURCE_FILES)

tmp_env_file=$(mktemp)
trap 'rm -f "$tmp_env_file"' EXIT

cat >"$tmp_env_file" <<EOF
# Local Docker env (single source of truth)
LOCAL_DEV_DOMAIN=$local_dev_domain
ENABLE_EXPERIMENTAL_COREPACK=$enable_experimental_corepack
ESLINT_USE_FLAT_CONFIG=$eslint_use_flat_config
BUNDLE_ANALYZE=$bundle_analyze

# Local app URLs (used by host-side runs and Dockerized tooling)
API_GATEWAY_URL=$api_gateway_url
NEXT_PUBLIC_API_URL=$next_public_api_url
NEXT_PUBLIC_SITE_URL=$next_public_site_url
API_GATEWAY_CONTENT_PROVIDER=$api_gateway_content_provider
API_GATEWAY_CORS_ORIGINS=$api_gateway_cors_origins

# Sanity configuration (shared local dev)
NEXT_PUBLIC_SANITY_PROJECT_ID=$next_public_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=$next_public_sanity_dataset
NEXT_PUBLIC_SANITY_API_VERSION=$next_public_sanity_api_version
SANITY_PROJECT_ID=$sanity_project_id
SANITY_DATASET=$sanity_dataset
SANITY_API_VERSION=$sanity_api_version
SANITY_USE_CDN=$sanity_use_cdn
SANITY_API_READ_TOKEN=$sanity_api_read_token
SANITY_WEBHOOK_SECRET=$sanity_webhook_secret
SANITY_REQUEST_TIMEOUT_MS=$sanity_request_timeout_ms
SANITY_REQUEST_MAX_RETRIES=$sanity_request_max_retries
SANITY_REQUEST_RETRY_DELAY_MS=$sanity_request_retry_delay_ms

# Sitemap defaults for local
SITEMAP_SITE_URL=$sitemap_site_url
SITEMAP_INCLUDE_CMS_CONTENT=$sitemap_include_cms_content
SITEMAP_FAIL_ON_CMS_FETCH_ERROR=$sitemap_fail_on_cms_fetch_error

# E2E defaults
E2E_BASE_URL=$e2e_base_url
E2E_USE_EXTERNAL_SERVERS=$e2e_use_external_servers
E2E_SANITY_ARTICLE_SLUG=$e2e_sanity_article_slug
E2E_SANITY_PAGE_SLUG=$e2e_sanity_page_slug

# Optional auth/cache tokens (only if needed locally)
NPM_TOKEN=$npm_token
TURBO_REMOTE_CACHE_SIGNATURE_KEY=$turbo_remote_cache_signature_key
EOF

mv "$tmp_env_file" "$ROOT_ENV_FILE"

if [ "${KEEP_APP_ENV_FILES:-0}" != "1" ]; then
  rm -f "$WEB_ENV_FILE" "$API_ENV_FILE" "$ADMIN_ENV_FILE"
  printf 'Removed app-level .env.local files to keep root env as the single local source of truth.\n'
fi

printf 'Normalized local env file: %s\n' "$ROOT_ENV_FILE"
printf 'Domain: %s\n' "$local_dev_domain"
