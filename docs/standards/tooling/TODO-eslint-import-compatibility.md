# TODO: ESLint Import Plugin Compatibility Review

Last updated: March 10, 2026
Cadence: Monthly

## Objective

Re-check whether `eslint-plugin-import` or `eslint-plugin-import-x` has explicit ESLint 10+ peer support and can replace the current hybrid strategy.

## Monthly Checklist

1. Check latest `peerDependencies.eslint` for:
   - `eslint-plugin-import`
   - `eslint-plugin-import-x`
2. If either plugin declares ESLint 10+ support, run a parity branch test against current lint behavior.
3. Compare unresolved-import detection and import sorting behavior against current baseline.
4. If parity is acceptable, prepare a migration PR to restore import-family plugin checks.

## Exit Criteria

- A candidate plugin explicitly declares ESLint 10+ peer compatibility.
- Migration branch passes:
  - `pnpm lint:ci`
  - `pnpm test`
- No regression in unresolved-import detection for JS and TS paths.
