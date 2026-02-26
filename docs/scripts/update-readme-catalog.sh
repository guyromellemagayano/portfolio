#!/bin/sh

set -eu

REPO_ROOT="${1:-$(pwd)}"
OUT_FILE="$REPO_ROOT/docs/catalog/README.md"

tmp_all="$(mktemp)"
tmp_other="$(mktemp)"
cleanup() {
  rm -f "$tmp_all" "$tmp_other"
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
) >"$tmp_all"

if ! grep -Fxq 'docs/catalog/README.md' "$tmp_all"; then
  printf '%s\n' 'docs/catalog/README.md' >>"$tmp_all"
  sort -u "$tmp_all" -o "$tmp_all"
fi

emit_section() {
  title="$1"
  mode="$2"
  pattern="$3"

  case "$mode" in
    exact)
      if ! grep -Fxq "$pattern" "$tmp_all"; then
        return 0
      fi
      printf '\n## %s\n\n' "$title" >>"$OUT_FILE"
      grep -Fx "$pattern" "$tmp_all" | while IFS= read -r path; do
        printf -- '- `%s`\n' "$path" >>"$OUT_FILE"
      done
      ;;
    prefix)
      if ! grep -Eq "^$pattern" "$tmp_all"; then
        return 0
      fi
      printf '\n## %s\n\n' "$title" >>"$OUT_FILE"
      grep -E "^$pattern" "$tmp_all" | while IFS= read -r path; do
        printf -- '- `%s`\n' "$path" >>"$OUT_FILE"
      done
      ;;
    file)
      if [ ! -f "$REPO_ROOT/$pattern" ]; then
        return 0
      fi
      printf -- '- `%s`\n' "$pattern" >>"$OUT_FILE"
      ;;
    *)
      printf 'docs-catalog-update: unsupported emit mode: %s\n' "$mode" >&2
      exit 1
      ;;
  esac
}

grep -Ev '^(README\.md|docs/|docker/|apps/|packages/)' "$tmp_all" >"$tmp_other" || true

cat >"$OUT_FILE" <<'EOF'
# Repository README Catalog

Centralized index of every `README.md` in the monorepo.

This catalog is for discovery only. README files should remain close to the code they document.
EOF

emit_section "Root" exact "README.md"
emit_section "Docs (\`docs/\`)" prefix 'docs/'
emit_section "Docker Workspace (\`docker/\`)" prefix 'docker/'
emit_section "Apps (\`apps/\`)" prefix 'apps/'
emit_section "Packages (\`packages/\`)" prefix 'packages/'

if [ -s "$tmp_other" ]; then
  printf '\n## Other\n\n' >>"$OUT_FILE"
  while IFS= read -r path; do
    printf -- '- `%s`\n' "$path" >>"$OUT_FILE"
  done <"$tmp_other"
fi

printf '\n## Related Non-README Entry Points (Frequently Used)\n\n' >>"$OUT_FILE"
emit_section "" file "docker/docs/local-dev.md"
emit_section "" file "docker/docs/e2e.md"
emit_section "" file "docker/docs/production-plan.md"

printf 'docs catalog updated: %s\n' "docs/catalog/README.md"
