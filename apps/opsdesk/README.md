<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/opsdesk`

Internal admin UI workspace for the portfolio monorepo, built with Vite + React and shared `@portfolio/*` packages.

## Features

- 🚀 **Vite + React Runtime**: Fast local development with Vite and React 19 entrypoint setup
- 🧩 **Shared Workspace UI Stack**: Uses `@portfolio/ui`, `@portfolio/components`, `@portfolio/hooks`, and `@portfolio/utils`
- 🎛️ **OpsDesk Workspace Surface**: Reference screen with shared UI primitives (`CounterButton`, `Link`) for integration checks
- 🌐 **Local Domain Support**: `LOCAL_DEV_DOMAIN`-aware host allowlist in `vite.config.ts`
- 🔁 **Workspace Tooling Alignment**: Shared linting, typechecking, formatting, and stylelint scripts

## Scripts

Run from repo root with `pnpm --filter opsdesk <script>`.

- `dev` - Start Vite dev server (`0.0.0.0:3001`)
- `build` - Build production bundle with Vite
- `clean` - Remove local build/test caches (`node_modules`, `.turbo`, `dist`, `coverage`)
- `lint` / `lint:fix` - ESLint checks/fixes
- `lint:styles` / `lint:styles:fix` - Stylelint checks/fixes
- `check-types` - TypeScript checks (`tsc --noEmit`)
- `format` / `format:check` - Prettier formatting checks for source files
- `test`, `test:run`, `test:coverage`, `test:ui` - Placeholder scripts (no test suite configured yet)

## Installation

Install workspace dependencies from repo root:

```bash
pnpm install
```

## Setup

### 1. Run Local Development Server

```bash
pnpm --filter opsdesk dev
```

Default local URL:

```text
http://localhost:3001
```

### 2. Build for Production

```bash
pnpm --filter opsdesk build
```

### 3. Validate Tooling

```bash
pnpm --filter opsdesk check-types
pnpm --filter opsdesk lint
pnpm --filter opsdesk lint:styles
```

## Environment Notes

`vite.config.ts` reads env values from workspace root (`envDir: ../../`).

- `LOCAL_DEV_DOMAIN` (optional): Overrides default local domain used in Vite `server.allowedHosts`
- Default local domain fallback: `guyromellemagayano.local`
- Allowed hosts include both:
  - `<effective-domain>`
  - `opsdesk.<effective-domain>`

## Development

Current app entrypoints:

- `src/main.tsx` - React root bootstrap and strict-mode render
- `src/app/index.tsx` - Admin OpsDesk workspace view
- `src/styles.css` and `src/app/styles.css` - Global/app-level styles

## Testing

There is currently no configured automated test suite for this app.

The `test*` scripts in `package.json` are placeholders and intentionally print no-test messages.

## Troubleshooting

### Common Issues

**Dev server host is blocked**

Check `LOCAL_DEV_DOMAIN` and ensure requested host matches configured Vite `allowedHosts`.

**Workspace package import errors**

Reinstall dependencies from workspace root:

```bash
pnpm install
```

**Styles lint checks fail unexpectedly**

Run auto-fix and re-check:

```bash
pnpm --filter opsdesk lint:styles:fix
pnpm --filter opsdesk lint:styles
```

## Dependencies

- Runtime dependencies: `react`, `react-dom`, `react-router`, `@portfolio/components`, `@portfolio/hooks`, `@portfolio/ui`, `@portfolio/utils`
- Dev dependencies: shared workspace tooling (`@portfolio/config-eslint`, `@portfolio/config-typescript`, `@portfolio/vitest-presets`, `vite`, `typescript`, and related lint/format tooling)
- Package visibility: `private` workspace app
