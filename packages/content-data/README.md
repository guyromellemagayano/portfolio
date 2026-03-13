# @portfolio/content-data

Typed local content snapshot for portfolio article and standalone page data.

## Purpose

- Provide a deterministic content source independent of Sanity runtime availability.
- Keep content contracts aligned with `@portfolio/api-contracts` payload shapes.
- Enable one-time Sanity export snapshots during migration.

## Exports

- `articlesSnapshot`
- `pagesSnapshot`
- `contentSnapshot`

## Snapshot Export Tool

Use environment variables to export a one-time snapshot from Sanity and rewrite `src/articles.ts` + `src/pages.ts`:

```bash
pnpm --filter @portfolio/content-data snapshot:export:sanity
```

Required env vars:

- `SANITY_STUDIO_PROJECT_ID` or `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `SANITY_STUDIO_DATASET` or `NEXT_PUBLIC_SANITY_DATASET`

Optional env vars:

- `SANITY_API_VERSION` or `NEXT_PUBLIC_SANITY_API_VERSION` (default: `2025-02-19`)
- `SANITY_API_READ_TOKEN`
- `SANITY_USE_CDN` (`true` or `false`, default: `true`)
