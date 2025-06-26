# @packages/vitest-presets

Shared Vitest configuration presets for the monorepo with integrated V8 coverage support.

## Features

- 🚀 **Multiple Environment Presets**: Browser (JSDOM), Node.js, and React-specific configurations
- 📊 **V8 Coverage Integration**: Comprehensive coverage reporting with `@vitest/coverage-v8`
- 🎯 **Smart Coverage Thresholds**: Environment-specific coverage targets
- 🔧 **Shared Test Setup**: Browser API mocks, Jest DOM matchers, and utilities
- 📈 **Multiple Report Formats**: Text, JSON, HTML, LCOV, and Clover formats
- ⚡ **Performance Optimized**: Fast test execution with proper environment isolation

## Presets

### Browser Preset (`browser/vitest-preset.js`)

For DOM testing with JSDOM environment.

**Coverage Thresholds:**

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

```js
import { defineConfig } from "vitest/config";
import browserPreset from "@packages/vitest-presets/browser/vitest-preset.js";

export default defineConfig(browserPreset);
```

### Node Preset (`node/vitest-preset.js`)

For server-side testing with Node.js environment.

**Coverage Thresholds:**

- Statements: 85%
- Branches: 80%
- Functions: 85%
- Lines: 85%

```js
import { defineConfig } from "vitest/config";
import nodePreset from "@packages/vitest-presets/node/vitest-preset.js";

export default defineConfig(nodePreset);
```

### React Preset (`react/vitest-preset.js`)

For React component testing with full Testing Library support.

**Coverage Thresholds:**

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

```js
import { defineConfig } from "vitest/config";
import reactPreset from "@packages/vitest-presets/react/vitest-preset.js";

export default defineConfig(reactPreset);
```

## Coverage Features

### V8 Coverage Provider

All presets use the V8 coverage provider for fast, accurate coverage collection:

```json
{
  "coverage": {
    "provider": "v8",
    "reporter": ["text", "json", "html", "lcov", "clover"],
    "reportOnFailure": true
  }
}
```

### Coverage Reports

Multiple output formats are generated:

- **Text**: Console output during test runs
- **JSON**: Machine-readable coverage data
- **HTML**: Interactive coverage reports in `coverage/` directory
- **LCOV**: For CI/CD integration (SonarQube, Codecov, etc.)
- **Clover**: XML format for legacy tooling

### Coverage Commands

**Package-level scripts** (add to your `package.json`):

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:coverage:ui": "vitest --coverage --ui",
    "test:run": "vitest run",
    "test:run:coverage": "vitest run --coverage"
  }
}
```

**Example usage:**

```bash
# Run tests with coverage
pnpm test:coverage

# Run tests with coverage in UI mode
pnpm test:coverage:ui

# Run tests once with coverage (CI)
pnpm test:run:coverage
```

### Coverage Configuration

Coverage is automatically configured with sensible defaults:

**Included Files:**

- `src/**/*.{js,jsx,ts,tsx}` (source files)
- Excludes test files, config files, and type definitions

**Excluded Files:**

- `node_modules/`, `dist/`, `build/`, `coverage/`
- `**/*.test.*`, `**/*.spec.*`, `**/*.stories.*`
- `**/*.d.ts`, `**/*.config.*`
- Index files that are just re-exports
- Mock and fixture directories

**Coverage Thresholds:**

- Different thresholds per environment type
- Fails CI if thresholds aren't met
- Configurable per project

## Installation

Install in your package:

```bash
pnpm add -D @packages/vitest-presets @vitest/coverage-v8
```

Add to `package.json` peer dependencies:

```json
{
  "peerDependencies": {
    "@packages/vitest-presets": "workspace:*",
    "@vitest/coverage-v8": "catalog:",
    "vitest": "catalog:"
  }
}
```

## Setup

### 1. Choose a Preset

Create `vitest.config.ts` in your package:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // or "node"
    setupFiles: ["./src/test-setup.ts"],
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportOnFailure: true,
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
      // ... additional configuration
    },
  },
});
```

### 2. Test Setup File

Create `src/test-setup.ts`:

```ts
import "@testing-library/jest-dom";

// Browser API mocks
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Additional setup...
```

### 3. Add Scripts

Update your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:run:coverage": "vitest run --coverage"
  }
}
```

## Coverage Integration Examples

### Basic Coverage

```bash
# Run with coverage
pnpm test:coverage

# Output includes:
# ✓ All tests pass
# 📊 Coverage report with thresholds
# 📁 HTML report in coverage/ directory
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Run tests with coverage
  run: pnpm test:run:coverage

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
```

### Coverage Thresholds

Coverage fails if thresholds aren't met:

```
ERROR: Coverage for lines (76.99%) does not meet global threshold (80%)
ERROR: Coverage for statements (76.99%) does not meet global threshold (80%)
```

## Best Practices

### 1. **Environment-Specific Presets**

- Use **Node preset** for utilities, APIs, and server code
- Use **Browser/React preset** for components and client code
- Set appropriate thresholds per environment

### 2. **Coverage Exclusions**

Exclude files that shouldn't be tested:

```js
coverage: {
  exclude: [
    "src/index.tsx", // Re-export files
    "**/*.stories.*", // Storybook files
    "**/types/**", // Type definitions
  ]
}
```

### 3. **Multiple Formats**

Generate multiple coverage formats for different tools:

- **HTML** for local development
- **LCOV** for CI/CD systems
- **JSON** for custom tooling

### 4. **Threshold Strategy**

- Start with lower thresholds and gradually increase
- Different thresholds for different file types
- Use `reportOnFailure: true` to see coverage on failed tests

## Troubleshooting

### Common Issues

**"Provider 'v8' not found"**

```bash
pnpm add -D @vitest/coverage-v8
```

**Low coverage on index files**
Exclude re-export files:

```js
coverage: {
  exclude: ["src/index.tsx", "src/index.client.tsx"]
}
```

**Thresholds too strict**
Adjust per your project needs:

```js
coverage: {
  thresholds: {
    statements: 70, // Lower threshold
    branches: 60,
    functions: 70,
    lines: 70,
  }
}
```

### Performance Tips

1. **Use `test:run:coverage`** for CI (faster than watch mode)
2. **Exclude unnecessary files** from coverage collection
3. **Use specific reporter formats** for your use case
4. **Run coverage periodically**, not on every test run during development

## Migration from Jest

If migrating from Jest coverage:

1. Remove `jest.config.js` coverage configuration
2. Install `@vitest/coverage-v8` instead of Jest coverage
3. Update scripts to use Vitest coverage commands
4. Configure thresholds in `vitest.config.ts`

The V8 provider is generally faster and more accurate than Jest's Istanbul provider.

## Dependencies

- `@vitest/coverage-v8`: V8-based coverage provider
- `vitest`: Test runner
- `@testing-library/jest-dom`: Jest DOM matchers
- `jsdom`: Browser environment simulation
