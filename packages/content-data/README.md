# @portfolio/content-data

Typed local content snapshot for portfolio article and standalone page data.

## Purpose

- Provide a deterministic content source independent of external CMS runtime availability.
- Keep content contracts aligned with `@portfolio/api-contracts` payload shapes.
- Keep local snapshot modules as the canonical source for article and page content.

## Exports

- `articlesSnapshot`
- `pagesSnapshot`
- `portfolioSnapshot`
- `contentSnapshot`

## Portfolio-Style CMS Snapshot

`portfolioSnapshot` provides an additive content graph modeled after a portfolio-style site:

- Profile + navigation + social links
- Projects collection
- Speaking appearances collection
- Uses categories collection
- Work experience timeline
- Photo gallery assets
- Page documents with section blocks

This shape is designed to map cleanly to Django/Wagtail concepts:

- Site settings / snippets for reusable entities
- StreamField-style section blocks for page composition
- Slug-based references for headless API responses
