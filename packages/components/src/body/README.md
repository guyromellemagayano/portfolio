<!-- markdownlint-disable line-length descriptive-link-text -->
# Body Component

A polymorphic wrapper for the HTML `<body>` element with analytics integration, scroll control, background management, and comprehensive event handling. Designed for document body structure with configurable viewport behavior, prioritizing proper semantic structure and accessibility standards.

## 📋 Table of Contents

- [Body Component](#body-component)
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
    - [Scroll Control](#scroll-control)
    - [Background Management](#background-management)
    - [With Custom Styling](#with-custom-styling)
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

The `Body` component provides a flexible, accessible HTML body element for document structure. It represents the content of an HTML document, providing configurable scroll behavior, background management, and viewport control. The component includes analytics integration and comprehensive event handling while maintaining high performance and accessibility standards for document-level content.

### Key Features

- **Document Structure**: Utilizes the native `<body>` element for proper document semantics.
- **Scroll Control**: Configurable scrolling behavior with overflow management.
- **Background Management**: Optional background styling with dark mode support.
- **Viewport Optimization**: Full viewport height with responsive design support.
- **Analytics Integration**: Integrated support for tracking user interactions with document content.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Validation System**: Runtime validation warnings for invalid prop usage in development.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards for document structure.

## 🚀 Quick Start

### Installation

To use the `Body` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Body` component and use it in your React application:

```typescript
import { Body } from '@guyromellemagayano/components';

function DocumentBody() {
  return (
    <Body>
      <main>Document content goes here</main>
    </Body>
  );
}
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the component. |
| `className` | `string` | - | Additional CSS classes to apply to the component. |
| `style` | `React.CSSProperties` | - | Inline styles to apply to the component. |
| `as` | `React.ElementType` \| `string` | `"body"` | The HTML element or custom component to render as. Defaults to `"body"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Body` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scrollable` | `boolean` | `true` | If `true`, enables vertical scrolling. If `false`, sets overflow to hidden. |
| `hasBackground` | `boolean` | `true` | If `true`, applies default background styling with dark mode support. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Body` component for document structure.

```typescript
import { Body } from '@guyromellemagayano/components';

function BasicBodyExample() {
  return (
    <Body>
      <header>Site Header</header>
      <main>Main Content</main>
      <footer>Site Footer</footer>
    </Body>
  );
}
```

### Scroll Control

Shows how to control scrolling behavior for different layout needs.

```typescript
import { Body } from '@guyromellemagayano/components';

function ScrollControlExample() {
  return (
    <div>
      {/* Scrollable body (default) */}
      <Body scrollable>
        <div style={{ height: '200vh' }}>
          This content is taller than viewport and will scroll
        </div>
      </Body>
      
      {/* Non-scrollable body */}
      <Body scrollable={false}>
        <div>
          This content will not scroll, overflow is hidden
        </div>
      </Body>
    </div>
  );
}
```

### Background Management

Demonstrates background styling options with theme support.

```typescript
import { Body } from '@guyromellemagayano/components';

function BackgroundBodyExample() {
  return (
    <div>
      {/* With background (default) */}
      <Body hasBackground>
        Content with default background (light/dark mode aware)
      </Body>
      
      {/* Without background */}
      <Body hasBackground={false}>
        Content without default background styling
      </Body>
    </div>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Body` component.

```typescript
import { Body } from '@guyromellemagayano/components';

function StyledBodyExample() {
  return (
    <Body 
      className="custom-layout gradient-bg"
      style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <main>Custom styled document body</main>
    </Body>
  );
}
```

### With Analytics

Integrates analytics tracking for interactions with document body content.

```typescript
import { Body } from '@guyromellemagayano/components';

function AnalyticsBodyExample() {
  const handleAnalytics = (data) => {
    console.log('Body interaction recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content);
  };

  return (
    <Body 
      analyticsId="main-document-body"
      onAnalytics={handleAnalytics}
      scrollable
      hasBackground
    >
      <main>Analytics-tracked document content</main>
    </Body>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Body` component as a different HTML element or a custom React component.

⚠️ **Warning**: When using the `as` prop with non-body elements, some body-specific behaviors may not apply, and validation warnings will appear in development mode.

```typescript
import { Body } from '@guyromellemagayano/components';

function PolymorphicBodyExample() {
  const CustomContainer = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} className="custom-body-container" />
  ));

  return (
    <div>
      <Body as="main">
        Body rendered as main element
      </Body>
      
      <Body as={CustomContainer} scrollable={false}>
        Body with custom container component
      </Body>
    </div>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `Body` component with client-side rendering and memoization.

```typescript
import { Body } from '@guyromellemagayano/components';

function ClientBodyExample() {
  return (
    <Body 
      isClient 
      isMemoized // Optional: for memoized client component
      scrollable
      hasBackground
    >
      <main>Client-side rendered document body</main>
    </Body>
  );
}
```

## 🔍 Validation System

### Polymorphic Validation

The `Body` component includes a sophisticated validation system to ensure proper usage of body-specific attributes when rendering as different elements.

When rendering as a non-body element (using the `as` prop), the component will:

- Display development warnings for body-specific prop usage patterns
- Add `data-element-validation="warning"` attribute for debugging
- Continue to function normally in production

### Development Warnings

In development mode, you'll see console warnings when using body-specific behaviors with other elements:

```typescript
// This may trigger development warnings for body-specific usage patterns
<Body as="div" scrollable={false}>
  Non-body element with body-specific props
</Body>

// Console output may include warnings about element-specific behaviors
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for document structure:

- **Semantic HTML**: Utilizes the native `<body>` element, ensuring proper document structure for assistive technologies.
- **Viewport Management**: Provides full viewport height and responsive design support.
- **Scroll Behavior**: Configurable scrolling with respect for reduced motion preferences.
- **Screen Reader Support**: Document content is properly identified by screen readers.
- **Keyboard Navigation**: Fully navigable via keyboard for interactive content.
- **Focus Management**: Ensures logical focus order and visible focus indicators.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Dark Mode**: Built-in support for dark mode with proper contrast ratios.

### ARIA Attributes

The `<body>` element has implicit semantic meaning as the document body. Additional ARIA attributes can be added as needed:

- Use standard HTML attributes for document-level properties
- Add `role` attributes when rendering as non-body elements
- Include `aria-label` or `aria-labelledby` for enhanced screen reader support when needed

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.body` : The base class for the `Body` component, defining its fundamental styles.

### Modifiers

- `.body--scrollable`: Applied when the `scrollable` prop is `true` (default).
- `.body--has-background`: Applied when the `hasBackground` prop is `true` (default).

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.body {
  /* Base layout */
  --body-margin: 0;
  --body-padding: 0;
  --body-min-height: 100vh;
  --body-box-sizing: border-box;
  
  /* Typography */
  --body-font-family: inherit;
  --body-line-height: inherit;
  --body-color: inherit;
  
  /* Background */
  --body-background-color: inherit;
  --body-background-image: none;
  
  /* Scrolling */
  --body-overflow-y: auto;
  --body-overflow-x: hidden;
  
  /* Focus states */
  --body-focus-outline: 2px solid #007acc;
  --body-focus-outline-offset: 2px;
}

/* Base styles with CSS variables */
.body {
  margin: var(--body-margin);
  padding: var(--body-padding);
  font-family: var(--body-font-family);
  line-height: var(--body-line-height);
  color: var(--body-color);
  background-color: var(--body-background-color);
  min-height: var(--body-min-height);
  box-sizing: var(--body-box-sizing);
}

/* Scrollable variant */
.body--scrollable {
  overflow-y: var(--body-overflow-y);
  overflow-x: var(--body-overflow-x);
}

/* Background variant */
.body--has-background {
  background-color: #ffffff;
  background-image: var(--body-background-image);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .body--has-background {
    background-color: #1a1a1a;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .body {
    border: 1px solid currentColor;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .body {
    scroll-behavior: auto;
  }
}

/* Focus styles for accessibility */
.body:focus-visible {
  outline: var(--body-focus-outline);
  outline-offset: var(--body-focus-outline-offset);
}

/* Print styles */
@media print {
  .body {
    background: white !important;
    color: black !important;
  }
  
  .body--scrollable {
    overflow: visible !important;
  }
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
- **Scroll Control**: Tests scrollable behavior and overflow management.
- **Background Management**: Validates background styling and theme support.
- **Document Structure**: Ensures proper semantic body element usage.
- **Analytics**: Validates analytics tracking with graceful failure if the tracking service is unavailable.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components.
- **Validation System**: Tests polymorphic validation warnings and proper development feedback.
- **Event Handling**: Covers click, mouse, and focus event handling.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Body` component:

```bash
# Run all tests for the Body component
pnpm test src/body/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As a document-level element, it provides essential structure with minimal runtime impact.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedBodyClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.
- **Optimized Class Building**: Efficient className concatenation prevents unnecessary string operations.
- **Viewport Optimization**: Proper viewport height management for optimal layout performance.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing seamless document structure.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, ensuring proper document interpretation.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```typescript
import { Body, type BodyProps, type BodyRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const bodyRef = useRef<BodyRef>(null);
  
  return (
    <Body 
      ref={bodyRef} 
      scrollable={true}
      hasBackground={true}
    >
      <main>Document content with proper typing</main>
    </Body>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Body` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Body } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.body`, `.body--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.
5. **Scroll Behavior**: Update scroll control to use the new `scrollable` prop pattern.
6. **Background Management**: Migrate to the new `hasBackground` prop for theme-aware styling.

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- Analytics integration follows new pattern with comprehensive event data
- Validation system added for polymorphic usage
- CSS class structure updated to BEM methodology
- Scroll control now uses `scrollable` boolean prop instead of CSS classes
- Background management centralized through `hasBackground` prop

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Body` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance for document structure and viewport management.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.
6. **Test Document Structure**: Verify proper document-level behavior and semantic meaning.

## 🔗 Related Components

- [HTML](../html/README.md)
- [Main](../main/README.md)
