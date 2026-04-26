<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/config-eslint`

Shared ESLint flat-config presets for the active Astro/React monorepo.

## Presets

- `@portfolio/config-eslint` - base TypeScript, JavaScript, Vitest, Testing Library, import sorting, and unused import rules.
- `@portfolio/config-eslint/react` - base rules plus React hooks and React component rules.
- `@portfolio/config-eslint/prettier` - shared Prettier config for root and package formatting.

## Usage

```javascript
import { baseEslintConfig } from "@portfolio/config-eslint";

export default baseEslintConfig;
```

```javascript
import { reactEslintConfig } from "@portfolio/config-eslint/react";

export default reactEslintConfig;
```

```javascript
const prettierConfig = require("@portfolio/config-eslint/prettier");

module.exports = prettierConfig;
```

## Maintenance

- Keep `src/index.js` `tsProjects` aligned with active workspaces.
- Keep `src/prettier.cjs` aligned with active file types and formatting plugins.
- Add local app/package overrides after the shared preset.
- Do not keep framework presets for frameworks that are not active in this monorepo.
