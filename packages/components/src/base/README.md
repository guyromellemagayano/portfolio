<!-- markdownlint-disable line-length descriptive-link-text -->
# Base Component

A polymorphic wrapper for the HTML `<base>` element with polymorphic
validation, debugging features, and analytics integration.

## 📋 Table of Contents

- [Base Component](#base-component)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [Purpose](#purpose)
    - [Key Features](#key-features)
  - [🚀 Quick Start](#-quick-start)
    - [Installation](#installation)
    - [Basic Usage](#basic-usage)
  - [⚙️ Props](#️-props)
    - [Standard Props](#standard-props)
    - [Component-Specific Props](#component-specific-props)
  - [💡 Examples](#-examples)
    - [Basic Example](#basic-example)
    - [With Target](#with-target)
    - [Emphasized for Debugging](#emphasized-for-debugging)
    - [Debug Mode](#debug-mode)
    - [With Analytics](#with-analytics)
    - [Polymorphic Rendering](#polymorphic-rendering)
    - [Client-Side Rendering](#client-side-rendering)
  - [🔍 Validation System](#-validation-system)
    - [Polymorphic Validation](#polymorphic-validation)
    - [Development Warnings](#development-warnings)
  - [♿ Accessibility](#-accessibility)
    - [Best Practices Followed](#best-practices-followed)
    - [ARIA Attributes](#aria-attributes)
  - [🎨 Styling](#-styling)
    - [BEM Methodology](#bem-methodology)
    - [Base Classes](#base-classes)
    - [Modifiers](#modifiers)
    - [Customization Options](#customization-options)
    - [CSS Variables](#css-variables)
  - [🧪 Testing](#-testing)
    - [Test Files](#test-files)
    - [Test Coverage](#test-coverage)
    - [Running Tests](#running-tests)
  - [⚡ Performance](#-performance)
    - [Optimization Techniques](#optimization-techniques)
  - [🌐 Browser Support](#-browser-support)
  - [📘 TypeScript](#-typescript)
  - [📚 Migration Guide](#-migration-guide)
    - [From Legacy Component](#from-legacy-component)
    - [Breaking Changes](#breaking-changes)
  - [🤝 Contributing](#-contributing)
    - [Contribution Guidelines](#contribution-guidelines)
  - [🔗 Related Components](#-related-components)

## 📖 Overview

### Purpose

The Base component wraps the HTML `<base>` element, which specifies the base
URL and default target for all relative URLs in a document. It includes
advanced polymorphic validation, debugging features, and analytics integration.

### Key Features

- **Document Base URL**: Sets base URL for relative links
- **Default Target**: Configures default target for links and forms
- **Polymorphic Validation**: Runtime warnings for semantic misuse
- **Debug Visualization**: Visual debugging with fixed overlay display
- **Emphasized Styling**: Optional emphasized styling for debugging
- **Analytics Integration**: Track base element interactions
- **Void Element**: Proper void element behavior (no children)
- **Client-side Support**: Optional client-side rendering with memoization

## 🚀 Quick Start

### Installation

```bash
pnpm add @guyromellemagayano/components
```

### Basic Usage

```typescript
import { Base } from '@guyromellemagayano/components';

function App() {
  return (
    <head>
      <Base href="https://example.com/" target="_blank" />
    </head>
  );
}
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `style` | `React.CSSProperties` | - | Inline styles |
| `as` | `React.ElementType` | `"base"` | Element type to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized client component |
| `analyticsId` | `string` | - | Analytics identifier for tracking |
| `onAnalytics` | `function` | - | Custom analytics handler |
| `[key: data-${string}]` | `string` | - | Data attributes for testing |

### Component-Specific Props

These props are unique to the `Base` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | Base URL for all relative URLs in the document |
| `target` | `string` | - | Default target for links and forms |
| `emphasized` | `boolean` | `false` | Enable emphasized styling for debugging |

## 💡 Examples

### Basic Example

```typescript
<Base href="https://example.com/api/" />
```

### With Target

```typescript
<Base 
  href="https://example.com/" 
  target="_blank" 
/>
```

### Emphasized for Debugging

```typescript
<Base 
  href="https://example.com/" 
  emphasized
  style={{ display: 'block' }}
/>
```

### Debug Mode

Enable visual debugging with a fixed overlay that displays href and target:

```typescript
<Base 
  href="https://example.com/" 
  target="_blank"
  data-debug="true"
  style={{ display: 'block' }}
/>
```

### With Analytics

```typescript
<Base 
  href="https://example.com/" 
  analyticsId="main-base"
  onAnalytics={(data) => console.log('Base interaction:', data)}
/>
```

### Polymorphic Rendering

⚠️ **Warning**: Using `as` with non-base elements loses semantic meaning and
triggers validation warnings in development.

```typescript
<Base 
  as="div" 
  href="https://example.com/" 
  className="debug-base"
/>
```

### Client-Side Rendering

Demonstrates usage of `Base` component with client-side rendering and memoization.

```typescript
<Base 
  href="https://dynamic.example.com/"
  target="_self"
  isClient 
  isMemoized // Optional: for memoized client component
/>
```

## 🔍 Validation System

### Polymorphic Validation

The component includes a sophisticated polymorphic validation system that:

- **Runtime Warnings**: Warns in development when `href`/`target` props are
  used with non-base elements
- **Development Data Attributes**: Adds `data-element-validation="warning"`
  for invalid usage
- **Polymorphic Tracking**: Adds `data-polymorphic-element` attribute when
  using `as` prop
- **Semantic Validation**: Uses `ELEMENT_CONFIGS.BASE` to validate prop usage

Example of validation warning:

```typescript
// This will trigger a development warning
<Base as="div" href="/api/" target="_blank">
  ⚠️ Invalid usage - href/target not semantically valid for div elements
</Base>
```

### Development Warnings

The validation system provides helpful warnings during development:

- **Runtime Warnings**: Warns when `href`/`target` props are used with non-base elements
- **Development Data Attributes**: Adds `data-element-validation="warning"` for invalid usage
- **Polymorphic Tracking**: Adds `data-polymorphic-element` attribute when using `as` prop
- **Semantic Validation**: Uses `ELEMENT_CONFIGS.BASE` to validate prop usage

Example of validation warning:

```typescript
// This will trigger a development warning
<Base as="div" href="/api/" target="_blank">
  ⚠️ Invalid usage - href/target not semantically valid for div elements
</Base>
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native `<base>` element, ensuring proper document metadata.
- **Document Structure**: Designed to be placed in the document `<head>` for proper parsing.
- **Void Element**: Correctly implements void element behavior (no children).
- **Link Resolution**: Affects all relative links in the document for consistent navigation.
- **High Contrast**: Designed to be compatible with high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences in debugging styles.

### ARIA Attributes

The `<base>` element is a non-interactive metadata element that provides document-wide URL resolution. ARIA attributes are generally not applicable as it doesn't participate in the accessibility tree for user interaction.

**Important**: As a void element, `<base>` should not contain children and is typically placed in the document `<head>`.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.base` - Base component styles
- `.base--emphasized` - Emphasized variant for debugging

### Modifiers

- `.base--emphasized` - Emphasized variant for debugging

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

```css
:root {
  /* Base display (normally hidden) */
  --base-display: none;
  --base-position: static;
  
  /* Debugging styles */
  --base-debug-border: none;
  --base-debug-bg: transparent;
  --base-focus-color: #0066cc;
  --base-hover-border-color: #666;
  --base-hover-bg: rgba(0, 0, 0, 0.05);
  
  /* Emphasized variant */
  --base-emphasized-border: 2px solid #ff0000;
  --base-emphasized-bg: rgba(255, 0, 0, 0.1);
  
  /* High contrast mode */
  --base-high-contrast-border-width: 3px;
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests, covering basic rendering, props, and interactions.
- `index.client.test.tsx`: (If applicable) Specific tests for the client-side rendition of the component.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Rendering**: Verifies basic rendering, prop application, and correct DOM output.
- **Base Element Attributes**: Tests `href` and `target` attribute setting with various values.
- **Emphasized Variant**: Validates emphasized styling and data attribute application.
- **Analytics**: Validates analytics tracking and custom analytics functions, including graceful failure if the tracking service is unavailable.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components, including validation warnings.
- **Void Element Behavior**: Ensures proper void element semantics (no children).
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Base` component:

```bash
# Run all tests for the Base component
pnpm test src/base/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As a non-visual metadata element, it has negligible runtime performance impact.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedBaseClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.
- **Validation Optimization**: Runtime validation only runs in development mode.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing consistent base URL resolution.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, though direct interaction is minimal.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```typescript
import { Base, type BaseProps, type BaseRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const baseRef = useRef<BaseRef>(null);
  
  return (
    <Base 
      ref={baseRef}
      href="/api/"
      target="_self"
    />
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Base` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Base } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.base`, `.base--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.
5. **Void Element**: Ensure no children are passed to the component as it's a void element.

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- Void element behavior enforced (no children)
- Polymorphic validation system added with development warnings

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Base` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance in all development efforts.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.
6. **Test Validation**: Verify polymorphic validation warnings work correctly in development.

## 🔗 Related Components

- [Head](../head/README.md)
- [Meta](../meta/README.md)
