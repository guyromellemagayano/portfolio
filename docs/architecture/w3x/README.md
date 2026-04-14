# W3X

## What W3X Is

W3X is the private internal framework direction for the portfolio monorepo.

It is HTML-first, React 19-first, and semantics/a11y-first. The goal is to use native HTML as the authoring baseline, then augment it with React where state, composition, refs, and accessibility behavior add real value.

W3X is built for personal use and portfolio architecture. It is not intended to be an open source or publicly distributed UI framework.

## Why It Exists

W3X exists to standardize semantics, accessibility, and interaction behavior across the monorepo's apps and shared packages.

It is also intended to avoid framework, router, and styling lock-in in the core layer. Apps should be able to consume the shared foundation without forcing framework-specific assumptions into the lowest-level packages.

W3X replaces the earlier broad-wrapper direction represented by `packages/components` with a clearer layered system and stricter package boundaries.

## Package Family

### `packages/w3x/dom`

The DOM package owns semantic wrappers and low-level DOM/composition helpers. It should stay close to native HTML and React, with minimal runtime abstraction.

This layer is responsible for semantics, selective polymorphism where valid, refs, IDs, ARIA wiring helpers, and composition utilities. It should not own routing, CMS integration, analytics transport, or app-specific styling.

### `packages/w3x/primitives`

The primitives package owns headless interaction primitives with strict keyboard, focus, and ARIA contracts.

This layer is where behavior-heavy UI patterns live, such as dialog, menu, tabs, popover, tooltip, and disclosure. It should remain presentation-agnostic and focused on correctness, accessibility, and composability.

### `packages/w3x/ui`

The UI package owns shared styled components built on top of the W3X core layers.

This layer can define visual composition, tokens, and app-facing presentation, but it should rely on `dom` and `primitives` for semantics and behavior instead of re-implementing them. App-specific composition that does not belong in the shared layer should stay in app code until a true shared need emerges.

## Package Naming and Imports

The repo layout is nested under `packages/w3x/*`, but package names should stay explicit and flat at the import layer:

- `packages/w3x/dom` -> `@portfolio/w3x-dom`
- `packages/w3x/primitives` -> `@portfolio/w3x-primitives`
- `packages/w3x/ui` -> `@portfolio/w3x-ui`

W3X should feel like one umbrella system, but consumers should import from the package that matches the layer they actually need.

Public imports should come from each package root. Subpath imports should not be part of the default public API unless a package later defines them intentionally.

Example target usage:

```tsx
import { Heading, Link } from "@portfolio/w3x-dom";
import { Dialog } from "@portfolio/w3x-primitives";
import { SiteHeader } from "@portfolio/w3x-ui";
```

## Layer Boundaries

W3X package boundaries should be strict:

- `dom` may depend on low-level shared utilities, React, and narrowly scoped helper packages.
- `primitives` may depend on `dom`, React, and low-level shared utilities.
- `ui` may depend on `dom` and `primitives`.

The reverse is not allowed:

- `dom` must not depend on `primitives` or `ui`.
- `primitives` must not depend on `ui`.
- Core W3X layers must not depend on app packages.

Framework, router, CMS, analytics transport, and app-specific data concerns stay outside the core W3X layers. If an app needs those integrations, it should own them in app code or a separate adapter layer.

## Wave 1 Surface

The first W3X implementation should stay narrow and prove the architecture before broadening it.

### `@portfolio/w3x-dom`

Wave 1 DOM exports:

- `Heading`
- `Text`
- `Link`
- `Button`
- `Form`
- `Label`
- `Input`
- `Time`
- `Image`
- `VisuallyHidden`
- `Slot`

These are the components that best match the W3X thesis: native semantics first, React augmentation where useful, and a small shared surface that can be applied across apps without importing app-specific concerns.

### `@portfolio/w3x-primitives`

Wave 1 primitive exports:

- `Dialog`
- `Disclosure`
- `Tabs`
- `Menu`
- `Popover`
- `Tooltip`

These should be headless and tested hard. They are the first primitives because they provide the biggest behavior and accessibility value beyond what thin DOM wrappers can offer.

### `@portfolio/w3x-ui`

Wave 1 `ui` should stay intentionally thin.

Only components that prove they are truly shared across apps should move here. App-specific styled composition should remain in app code until it demonstrates a real cross-app need.

## Transition Map

The current `@portfolio/components` package should not be migrated as a one-to-one wrapper catalog.

### Migrate into `dom` as concepts

- `heading` -> `Heading`
- `button` -> `Button`
- `form` -> `Form`
- `input` -> `Input`
- `label` -> `Label`
- `img` -> `Image`
- `time` -> `Time`
- `slot` -> `Slot`
- `a` and `link` -> one semantic `Link`

Selected sectioning or content wrappers such as `article`, `section`, `main`, `nav`, `aside`, `header`, and `footer` should only move if they remain useful after the app audit. They are not part of the required Wave 1 surface.

### Do not migrate as-is

- `isClient`
- `isMemoized`
- broad client-branch wrapper behavior
- analytics transport helpers from `analytics.ts`
- the global polymorphic helper registry from `polymorphic-helpers.ts`
- the exhaustive HTML wrapper catalog

These parts belong to the earlier experiment and do not fit the tighter W3X architecture.

### Primitive wrappers are not the final primitives

Current thin exports such as `dialog`, `menu`, or other behavior-adjacent wrappers in `@portfolio/components` should not be treated as the final W3X primitive APIs.

W3X primitives should be rebuilt as headless behavior contracts rather than migrated as simple HTML-aligned wrappers.

## Immediate Migration Priorities

- Create `dom` first and keep the API intentionally small.
- Build one primitive end to end before expanding the primitive catalog; `Dialog` is the best first candidate.
- Keep `ui` minimal until multiple apps need the same styled components.
- Audit app-local components before promoting anything from app code into `ui`.

## Principles

- Native HTML is the source of truth.
- React augments HTML instead of replacing it.
- Fixed semantics are the default; polymorphism is selective and only used where it remains semantically valid.
- Headless behavior belongs in primitives, not base DOM wrappers.
- Core layers stay framework-agnostic and app-agnostic.
- Raw HTML remains a valid escape hatch.

## Non-Goals

- W3X is not a wrapper for every HTML tag.
- W3X is not a universal `as` API.
- W3X is not a public UI framework.
- W3X is not a router-aware core.
- W3X is not a CMS-aware core.
- W3X is not a styling system first.

## Current State

`packages/components` is the current precursor to W3X and should be treated as a legacy experiment in the broader shared-components direction.

It reflects an earlier model built around a wide HTML-wrapper surface from a single package. W3X is the target architecture that will replace that broad export model over time with clearer package boundaries and a more focused system shape.

There are currently no known workspace imports of `@portfolio/components` outside the package itself. That makes the migration easier to stage once the W3X packages are created.

## Implementation Notes

- The target repo layout is nested under `packages/w3x/*`.
- `pnpm-workspace.yaml` must include `packages/w3x/*` so the nested W3X packages are recognized as first-class workspace packages.
- Package names should stay explicit at the workspace import layer even if the repo layout is nested, following the `@portfolio/w3x-*` pattern.
- The first implementation step is scaffolding the package family with minimal root exports and package contracts. Component migration and API build-out happen after the package boundaries are in place.
