<!-- markdownlint-disable proper-names -->

# Guy Romelle Magayano | Portfolio

Full stack developer, open-source enthusiast, and a minimalist

[![commit-check Enabled](https://img.shields.io/badge/commit--check-enabled-brightgreen?logo=Git&logoColor=white)](https://github.com/commit-check/commit-check)
[![Husky Enabled](https://camo.githubusercontent.com/66c98f2bc36eeb23f21ef9af183727ac272ecf0370c61969808151cffdda640f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d656e61626c65642d6875736b793f7374796c653d666c6174266c6f676f436f6c6f723d677265656e266c6162656c3d2546302539462539302542364875736b79266c696e6b3d687474707325334125324625324674797069636f64652e6769746875622e696f2532466875736b79253246)](https://typicode.github.io/husky)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build

# Run tests across all packages
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## 📦 Packages Structure

- **Apps**:
  - `admin` - Admin dashboard (Vite + React Router)
  - `api` - Express.js API server
  - `web` - Marketing website (Next.js)

- **Packages**:
  - `components` - Shared React components
  - `ui` - Base UI components
  - `logger` - Logging utilities
  - `vitest-presets` - Shared Vitest configurations with V8 coverage
  - Config packages: `config-eslint`, `config-typescript`

## 🧪 Testing & Coverage

### Available Test Commands

**Workspace-level commands** (run from root):

```bash
# Basic testing
pnpm test                   # Run tests across all packages
pnpm test:run               # Run tests once (CI mode)
pnpm test:ui                # Run tests with UI interface

# Coverage testing
pnpm test:coverage          # Run tests with coverage
pnpm test:coverage:ui       # Run coverage with UI interface
pnpm test:run:coverage      # Run coverage once (CI mode)

# Filtered testing
pnpm test:packages          # Test only packages/*
pnpm test:apps              # Test only apps/*
pnpm test:coverage:packages # Coverage for packages/*
pnpm test:coverage:apps     # Coverage for apps/*

# Watch mode
pnpm test:watch             # Run tests in parallel watch mode
```

**Package-level commands** (run in any package):

```bash
# Interactive testing
pnpm test                   # Watch mode
pnpm test:ui               # UI mode

# One-time testing
pnpm test:run              # Run once
pnpm test:run:coverage     # Run once with coverage

# Coverage testing
pnpm test:coverage         # Watch with coverage
pnpm test:coverage:ui      # UI with coverage
```

### Coverage Features

- **V8 Provider**: Fast, accurate coverage with `@vitest/coverage-v8`
- **Multiple Formats**: Text, JSON, HTML, LCOV, Clover
- **Smart Thresholds**: Different per environment (Node: 85%, React: 80%)
- **CI Integration**: LCOV format for external coverage tools
- **HTML Reports**: Interactive coverage reports in `coverage/` directories

### Testing Technologies

- **Vitest**: Modern test runner with native TypeScript support
- **V8 Coverage**: Fast, accurate coverage collection
- **Jest DOM**: DOM testing utilities (@testing-library/jest-dom)
- **Testing Library**: React component testing
- **JSDOM**: Browser environment simulation

## 🛠 Development

### Scripts

```bash
# Development
pnpm dev                    # Start all apps in development
pnpm build                  # Build all packages
pnpm clean                  # Clean all build artifacts

# Code Quality
pnpm lint                   # Lint all packages
pnpm lint:fix              # Fix linting issues
pnpm format                # Format code
pnpm format:check          # Check formatting
pnpm check-types           # TypeScript type checking

# Git & Commits
pnpm commit                # Interactive commit with conventional commits
```

### Package Manager

This project uses **pnpm** with workspace support:

- Shared dependencies via catalog
- Efficient disk usage
- Fast installs
- Proper hoisting

### Turborepo

Optimized monorepo builds with:

- Smart caching
- Parallel execution
- Dependency graph awareness
- Remote caching support

## 📊 Coverage Reports

### Current Status

- **Logger**: 100% coverage ✅
- **Components**: 94% coverage with 25 comprehensive tests ✅
- **UI**: Basic component tests ✅
- **Vitest Presets**: Validated shared configurations ✅

### Coverage Thresholds

**Node.js packages** (logger, api):

- Statements: 85%
- Branches: 80%
- Functions: 85%
- Lines: 85%

**React packages** (components, ui):

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### HTML Coverage Reports

After running coverage, view interactive reports:

```bash
# Generate coverage
pnpm test:coverage:packages

# View reports
open packages/components/coverage/index.html
open packages/logger/coverage/index.html
```

## 🔧 Configuration

### Vitest Configuration

Shared presets in `packages/vitest-presets/`:

- **Browser Preset**: JSDOM environment for DOM testing
- **Node Preset**: Node.js environment for server testing
- **React Preset**: Full React Testing Library setup with Jest DOM matchers
- **Shared Setup**: Browser API mocks and common utilities

### Turbo Configuration

Optimized task configuration in `turbo.json`:

- Test caching for `test:run` commands
- Coverage output caching
- Parallel execution where possible
- Proper dependency tracking

## 📝 Contributing

1. Install dependencies: `pnpm install`
2. Create feature branch: `git checkout -b feature/my-feature`
3. Make changes with tests: `pnpm test:coverage`
4. Ensure quality: `pnpm lint && pnpm check-types`
5. Commit changes: `pnpm commit`
6. Push and create PR

### Testing Guidelines

1. **Write tests** for new components and utilities
2. **Maintain coverage** above thresholds (Node: 85%, React: 80%)
3. **Use appropriate preset**: Node for utilities, React for components
4. **Run coverage** before submitting PRs: `pnpm test:coverage`
5. **Leverage shared presets** from `@portfolio/vitest-presets`

## 🚀 Deployment

Each app has its own deployment configuration:

- **Admin**: Static build
- **API**: Server deployment
- **Web**: Next.js deployment

## 📚 Learn More

- [Vitest Documentation](https://vitest.dev/)
- [Turborepo Documentation](https://turbo.build/repo)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [V8 Coverage](https://v8.dev/blog/javascript-code-coverage)
