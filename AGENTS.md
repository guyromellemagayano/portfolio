# AGENTS.md

## Current Project Shape

- Active app: `apps/web`, an Astro static portfolio and services site.
- Active content source: JSON-backed local data in `apps/web/src/data`, with TypeScript companion files for schemas, loaders, derived records, and exported types.
- Active tests: Vitest/RTL for React components and utilities; Playwright setup is retained but route specs are paused.
- Archived reference code: `old/`. Do not edit, delete, lint-fix, move, or normalize files under `old/` unless explicitly asked.

## Primary Rules

1. Keep `apps/web` Astro-first. Use `.astro` pages, layouts, and presentational components for routed UI.
2. Keep page helpers in `apps/web/src/lib`; do not create parallel helper roots such as `lib-pages`.
3. Keep editable page/content records in `apps/web/src/data`; keep reusable helpers in `apps/web/src/lib` or `apps/web/src/utils`.
4. Do not reintroduce Next.js, remote content services, API services, docs-site infrastructure, Makefile workflows, or custom maintenance scripts.
5. Use local typed data until a real integration earns its weight.
6. Preserve accessibility, SEO, performance, and security as first-class requirements.
7. Follow `.cursor/rules/package-governance.mdc` and `.cursor/rules/import-resolution.mdc` for dependency placement, package exports, and import boundaries.

## Subagent Operating Model

- The parent agent is always the integrator. It owns task interpretation, scope control, final code review, validation selection, and the final response to the user.
- Use subagents only when the user asks for subagents, delegation, or parallel agent work, or when an active project instruction explicitly requires a delegated workflow.
- Prefer single-agent execution for small one-file edits, direct questions, typo fixes, and any task where delegation would cost more coordination than it saves.
- Use subagents for substantial operations that split cleanly by responsibility, such as JSON data migration slices, Astro UI implementation, SEO/schema review, package governance, accessibility review, or test verification.
- Deployment diagnostics and commit grouping are also valid subagent surfaces when the user asks for that level of delegation.
- Do not delegate the immediate blocking step when the parent agent needs that result before it can continue. The parent should do blocking work locally and delegate sidecar work that can run in parallel.
- Do not assign two subagents to the same write surface at the same time unless their ownership boundaries are explicit and non-overlapping.
- Every subagent must assume other edits may exist in the worktree. Subagents must not revert, normalize, restyle, or delete work they were not assigned to touch.
- Every subagent must follow this `AGENTS.md`, the nearest more-specific `AGENTS.md` if one exists, and the cursor rules referenced by this file.
- Subagents must treat `old/` as read-only reference material. They must not edit, delete, lint-fix, move, or normalize files under `old/` unless the user explicitly asks.
- Subagents must keep the site Astro-first. They must not reintroduce Next.js, remote content services, API services, docs-site infrastructure, Makefile workflows, or custom maintenance scripts.

## Custom Agent Files

- Project-scoped custom Codex agents live under `.codex/agents/` as one TOML file per agent.
- The role catalog in this file is the high-level registry. The `.codex/agents/<role>.toml` files are the executable custom-agent definitions Codex can spawn.
- Each custom-agent file must define `name`, `description`, and `developer_instructions`; it may also pin `model`, `model_reasoning_effort`, `sandbox_mode`, MCP servers, or skill config.
- Before spawning or briefing a subagent, the parent agent must read the matching `.codex/agents/<role>.toml` file and include its constraints in the assignment.
- If a custom-agent file conflicts with this `AGENTS.md`, this `AGENTS.md` wins.
- Do not use `.agents/subagents/` for Codex custom agents. `.agents/skills/` is reserved for reusable skills, not subagent definitions.
- If a task does not match a custom agent cleanly, keep the work with the parent agent or create a narrower explicit assignment rather than stretching a role beyond its purpose.

## Subagent Assignment Contract

