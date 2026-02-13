<!-- markdownlint-disable MD013 MD044 -->
# @portfolio/ui

High-quality React UI components engineered for optimal performance, accessibility, and developer experience. This library adheres to industry best practices, featuring tree-shakeable imports and comprehensive testing.

## 📋 Table of Contents

- [@portfolio/ui](#portfolioui)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [Design Philosophy](#design-philosophy)
    - [Core Principles](#core-principles)
  - [✨ Features](#-features)
    - [Key Highlights](#key-highlights)
  - [🚀 Quick Start](#-quick-start)
    - [Individual Component Imports](#individual-component-imports)
  - [📦 Import Patterns](#-import-patterns)
    - [Only Individual Imports Available](#only-individual-imports-available)
    - [Dynamic Imports for Code Splitting](#dynamic-imports-for-code-splitting)
    - [Re-exports in Your Application](#re-exports-in-your-application)
  - [🎯 Available Components](#-available-components)
    - [CounterButton Component](#counterbutton-component)
    - [Link Component](#link-component)
  - [🔒 Security Features](#-security-features)
    - [Automatic XSS Protection](#automatic-xss-protection)
    - [External Link Security](#external-link-security)
  - [🧪 Testing](#-testing)
    - [Comprehensive Test Suite](#comprehensive-test-suite)
    - [Running Tests](#running-tests)
  - [📚 Migration Guide](#-migration-guide)
    - [From Libraries with Barrel Exports](#from-libraries-with-barrel-exports)
    - [Bundle Size Benefits](#bundle-size-benefits)
  - [🤝 Contributing](#-contributing)
    - [Contribution Guidelines](#contribution-guidelines)

## 📖 Overview

### Design Philosophy

This UI components library prioritizes **performance over convenience** by exclusively using individual component imports. This approach ensures optimal bundle sizes and perfect tree-shaking for production applications.

### Core Principles

- **Accessibility First**: All components are built with WCAG 2.1 AA compliance and comprehensive ARIA support.
- **Performance Optimized**: Leveraging `React.memo`, `useCallback`, and efficient rendering techniques.
- **Security Built-in**: Features like XSS protection and safe `href` validation for secure external links.
- **Tree-shakeable**: Designed for minimal bundle sizes through individual component imports.
- **TypeScript Native**: Full type definitions with JSDoc for enhanced developer experience.
- **Thoroughly Tested**: Each component comes with a comprehensive test suite covering functionality, accessibility, and edge cases.
- **Responsive Design**: Mobile-first approach with touch-friendly interactions.
- **Customizable**: Supports multiple variants, sizes, and CSS custom properties for flexible styling.

## ✨ Features

### Key Highlights

- **Accessibility**: WCAG 2.1 AA compliant with comprehensive ARIA support.
- **Security**: XSS protection, safe `href` validation, and secure external links.
- **Performance**: Optimized with `React.memo`, `useCallback`, and efficient rendering.
- **Bundle Size**: Individual component imports for optimal tree-shaking.
- **Customization**: Multiple variants, sizes, and CSS custom properties.
- **TypeScript**: Comprehensive type definitions with JSDoc.
- **Testing**: Thoroughly tested components with extensive coverage.
- **Responsiveness**: Mobile-first design with touch-friendly interactions.
- **Theming**: Automatic dark mode detection and CSS custom properties.

## 🚀 Quick Start

### Individual Component Imports

This library only supports individual component imports, which is the recommended pattern for optimizing bundle size.

```typescript
// ✅ Tree-shakeable individual imports
import { CounterButton } from "@portfolio/ui/counter-button";
import { Link } from "@portfolio/ui/link";

// ✅ Memoized versions can also be imported
import { MemoizedCounterButton } from "@portfolio/ui/counter-button";

// ✅ Types are available from the same module path
import type { CounterButtonProps } from "@portfolio/ui/counter-button";
```

## 📦 Import Patterns

### Only Individual Imports Available

To maintain optimal bundle size and perfect tree-shaking, this library does not provide a main barrel export. Components must be imported individually.

| Import Method | Bundle Size | Tree Shaking | Status |
|---------------|-------------|--------------|---------|
| **Individual** | ~3.1KB (single component) | ✅ Perfect | ✅ Available |
| **Convenience** | N/A | N/A | ❌ Not Available |

```typescript
// ✅ The only way to import components for optimal bundle size
import { CounterButton } from "@portfolio/ui/counter-button";
import { Link } from "@portfolio/ui/link";

// ❌ This will NOT work - there is no main export
// import { CounterButton, Link } from "@portfolio/ui";
```

### Dynamic Imports for Code Splitting

For advanced code splitting, you can use dynamic imports to lazy load individual components.

```typescript
import { lazy } from "react";

// ✅ Lazy loading individual components for performance
const CounterButton = lazy(() => 
  import("@portfolio/ui/counter-button").then(m => ({ default: m.CounterButton }))
);

const Link = lazy(() => 
  import("@portfolio/ui/link").then(m => ({ default: m.Link }))
);
```

### Re-exports in Your Application

If you prefer a centralized import for your application, you can create your own barrel export within your app's codebase.

```typescript
// src/components/ui/index.ts - Example of creating your own barrel export
export { CounterButton, MemoizedCounterButton } from "@portfolio/ui/counter-button";
export { Link, MemoizedLink } from "@portfolio/ui/link";

// Then import from your custom barrel in your application
import { CounterButton, Link } from "@/components/ui";
```

## 🎯 Available Components

### CounterButton Component

An enhanced counter button with configurable `min`/`max` constraints, `step` increments, and comprehensive accessibility features.

```typescript
import { CounterButton } from "@portfolio/ui/counter-button";

<CounterButton
  label="Vote Count"
  initialValue={0}
  min={0}
  max={100}
  step={1}
  variant="primary"
  size="medium"
  onCountChange={(count) => console.log(count)}
/>
```

### Link Component

A secure link component that automatically detects external links, applies security attributes, and supports analytics tracking.

```typescript
import { Link } from "@portfolio/ui/link";

<Link
  href="https://example.com"
  variant="primary"
  size="medium"
  trackingId="external-link"
  onLinkClick={(href, event) => console.log(href)}
>
  Visit Example
</Link>
```

## 🔒 Security Features

### Automatic XSS Protection

- Validates all `href` attributes to prevent injection attacks.
- Prevents `javascript:` URLs in link `href`s.
- Warns developers about potentially unsafe link destinations in development mode.

### External Link Security

- Automatically adds `rel="noopener noreferrer"` to all external links for security and performance.
- Sets `target="_blank"` for external domains to open in new tabs.
- Provides visual indicators (e.g., an icon) for external links to inform users.

## 🧪 Testing

### Comprehensive Test Suite

This library includes a robust test suite with **52 tests** covering various aspects:

- **Functionality**: Basic behavior, prop handling, and state management.
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader compatibility.
- **Security**: XSS prevention, safe `href` validation, and external link security.
- **Performance**: Memoization effects and efficient event handling.
- **Edge Cases**: Handling of invalid inputs, null values, and boundary conditions.

### Running Tests

To execute the tests for the UI components library:

```bash
pnpm test           # Run all tests
pnpm test:coverage  # Run tests with coverage report
```

## 📚 Migration Guide

### From Libraries with Barrel Exports

If you are migrating from UI libraries that use convenience imports (barrel exports), you will need to adjust your import statements to target individual components directly.

```typescript
// ❌ Old pattern (not supported in this library)
// import { Button, Link } from "other-ui-library";

// ✅ New pattern (required for optimal performance and bundle size)
import { CounterButton } from "@portfolio/ui/counter-button";
import { Link } from "@portfolio/ui/link";
```

### Bundle Size Benefits

By enforcing individual imports, this library achieves significant bundle size reductions:

- **Individual imports (single component)**: Approximately 3.1KB
- **Typical barrel export (all components)**: Often 7.1KB or more
- **Potential Savings**: **56%+ smaller application bundles!**

## 🤝 Contributing

### Contribution Guidelines

When contributing new components or features to this library, please adhere to the following guidelines:

1. **Individual Component Exports Only**: Ensure new components are exported individually (e.g., `export { MyComponent } from './my-component';`). Do not add them to a main `index.ts` barrel export at the root of `packages/ui/src/`.
2. **Comprehensive Tests**: Include a robust test suite for your new component, covering functionality, accessibility, and security.
3. **Document Import Patterns**: Clearly document how your component should be imported and used in its `README.md`.
4. **Verify Tree-shaking**: Confirm that your component is effectively tree-shakable and contributes minimally to bundle size when imported individually.
5. **Follow Existing Standards**: Align with the project's existing coding standards, design philosophy, and documentation conventions (refer to `docs/components/COMPONENT_STANDARDS.md`).
