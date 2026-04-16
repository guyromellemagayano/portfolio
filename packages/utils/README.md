<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/utils`

Shared utility helpers for React-oriented packages in this monorepo, including component helpers, link/navigation validation, date/image guards, and bundle diagnostics.

## Features

- 🧩 **React Utility Surface**: Component, link, navigation, date, and image helpers
- 🧪 **Type-Safe APIs**: Generic helpers for navigation item validation and filtering
- 🛡️ **Rendering Guards**: Safe defaults for links, data attributes, and ARIA wiring
- 🌳 **Bundle Diagnostics**: Tree-shaking and bundle-report helpers for development analysis
- 📦 **Monorepo-Ready**: Shared package for apps and packages using `@portfolio/*`

## Exports

`@portfolio/utils` currently exports the following groups from `src/react/*`:

### Component Utilities

- `trimStringContent`
- `setDisplayName`
- `createComponentDataAttributes`
- `createAriaLabelledBy`
- `createComponentProps`

### Link Utilities

- `isValidLink`
- `getLinkTargetProps`
- `getDefaultLinkProps`

### Navigation Utilities

- `hasValidNavigationLinks`
- `isValidNavigationLink`
- `filterValidNavigationLinks`

### Image Utilities

- `isValidImageSrc`

### Date Utilities

- `formatDateSafely`

### Bundle Diagnostics

- `getBundleSize`
- `getEnvironmentInfo`
- `logBundleSize`
- `logTreeShakingVerification`
- `isReactComponentTreeShakeable`
- `isTreeShakeable`
- `verifyTreeShaking`
- `verifyImports`

## Installation

This package is part of the workspace and consumed via workspace dependency resolution.

```bash
pnpm add @portfolio/utils
```

Typical workspace dependency declaration:

```json
{
  "dependencies": {
    "@portfolio/utils": "workspace:*"
  }
}
```

## Usage

### Component Data Attributes

```ts
import { createComponentProps } from "@portfolio/utils";

const props = createComponentProps("header-nav", "item", true, "Menu", {
  role: "navigation",
});
```

### Navigation Validation

```ts
import { filterValidNavigationLinks } from "@portfolio/utils";

const links = filterValidNavigationLinks([
  { label: "Home", href: "/" },
  { label: "", href: "/broken" },
  { label: "Blog", href: "/blog" },
]);
```

### Safe External Link Attributes

```ts
import { getLinkTargetProps } from "@portfolio/utils";

const attrs = getLinkTargetProps("https://example.com");
// { target: "_blank", rel: "noopener noreferrer" }
```

### Date Formatting

```ts
import { formatDateSafely } from "@portfolio/utils";

const humanDate = formatDateSafely("2026-03-11", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
```

## Build and Validation

Use package scripts from `packages/utils/package.json`:

```bash
pnpm --filter @portfolio/utils build
pnpm --filter @portfolio/utils lint
pnpm --filter @portfolio/utils check-types
pnpm --filter @portfolio/utils test:run
```

## Notes

- Bundle diagnostic helpers (`logBundleSize`, `logTreeShakingVerification`) are development-oriented and environment-gated.
- `setDisplayName` is intended for package-level React components where explicit naming improves DX and debugging.
- If utility behavior changes, update both this README and `src/README.md` to keep package and source docs aligned.