- Each delegated task must name the role, objective, expected output, allowed write paths, forbidden paths, validation command expectations, and whether the subagent may commit.
- Each delegated task must state that the subagent is not alone in the codebase and must preserve unrelated local changes.
- Each delegated task must define a disjoint ownership boundary. Ownership can be a file list, route family, data slice, package, test family, or read-only review scope.
- Each delegated task must identify whether the subagent is a worker, reviewer, or verifier.
- Workers may edit assigned files, reviewers should return findings, and verifiers should run checks or inspect outputs without changing source unless explicitly asked.
- Each delegated task must ask the subagent to report changed files, validation performed, validation failures, skipped checks, and any residual risks.
- Subagents should use `rg` and `rg --files` for repository discovery and should avoid broad scans when a focused file list is available.
- Subagents should use `apply_patch` for manual source edits and should avoid generated rewrites unless the parent explicitly authorizes them.
- Subagents must keep comments, JSDoc, and docs concise unless the task is explicitly documentation-heavy.
- Subagents must not perform destructive Git operations, dependency installation, network operations, deployments, or externally visible actions unless the user or parent explicitly authorizes that action.

## Subagent Review And Integration Rules

- The parent agent must review subagent output before handoff. For code changes, review the diff rather than trusting a summary.
- The parent agent must resolve overlaps between subagent outputs before running final validation.
- The parent agent must choose validation based on the touched surface. App changes normally require `pnpm lint:web`, `pnpm check-types:web`, `pnpm test:web`, and `pnpm build:web`.
- Documentation-only changes can use a narrower validation path, but the parent must state which checks were run and why broader app checks were skipped.
- The parent agent must keep grouped commits aligned by responsibility. Do not combine unrelated app, package, data, docs, and workflow changes into a catch-all commit.
- If a subagent is allowed to commit, it must stage only its assigned files, use a conventional signed commit, and leave unrelated local changes untouched.
- The parent agent remains responsible for confirming Git status, commit boundaries, and verification evidence before telling the user the work is complete.

## Subagent Role Catalog

### `repo-scope-auditor`

- Purpose: Read-only orientation for large or ambiguous requests before implementation starts.
- Use this role when the task needs a current map of affected files, existing patterns, stale surfaces, import boundaries, or likely validation commands.
- This role should inspect `apps/web`, `packages/*`, `.cursor/rules/*`, package manifests, and tests only as needed for the requested scope.
- This role must not edit files. Its output should be a concise scope map, risks, likely ownership boundaries, and recommended next subagents.
- This role is useful before JSON migrations, route refactors, package cleanup, dependency decisions, or grouped commit planning.

### `json-data-worker`

- Purpose: Implement local data migrations and maintain the JSON-backed content model under `apps/web/src/data`.
- Use this role for converting TypeScript object literals into `.json` records, maintaining `.types.ts` companions, updating loaders, preserving derived exports, and adjusting imports.
- This role owns only the assigned data slice and directly related tests or loaders. It should not edit Astro page layouts unless the parent explicitly includes those files.
- This role must keep JSON files as editable content records and keep validation, parsing, normalization, and derived TypeScript exports in `.ts` files.
- This role must preserve type safety with explicit exported types, strict parsing, stable slugs, deterministic sorting, and clear fallbacks for optional fields.
- This role should prefer schema-style validation or narrow parsing helpers over trusting raw JSON imports in page code.
- This role should verify with at least typechecking and any data-specific tests. For route-visible data changes, it should expect the parent to run the full web validation set.

### `astro-ui-worker`

- Purpose: Implement routed UI and static presentation surfaces in the Astro app.
- Use this role for `.astro` pages, layouts, static components, route sections, and Astro-native content rendering.
- This role owns assigned files under `apps/web/src/pages`, `apps/web/src/layouts`, and Astro-only components under `apps/web/src/components`.
- This role may use helpers from `apps/web/src/lib` or `apps/web/src/utils`, but it must not create parallel helper roots such as `lib-pages`.
- This role must prefer static HTML, semantic elements, scoped styling, and small dependency-free inline scripts before adding client JavaScript.
- This role must not add React islands unless interactivity requires client-side behavior and the parent approves the architectural tradeoff.
- This role should keep visual changes consistent with the established portfolio direction rather than introducing generic template UI.

### `react-component-worker`

