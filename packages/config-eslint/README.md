<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/config-eslint`

Shared ESLint flat-config presets for the monorepo with TypeScript-aware defaults, React/Next.js extensions, and consistent import/lint behavior.

## Features

- 🚀 **Flat Config Presets**: Base, React, and Next.js presets exported from one package
- 🧭 **Type-Aware Defaults**: TypeScript parser + project-aware linting for TS files
- 🔁 **Monorepo Consistency**: Shared sorting, unused import handling, and environment checks
- ⚛️ **React Rules Included**: `react-x` + `react-hooks` integration for React workspaces
- ▲ **Next.js Extensions**: Next recommended and core-web-vitals rules on top of React preset
- ✅ **Testing Guardrails**: Vitest + Testing Library rules for test files

## Presets

### Base Preset

For shared package defaults, Node/services, utility packages, and non-React projects.

```javascript
import { baseEslintConfig } from "@portfolio/config-eslint";

export default baseEslintConfig;
```

**Highlights:**

- Extends ESLint recommended + Prettier flat config
- TypeScript-aware linting for `*.ts`, `*.tsx`, `*.mts`, and `*.cts`
- JS-family unresolved-import protection via `n/no-missing-import`
- Import ordering via `simple-import-sort`
- Unused import/variable handling via `eslint-plugin-unused-imports`
- Test-specific Vitest + Testing Library rule set

### React Preset

For React apps and packages that need React rules in addition to base rules.

```javascript
import { reactEslintConfig } from "@portfolio/config-eslint/react";

export default reactEslintConfig;
```

**Highlights:**

- Extends `baseEslintConfig`
- Adds `eslint-plugin-react-x` recommended config
- Adds `eslint-plugin-react-hooks` recommended rules
- Enables browser and service worker globals

### Next.js Preset

For Next.js applications that need Next + React + base coverage.

```javascript
import { nextEslintConfig } from "@portfolio/config-eslint/next";

export default nextEslintConfig;
```

**Highlights:**

- Extends `reactEslintConfig`
- Adds `@next/eslint-plugin-next` recommended + core-web-vitals rules
- Applies selected Next rule overrides used by this monorepo

## Preset Overview

**Available Presets:**

- `@portfolio/config-eslint` - Base flat config
- `@portfolio/config-eslint/react` - React preset (base + React)
- `@portfolio/config-eslint/next` - Next.js preset (base + React + Next)

All presets provide:

- Shared import sorting and unused import behavior
- Shared testing standards for Vitest/Testing Library files
- Monorepo-aligned lint defaults and ignores

## Installation

Install in your package:

```bash
pnpm add -D @portfolio/config-eslint eslint
```

Add to your `package.json` development dependencies:

```json
{
  "devDependencies": {
    "@portfolio/config-eslint": "workspace:*",
    "eslint": "catalog:"
  }
}
```

## Setup

### 1. Create an ESLint Flat Config

Create `eslint.config.js`:

```javascript
import { baseEslintConfig } from "@portfolio/config-eslint";

export default baseEslintConfig;
```

### 2. Choose a Framework Preset

Switch to React or Next when needed:

```javascript
import { reactEslintConfig } from "@portfolio/config-eslint/react";

export default reactEslintConfig;
```

```javascript
import { nextEslintConfig } from "@portfolio/config-eslint/next";

export default nextEslintConfig;
```

### 3. Add Local Overrides

Keep shared defaults and layer project-specific rules after the preset:

```javascript
import { nextEslintConfig } from "@portfolio/config-eslint/next";

export default [
  ...nextEslintConfig,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "no-console": "off",
    },
  },
];
```

## Integration Examples

### Utility Package

```javascript
import { baseEslintConfig } from "@portfolio/config-eslint";

export default baseEslintConfig;
```

### React Package

```javascript
import { reactEslintConfig } from "@portfolio/config-eslint/react";

export default reactEslintConfig;
```

### Next.js App

```javascript
import { nextEslintConfig } from "@portfolio/config-eslint/next";

export default nextEslintConfig;
```

## Best Practices

### 1. **Use Presets As-Is First**

- Start with the closest preset (`base`, `react`, or `next`)
- Add local overrides only for project-specific needs

### 2. **Keep Shared Rules Centralized**

- Update shared lint behavior in this package, not per app/package
- Avoid duplicating import sort and unused import logic in consumers

### 3. **Limit Rule Exceptions**

- Prefer scoped `files` overrides over global disables
- Keep overrides small and explicit

### 4. **Keep TypeScript Project Paths Accurate**

- The base config uses explicit TS project references
- When adding new apps/packages, update `src/index.js` `tsProjects` if type-aware linting should include them

## Troubleshooting

### `@typescript-eslint/parser` project errors

If ESLint cannot find a `tsconfig.json` for a workspace, ensure that workspace is included in `tsProjects` in `src/index.js`.

### TS alias unresolved import behavior

`n/no-missing-import` is intentionally scoped to JS-family files in this preset. TypeScript unresolved imports are expected to be enforced via TypeScript checks (`check-types`) in this monorepo.

### Next.js rules missing

Use `@portfolio/config-eslint/next` in your app `eslint.config.js`; `@portfolio/config-eslint` and `/react` do not include `@next/next` rules.
