# AGENTS.md

## Current Project Shape

- Active app: `apps/web`, an Astro static portfolio and services site.
- Active content source: local typed data in `apps/web/src/data`.
- Active tests: Vitest/RTL for React components and utilities; Playwright setup is retained but route specs are paused.
- Archived reference code: `old/`. Do not edit, delete, lint-fix, move, or normalize files under `old/` unless explicitly asked.

## Primary Rules

1. Keep `apps/web` Astro-first. Use `.astro` pages, layouts, and presentational components for routed UI.
2. Keep page helpers in `apps/web/src/lib`; do not create parallel helper roots such as `lib-pages`.
3. Keep editable page/content records in `apps/web/src/data`; keep reusable helpers in `apps/web/src/lib` or `apps/web/src/utils`.
4. Do not reintroduce Next.js, remote content services, API services, docs-site infrastructure, Makefile workflows, or custom maintenance scripts.
5. Use local typed data until a real integration earns its weight.
6. Preserve accessibility, SEO, performance, and security as first-class requirements.

## Astro Standards

- Pages live in `apps/web/src/pages`.
- Shared document/layout shells live in `apps/web/src/layouts`.
- Native Astro components live directly in `apps/web/src/components` when they are only used by Astro pages.
- React components may remain for reusable/tested UI primitives, but do not add React islands unless interactivity requires client JavaScript.
- Prefer semantic HTML in Astro before adding ARIA.
- Keep inline scripts small, scoped, and dependency-free.
- Use `BaseDocument.astro` for metadata, canonical URLs, social tags, and JSON-LD.

## SEO Standards

- Every indexable page needs one `h1`, a unique title, description, canonical URL, Open Graph URL, Twitter card, and JSON-LD.
- The site must identify `Guy Romelle Magayano` as owner, author, publisher, and service provider where relevant.
- Portfolio/service pages should expose `Person`, `WebSite`, `WebPage`, `ProfessionalService`, `OfferCatalog`, `ContactAction`, `Article`, or `CollectionPage` schema as appropriate.
- External links need `rel="noopener noreferrer"` when `target="_blank"`.
- Images need meaningful `alt`, stable dimensions, and lazy loading when below the fold.

## Accessibility Standards

- Use semantic elements first: `header`, `nav`, `main`, `section`, `article`, `footer`, `time`, `figure`.
- Use `aria-labelledby` for named regions when a visible heading exists.
- Interactive controls require accessible names, keyboard behavior, focus visibility, and correct state attributes.
- Menus/dialog-like overlays must support Escape and keep focus within the open surface.
- Avoid duplicate IDs; generated/reused cards need scoped IDs.
- Tests should prefer `getByRole` and assert ARIA relationships for React components.

## Performance Standards

- Ship static HTML by default.
- Avoid unused integrations and client JavaScript.
- Keep dependencies tight; remove packages that no active source imports.
- Use Astro build output checks to catch accidental client chunks.
- Use direct imports instead of broad barrels for large packages.

## React + TypeScript Standards

- `packages/*` React components use `forwardRef` and `setDisplayName` when that package pattern exists.
- `apps/web` React components must not use `setDisplayName`; React 19 refs flow through props spread where applicable.
- Co-locate component-specific types; create shared type files only when multiple modules consume them.
- Use strict TypeScript, explicit exported types, and concise JSDoc.
- Use `cva` with `cn()` for stable variants; use plain `cn()` for static layout composition.

## Testing Standards

- Use Vitest for unit/integration tests.
- Use React Testing Library for React component behavior.
- Keep tests behavior-focused and accessibility-aware.
- Keep Playwright setup operational, but do not add route specs unless requested.
- Run app-level checks before handoff: `pnpm --filter web lint`, `pnpm --filter web check-types`, `pnpm --filter web test:run`, and `pnpm --filter web build`.

## Documentation Standards

- Keep `README.md` current and concise.
- Keep package READMEs aligned with actual exports and active framework support.
- Do not recreate the deleted `docs/` tree unless explicitly requested.
- Use one-line JSDoc for single-sentence docs; multiline JSDoc only for real examples, caveats, or thrown behavior.

## Git Standards

- Use conventional commit subjects.
- For non-trivial commits, include a bullet body with no blank lines between bullets.
- Wrap code identifiers in backticks in commit bodies.
- Sign commits when committing for this repository.
