#!/bin/sh

set -eu

COMMAND="${1:-status}"
PUSH_ARGS="${GIT_PUSH_ARGS:-}"

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"

if [ -z "$repo_root" ]; then
  printf 'git-changes: must be run from inside a git repository.\n' >&2
  exit 1
fi

cd "$repo_root"

run_git() {
  repo_path="$1"
  shift

  if [ "$repo_path" = "." ]; then
    git "$@"
  else
    git -C "$repo_path" "$@"
  fi
}

list_repos() {
  printf '.\n'
  git submodule foreach --quiet --recursive 'printf "%s\n" "$sm_path"' 2>/dev/null || true
}

repo_label() {
  repo_path="$1"

  if [ "$repo_path" = "." ]; then
    printf 'root'
  else
    printf '%s' "$repo_path"
  fi
}

repo_branch() {
  repo_path="$1"
  branch="$(run_git "$repo_path" symbolic-ref --quiet --short HEAD 2>/dev/null || true)"

  if [ -n "$branch" ]; then
    printf '%s' "$branch"
  else
    printf 'DETACHED'
  fi
}

repo_upstream() {
  repo_path="$1"
  run_git "$repo_path" rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null || true
}

repo_dirty_output() {
  repo_path="$1"

  if [ "$repo_path" = "." ]; then
    git status --porcelain --untracked-files=all --ignore-submodules=dirty
  else
    git -C "$repo_path" status --porcelain --untracked-files=all
  fi
}

repo_ahead_behind() {
  repo_path="$1"
  upstream_ref="$2"
  run_git "$repo_path" rev-list --left-right --count "$upstream_ref...HEAD"
}

print_status() {
  dirty_found=0
  ahead_found=0
  repos_list="$(mktemp)"

  trap 'rm -f "$repos_list"' EXIT INT TERM
  list_repos >"$repos_list"

  printf '\nGit Change Audit\n\n'

  while IFS= read -r repo_path; do
    label="$(repo_label "$repo_path")"
    branch="$(repo_branch "$repo_path")"
    dirty_output="$(repo_dirty_output "$repo_path" || true)"
    upstream_ref="$(repo_upstream "$repo_path")"

    dirty_state="clean"
    ahead_count="n/a"
    behind_count="n/a"
    upstream_label="none"

    if [ -n "$dirty_output" ]; then
      dirty_state="dirty"
      dirty_found=1
    fi

    if [ -n "$upstream_ref" ]; then
      counts="$(repo_ahead_behind "$repo_path" "$upstream_ref")"
      behind_count="$(printf '%s' "$counts" | awk '{print $1}')"
      ahead_count="$(printf '%s' "$counts" | awk '{print $2}')"
      upstream_label="$upstream_ref"

      if [ "$ahead_count" -gt 0 ]; then
        ahead_found=1
      fi
    fi

    printf '%-32s branch=%-16s worktree=%-5s ahead=%-4s behind=%-4s upstream=%s\n' \
      "$label" "$branch" "$dirty_state" "$ahead_count" "$behind_count" "$upstream_label"

    if [ -n "$dirty_output" ]; then
      printf '%s\n' "$dirty_output" | sed 's/^/  /'
    fi
  done <"$repos_list"

  if [ "$dirty_found" -eq 0 ]; then
    printf '\nNo uncommitted file changes detected in the root repo or submodules.\n'
  else
    printf '\nUncommitted file changes were detected.\n'
  fi

  if [ "$ahead_found" -eq 1 ]; then
    printf 'At least one repo has commits ready to push.\n'
  else
    printf 'No repos are currently ahead of their configured upstream.\n'
  fi
}

push_changes() {
  repos_list="$(mktemp)"
  push_list="$(mktemp)"
  problems_list="$(mktemp)"
  root_should_push=0

  trap 'rm -f "$repos_list" "$push_list" "$problems_list"' EXIT INT TERM
  list_repos >"$repos_list"

  while IFS= read -r repo_path; do
    label="$(repo_label "$repo_path")"
    branch="$(repo_branch "$repo_path")"
    dirty_output="$(repo_dirty_output "$repo_path" || true)"

    if [ -n "$dirty_output" ]; then
      {
        printf '%s: uncommitted file changes detected\n' "$label"
        printf '%s\n' "$dirty_output" | sed 's/^/  /'
      } >>"$problems_list"
      continue
    fi

    if [ "$branch" = "DETACHED" ]; then
      printf '%s: detached HEAD; cannot determine push target\n' "$label" >>"$problems_list"
      continue
    fi

    upstream_ref="$(repo_upstream "$repo_path")"

    if [ -z "$upstream_ref" ]; then
      printf '%s: missing upstream for branch %s\n' "$label" "$branch" >>"$problems_list"
      continue
    fi

    counts="$(repo_ahead_behind "$repo_path" "$upstream_ref")"
    behind_count="$(printf '%s' "$counts" | awk '{print $1}')"
    ahead_count="$(printf '%s' "$counts" | awk '{print $2}')"

    if [ "$behind_count" -gt 0 ]; then
      printf '%s: branch %s is behind %s by %s commit(s); sync before pushing\n' \
        "$label" "$branch" "$upstream_ref" "$behind_count" >>"$problems_list"
      continue
    fi

    if [ "$ahead_count" -gt 0 ]; then
      if [ "$repo_path" = "." ]; then
        root_should_push=1
      else
        printf '%s\n' "$repo_path" >>"$push_list"
      fi
    fi
  done <"$repos_list"

  if [ -s "$problems_list" ]; then
    printf 'git-changes push aborted:\n'
    cat "$problems_list"
    printf '\nRun `make git-changes` to inspect the full repo and submodule status.\n'
    exit 1
  fi

  if [ ! -s "$push_list" ] && [ "$root_should_push" -eq 0 ]; then
    printf 'No repos are ahead of their configured upstream. Nothing to push.\n'
    exit 0
  fi

  if [ -s "$push_list" ]; then
    while IFS= read -r repo_path; do
      label="$(repo_label "$repo_path")"
      printf 'Pushing %s...\n' "$label"
      # shellcheck disable=SC2086
      run_git "$repo_path" push $PUSH_ARGS
    done <"$push_list"
  fi

  if [ "$root_should_push" -eq 1 ]; then
    printf 'Pushing root...\n'
    # shellcheck disable=SC2086
    run_git "." push $PUSH_ARGS
  fi

  printf 'Push complete.\n'
}

case "$COMMAND" in
  status)
    print_status
    ;;
  push)
    push_changes
    ;;
  *)
    printf 'Usage: sh scripts/git-changes.sh [status|push]\n' >&2
    exit 1
    ;;
esac
