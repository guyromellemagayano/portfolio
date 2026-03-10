<!-- markdownlint-disable no-emphasis-as-heading line-length -->

# `@portfolio/config-typescript`

Shared TypeScript configuration presets for the monorepo with strict defaults and framework-specific overrides.

## Features

- 🚀 **Multiple Presets**: Base, Next.js, React app, React library, Remix, and Vite configurations
- 🧭 **Strict Type Safety**: `strict` and `noUncheckedIndexedAccess` enabled by default
- 📦 **Modern Module Defaults**: `moduleResolution: "bundler"` and `module: "esnext"`
- 🧱 **Library-Friendly Baseline**: Declaration output enabled in the base preset
- ⚡ **Framework Overrides**: Targeted compiler options per runtime and build system
- 🔁 **Monorepo Consistency**: Shared defaults across apps and packages

## Presets

### Base Preset

For shared package defaults and server-side TypeScript projects.

```json
{
  "extends": "@portfolio/config-typescript/src/base.json"
}
```

**Highlights:**

- Strict type checking enabled
- Declaration and declaration maps enabled
- Modern ECMAScript target (`es2022`)
- Bundler-style module resolution

### Next.js Preset

For Next.js applications requiring the Next TypeScript plugin.

```json
{
  "extends": "@portfolio/config-typescript/src/nextjs.json"
}
```

**Highlights:**

- Extends base defaults
- Enables Next.js TypeScript plugin
- Allows JS files during gradual migration
- Disables declaration output for app builds

### React App Preset

For client-facing React applications.

```json
{
  "extends": "@portfolio/config-typescript/src/react-app.json"
}
```

**Highlights:**

- Extends base defaults
- Allows JS files
- Disables declaration output

### React Library Preset

For reusable React component packages.

```json
{
  "extends": "@portfolio/config-typescript/src/react-library.json"
}
```

**Highlights:**

- Extends base defaults
- Uses `react-jsx` transform
- Keeps declaration output from base preset

### Remix Preset

For Remix applications with React JSX and JSON module support.

```json
{
  "extends": "@portfolio/config-typescript/src/remix.json"
}
```

**Highlights:**

- Extends base defaults
- Uses `react-jsx` transform
- Enables JS interoperability and JSON module resolution

### Vite Preset

For Vite-based frontend applications.

```json
{
  "extends": "@portfolio/config-typescript/src/vite.json"
}
```

**Highlights:**

- Extends base defaults
- Enables `useDefineForClassFields`
- Adds stricter unused code checks
- Includes `src` by default

## Preset Overview

**Available Presets:**

- `@portfolio/config-typescript/src/base.json` - Shared baseline
- `@portfolio/config-typescript/src/nextjs.json` - Next.js apps
- `@portfolio/config-typescript/src/react-app.json` - React app projects
- `@portfolio/config-typescript/src/react-library.json` - React library packages
- `@portfolio/config-typescript/src/remix.json` - Remix apps
- `@portfolio/config-typescript/src/vite.json` - Vite apps

All presets provide:

- A consistent strict TypeScript baseline
- Framework-specific compiler overrides
- Monorepo-aligned defaults for module resolution and target

## Installation

Install in your package:

```bash
pnpm add -D @portfolio/config-typescript typescript
```

Add to your `package.json` development dependencies:

```json
{
  "devDependencies": {
    "@portfolio/config-typescript": "workspace:*",
    "typescript": "catalog:"
  }
}
```

## Setup

### 1. Choose a Preset

Create or update `tsconfig.json`:

```json
{
  "extends": "@portfolio/config-typescript/src/base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### 2. Use a Framework Preset

Use the preset that matches your runtime:

```json
{
  "extends": "@portfolio/config-typescript/src/nextjs.json"
}
```

### 3. Add Project Overrides

Keep shared defaults intact and override only what your project needs:

```json
{
  "extends": "@portfolio/config-typescript/src/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

## Integration Examples

### Next.js App

```json
{
  "extends": "@portfolio/config-typescript/src/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

### Library Package

```json
{
  "extends": "@portfolio/config-typescript/src/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

### Vite App

```json
{
  "extends": "@portfolio/config-typescript/src/vite.json",
  "compilerOptions": {
    "types": ["vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}
```

## Best Practices

### 1. **Prefer Extends Over Copy/Paste**

- Keep shared defaults centralized in this package
- Avoid duplicating compiler options across repositories

### 2. **Apply Minimal Overrides**

- Override only project-specific options (`outDir`, `paths`, `types`)
- Keep strictness defaults inherited unless there is a clear need

### 3. **Match Preset to Project Type**

- Use `nextjs.json` for Next.js apps
- Use `react-library.json` for publishable UI/component packages
- Use `base.json` for non-UI packages and utilities

### 4. **Keep Includes Explicit**

- Prefer explicit `include` globs per package
- Avoid broad includes that pull build artifacts or generated files

## Troubleshooting

### Common Issues

**Cannot resolve preset path**

Ensure the package is installed and referenced with the full path:

```json
{
  "extends": "@portfolio/config-typescript/src/base.json"
}
```

**Unexpected declaration output in app projects**

Use an app-focused preset (`nextjs.json` or `react-app.json`) which disables declarations.

**Type errors after migration**

Start from `base.json`, then add targeted overrides instead of disabling strict flags globally.

## Dependencies

- `typescript`: Type checker and compiler
