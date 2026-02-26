#!/bin/sh

set -eu

REPO_ROOT="${1:-$(pwd)}"
CATALOG_FILE="$REPO_ROOT/docs/catalog/README.md"

if [ ! -f "$CATALOG_FILE" ]; then
  printf 'docs-catalog-check: missing catalog file: %s\n' "$CATALOG_FILE" >&2
  exit 1
fi

tmp_actual="$(mktemp)"
tmp_catalog="$(mktemp)"
cleanup() {
  rm -f "$tmp_actual" "$tmp_catalog"
}
trap cleanup EXIT INT TERM

(
  cd "$REPO_ROOT"
  find . -name README.md \
    -not -path '*/node_modules/*' \
    -not -path '*/.git/*' \
    -not -path '*/.next/*' \
    -print \
    | sed 's#^\./##' \
    | sort
) >"$tmp_actual"

# Extract only README entries from the catalog bullets:
# - `path/to/README.md`
sed -n 's/^[[:space:]]*-[[:space:]]*`\([^`]*README\.md\)`[[:space:]]*$/\1/p' "$CATALOG_FILE" \
  | sort >"$tmp_catalog"

if diff -u "$tmp_catalog" "$tmp_actual" >/dev/null 2>&1; then
  printf 'docs catalog check: OK (%s matches repo README list)\n' "docs/catalog/README.md"
  exit 0
fi

printf 'docs catalog check: FAILED (%s is out of sync)\n' "docs/catalog/README.md" >&2
printf '\nCatalog entries (README-only) vs actual repo README files diff:\n' >&2
diff -u "$tmp_catalog" "$tmp_actual" >&2 || true
printf '\nUpdate `%s` to match the current repo README list.\n' "docs/catalog/README.md" >&2
exit 1
