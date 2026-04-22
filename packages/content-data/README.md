# `@portfolio/content-data`

Typed local content snapshot for the portfolio monorepo.

## Role

This package is the only content database in the repo.

- Author content here.
- Validate content here.
- Serve content through `apps/api`.
- Consume content in `apps/web` through the portfolio API boundary when the data is part of the public content delivery flow.

## Authoring Workflow

Edit the content source directly under `src/`:

- `src/articles.ts`
- `src/pages.ts`
- `src/portfolio.ts`
- `src/portfolio/`

The package now uses typed authoring helpers from `src/authoring.ts` so common edits stay compact:

- `createPortableTextParagraph(...)`
- `defineArticle(...)`
- `definePage(...)`
- portfolio section helpers like `heroSection(...)`, `projectsSection(...)`, and `ctaListSection(...)`

## Snapshot Structure

`portfolioSnapshot` is assembled from smaller domain modules:

- `src/portfolio/site-shell.ts`
- `src/portfolio/offerings.ts`
- `src/portfolio/pages.ts`
- `src/portfolio/collections.ts`

This keeps the content graph easier to scan in an editor when adding or removing sections, projects, speaking entries, uses categories, or gallery photos.

## Validation

Run the package-level validation flow:

```bash
pnpm --filter @portfolio/content-data validate
```

Or from the repo root:

```bash
pnpm content:check
```

That runs:

- Type checking
- Snapshot validation
- Unit tests for authoring helpers and content integrity

## Exports

- `articlesSnapshot`
- `pagesSnapshot`
- `portfolioSnapshot`
- `contentSnapshot`
- validation helpers

## Portfolio-Style CMS Snapshot

`portfolioSnapshot` provides an additive content graph modeled after a portfolio-style site:

- profile + navigation + social links
- projects collection
- speaking appearances collection
- uses categories collection
- work experience timeline
- photo gallery assets
- page documents with section blocks

This shape is designed to map cleanly to Django/Wagtail concepts:

- site settings / snippets for reusable entities
- StreamField-style section blocks for page composition
- slug-based references for headless API responses