- Purpose: Maintain React components that remain justified as reusable or tested UI primitives.
- Use this role for component behavior, variants, React Testing Library coverage, and package-level React APIs.
- This role owns assigned React component files, nearby tests, and component-specific type files only.
- In `packages/*`, this role should follow existing package patterns for `forwardRef`, native `Component.displayName = "Name"` assignments, `cva`, and `cn()`.
- In `apps/web`, this role must not add display-name helper wrappers and should respect React 19 ref handling through props spread where applicable.
- This role must keep accessibility behavior testable through roles, names, keyboard interactions, focus state, and ARIA relationships.
- This role must not convert Astro-native surfaces into React components unless the parent explicitly asks for an interactive island.

### `seo-schema-worker`

- Purpose: Protect page metadata, canonical URLs, social tags, and JSON-LD quality.
- Use this role for changes involving `BaseDocument.astro`, page metadata helpers, structured data builders, service pages, article pages, collection pages, and owner identity.
- This role owns assigned metadata helpers, schema builders, and route-level metadata wiring.
- This role must ensure every indexable page has one `h1`, a unique title, description, canonical URL, Open Graph URL, Twitter card, and appropriate JSON-LD.
- This role must identify `Guy Romelle Magayano` as owner, author, publisher, and service provider where relevant.
- This role should check schema types against the page intent, such as `Person`, `WebSite`, `WebPage`, `ProfessionalService`, `OfferCatalog`, `ContactAction`, `Article`, or `CollectionPage`.
- This role should avoid SEO theater. Metadata must reflect actual page content, not keyword stuffing or unsupported service claims.

### `a11y-reviewer`

- Purpose: Review accessibility risks before or after UI changes.
- Use this role for semantic HTML review, keyboard interaction checks, focus behavior, named regions, image text alternatives, menu/dialog behavior, and React Testing Library assertions.
- This role is read-only by default. It should return findings with file and line references, severity, rationale, and targeted remediation.
- This role may edit only when the parent explicitly promotes it from reviewer to worker and assigns a narrow write scope.
- This role should prefer semantic fixes before ARIA additions.
- This role must check that interactive controls have accessible names, visible focus, keyboard behavior, and correct state attributes.
- This role should flag duplicate IDs, unlabeled regions, unclear link text, missing `alt`, and `target="_blank"` links without `rel="noopener noreferrer"`.

### `test-verification-agent`

- Purpose: Run, interpret, and narrow verification for changed surfaces.
- Use this role when implementation can continue while tests, typechecks, builds, coverage checks, or focused repro commands run in parallel.
- This role should not edit source files unless the parent explicitly asks it to fix a validation failure.
- This role must report exact commands, pass or fail status, important output, and whether failures appear related to the current changes.
- This role should prefer focused checks first when diagnosing a failure, then broader checks once the likely issue is fixed.
- This role must not hide skipped checks. If a command is too slow, unavailable, flaky, or blocked by environment state, it must say so directly.
- This role is the default verifier for `pnpm lint:web`, `pnpm check-types:web`, `pnpm test:web`, `pnpm build:web`, and package-specific test commands.

### `package-governance-agent`

- Purpose: Protect dependency placement, package exports, import boundaries, and monorepo hygiene.
- Use this role for dependency additions, package manifest edits, package README alignment, import-boundary questions, and shared-package API changes.
- This role should inspect `.cursor/rules/package-governance.mdc`, `.cursor/rules/import-resolution.mdc`, relevant `package.json` files, and package entrypoints before recommending changes.
- This role must keep dependencies tight and scoped to the package or app that imports them.
- This role must avoid broad barrels for large packages and should prefer direct imports when performance or bundle shape matters.
- This role must not add framework support, remote services, or app-specific behavior to reusable packages unless the package contract explicitly calls for it.
- This role should identify obsolete dependencies when no active source imports them and recommend removal only when the evidence is clear.

### `docs-maintainer`

- Purpose: Keep repository documentation accurate, concise, and aligned with active code.
- Use this role for `README.md`, package READMEs, `AGENTS.md`, JSDoc cleanup, and documentation that explains current workflows.
- This role owns assigned docs files only and must not recreate the deleted `docs/` tree unless the user explicitly asks.
- This role must document the active Astro/local-data architecture, not archived Next.js behavior or planned integrations that do not exist.
- This role should prefer one-line JSDoc for simple explanations and multiline JSDoc only for examples, caveats, thrown behavior, or non-obvious constraints.
- This role should keep documentation practical and enforceable. Avoid aspirational rules that future agents cannot verify in the repository.
- This role should run the narrowest relevant formatting or linting checks for docs-only work and report when app-level checks were intentionally skipped.

