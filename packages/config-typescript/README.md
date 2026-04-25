<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/config-typescript`

Shared TypeScript presets for the active Astro/React monorepo.

## Presets

- `src/base.json` - strict package baseline.
- `src/astro.json` - Astro app baseline using `astro/tsconfigs/strict`.
- `src/react-app.json` - React application baseline.
- `src/react-library.json` - reusable React package baseline.
- `src/remix.json` - Remix app baseline if a Remix app is added again.
- `src/vite.json` - Vite frontend baseline.

## Usage

```json
{
  "extends": "@portfolio/config-typescript/src/base.json"
}
```

```json
{
  "extends": "@portfolio/config-typescript/src/astro.json"
}
```

## Maintenance

- Prefer extending these presets over copying compiler options.
- Keep app-specific aliases and includes in the app `tsconfig.json`.
- Do not keep framework presets for frameworks that are not active in this monorepo.