### `security-performance-reviewer`

- Purpose: Review security and performance regressions across app, data, dependency, and deployment surfaces.
- Use this role for changes touching external links, inline scripts, user-provided data, environment variables, dependency additions, build output, client JavaScript, or deployment configuration.
- This role is read-only by default and should return findings with severity, affected path, attack or regression scenario, and practical remediation.
- This role should verify that static HTML remains the default, client JavaScript is justified, external links are safe, and JSON parsing does not trust unvalidated content.
- This role should watch for accidental secrets, broad environment exposure, unnecessary runtime dependencies, large client chunks, and unsafe HTML injection.
- This role may suggest focused validation such as build output checks, bundle inspection, or targeted tests when the risk is tied to runtime behavior.

### `deployment-ops-agent`

- Purpose: Diagnose deployment, Vercel, environment, and runtime issues without changing application architecture by default.
- Use this role for build failures, deployment inspection, environment-variable questions, Lighthouse or Search Console maintenance, and production verification.
- This role should prefer read-only inspection before mutation and must ask before externally visible actions such as deploys, promotions, rollbacks, or environment changes.
- This role must preserve the local-only posture when the user says a setup is local-only.
- This role should separate local `.env` guidance from explicit Vercel environment-variable actions.
- This role should avoid reintroducing Docker, API services, or Makefile workflows into this portfolio unless the user explicitly reverses the current project direction.

### `git-commit-agent`

- Purpose: Prepare reviewable grouped commits after implementation and validation are complete.
- Use this role only when the user asks to commit, group commits, rewrite commit organization, push, or prepare a pull request.
- This role must inspect `git status --short` and staged changes before committing.
- This role must stage only files that belong to the assigned commit group and must leave unrelated local changes untouched.
- This role must use conventional commit subjects, signed commits, and bullet bodies for non-trivial commits with no blank lines between bullets.
- This role must wrap code identifiers in backticks in commit bodies.
- This role should verify commit signatures when practical and report commit hashes, grouped scope, and any files intentionally left uncommitted.

## Astro Standards

- Pages live in `apps/web/src/pages`.
- Shared document/layout shells live in `apps/web/src/layouts`.
- Native Astro components live directly in `apps/web/src/components` when they are only used by Astro pages.
- React components may remain for reusable/tested UI primitives, but do not add React islands unless interactivity requires client JavaScript.
- Prefer semantic HTML in Astro before adding ARIA.
- Keep inline scripts small, scoped, and dependency-free.
- Use `BaseDocument.astro` for metadata, canonical URLs, social tags, and JSON-LD.

## Naming Standards

- App and package folders use kebab-case; package names match folder names.
- Route files follow Astro routing conventions: `index.astro`, `[slug].astro`, and kebab-case URL segments.
- Astro component files and React component files use PascalCase.
- Component folders use kebab-case with an `index.ts` barrel only when the folder exports a public component API.
- Data, helper, utility, and config files use lower-case kebab-case unless a framework convention requires another name; type companions may use `.types.ts`.
- Tests live in nearby `__tests__` folders and use `.test.ts` or `.test.tsx`.

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

- `packages/*` React components use `forwardRef` where that package pattern exists and native `Component.displayName = "Name"` assignments for DevTools/debugging names.
- `apps/web` React components must not use display-name helper wrappers; React 19 refs flow through props spread where applicable.
- Co-locate component-specific types; create shared type files only when multiple modules consume them.
- Use strict TypeScript, explicit exported types, and concise JSDoc.
- Use inline type import specifiers everywhere: `import { type Foo } from "module"`. Do not use top-level `import type { Foo } from "module"`.
- Use `cva` with `cn()` for stable variants; use plain `cn()` for static layout composition.

## Testing Standards

- Use Vitest for unit/integration tests.
- Use React Testing Library for React component behavior.
- Keep tests behavior-focused and accessibility-aware.
- Keep Playwright setup operational, but do not add route specs unless requested.
- Run app-level checks before handoff through Turborepo: `pnpm lint:web`, `pnpm check-types:web`, `pnpm test:web`, and `pnpm build:web`.

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
