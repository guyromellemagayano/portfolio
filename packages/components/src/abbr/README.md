<!-- markdownlint-disable line-length descriptive-link-text -->
# Abbr Component

A polymorphic, accessible wrapper for the HTML `<abbr>` (Abbreviation) element, designed for semantically marking up abbreviations and acronyms. This component enhances clarity, ensures high performance, and adheres to strict accessibility standards for textual content.

## 📋 Table of Contents

- [Abbr Component](#abbr-component)
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
    - [With Custom Styling](#with-custom-styling)
    - [With Analytics](#with-analytics)
    - [Polymorphic Rendering](#polymorphic-rendering)
    - [Client-Side Rendering](#client-side-rendering)
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

The `Abbr` component provides a flexible, accessible HTML `<abbr>` element. It is designed for semantically marking up abbreviations and acronyms, allowing authors to provide the full description of the term using the `title` attribute. This component enhances clarity, ensures high performance, and adheres to strict accessibility standards for textual content.

### Key Features

- **Semantic Markup**: Utilizes the native `<abbr>` HTML element for proper semantic meaning for abbreviations.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards, particularly for providing full term context.

## 🚀 Quick Start

### Installation

To use the `Abbr` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Abbr` component and use it to define an abbreviation:

```tsx
import { Abbr } from '@guyromellemagayano/components';

function MyDocument() {
  return (
    <p>
      The <Abbr title="HyperText Markup Language">HTML</Abbr> is a markup language.
    </p>
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
| `as` | `React.ElementType` \| `string` | `"abbr"` | The HTML element or custom component to render as. Defaults to `"abbr"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-\${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Abbr` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | **Required**. The full, expanded form of the abbreviation or acronym. This is crucial for accessibility. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Abbr` component with its `title` attribute.

```tsx
import { Abbr } from '@guyromellemagayano/components';

function BasicAbbrExample() {
  return (
    <p>
      The <Abbr title="World Health Organization">WHO</Abbr> sets global health standards.
    </p>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Abbr` component.

```tsx
import { Abbr } from '@guyromellemagayano/components';

function StyledAbbrExample() {
  return (
    <p>
      The <Abbr 
        title="Cascading Style Sheets"
        className="text-purple-600 font-semibold"
        style={{ borderBottom: '1px dotted purple' }}
      >
        CSS
      </Abbr> defines visual styles.
    </p>
  );
}
```

### With Analytics

Integrates analytics tracking for interactions with the `Abbr` component.

```tsx
import { Abbr } from '@guyromellemagayano/components';

function AnalyticsAbbrExample() {
  const handleAnalytics = (data) => {
    console.log('Analytics event recorded for Abbr:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content);
  };

  return (
    <p>
      Learn about <Abbr 
        title="Search Engine Optimization"
        analyticsId="seo-abbr"
        onAnalytics={handleAnalytics}
      >
        SEO
      </Abbr>.
    </p>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Abbr` component as a different HTML element or a custom React component. **Crucial Note**: Rendering `<abbr>` as a generic element like `span` or `div` will cause its semantic meaning for abbreviations (and the `title` attribute's specific role) to be lost, resulting in a development warning from the polymorphic validation system.

```tsx
import { Abbr } from '@guyromellemagayano/components';
import React from 'react';

function PolymorphicAbbrExample() {
  const CustomSpan = React.forwardRef((props, ref) => (
    <span {...props} ref={ref} className="custom-abbr-span" />
  ));

  return (
    <p>
      A custom <Abbr as={CustomSpan} title="Central Processing Unit" style={{ textDecoration: 'underline' }}>
        CPU
      </Abbr> component.
    </p>
  );
}
```

### Client-Side Rendering

Demonstrates usage of the `Abbr` component with client-side rendering and optional memoization for dynamic abbreviations.

```tsx
import { Abbr } from '@guyromellemagayano/components';
import React, { useState, useEffect } from 'react';

function ClientAbbrExample() {
  const [currentAbbr, setCurrentAbbr] = useState("API");
  const [currentTitle, setCurrentTitle] = useState("Application Programming Interface");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentAbbr("DOM");
      setCurrentTitle("Document Object Model");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p>
      Dynamic term: <Abbr isClient isMemoized title={currentTitle}>
        {currentAbbr}
      </Abbr>.
    </p>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native `<abbr>` element, which intrinsically conveys its purpose as an abbreviation or acronym to assistive technologies.
- **`title` Attribute**: The `title` prop is explicitly used to provide the full, expanded form of the abbreviation, which is crucial for screen readers and users who may not be familiar with the abbreviated term.
- **Screen Reader Support**: Screen readers typically announce the expanded `title` when the `<abbr>` element is focused or encountered, greatly improving understanding.
- **Keyboard Navigation**: Content within the `Abbr` component (if interactive) is fully navigable via keyboard.
- **Focus Management**: Ensures logical focus order for any interactive elements contained within.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences to disable unnecessary animations if custom styles introduce them.

### ARIA Attributes

Relevant ARIA attributes are generally **not explicitly needed** for the `<abbr>` element itself, as its semantic purpose and the `title` attribute handle most accessibility concerns. However, if the `as` prop changes the element type, appropriate ARIA attributes might be required for the new semantic role (e.g., `role="text"` if rendered as a `div` but semantically still an abbreviation).

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.abbr` : The base class for the `Abbr` component, defining its fundamental styles (e.g., `border-bottom: 1px dotted;` which is a common default browser style).

### Modifiers

- `.abbr--[modifier-name]` : Used for variations in state or appearance (e.g., `.abbr--highlighted`).
- `.abbr__[element-name]` : Used for elements within the `Abbr` component (less common for inline elements).

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.abbr {
  --abbr-color: inherit;
  --abbr-background: transparent;
  --abbr-border-bottom: 1px dotted currentColor;
  --abbr-font-size: inherit;
  --abbr-line-height: inherit;
  --abbr-text-decoration: none; /* Often reset default underline */
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests, covering basic rendering, props, and interactions.
- `index.client.test.tsx`: (If applicable) Specific tests for the client-side rendition of the component.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Rendering**: Verifies basic rendering, correct prop application (especially `title`), and proper DOM output.
- **Interactions**: Tests user interactions (e.g., hover to reveal `title`) and event handling.
- **Accessibility**: Ensures `title` attribute is correctly exposed to screen readers and semantic usage is maintained.
- **Analytics**: Validates analytics tracking and custom analytics functions.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components (with expected warnings for semantic misuse).
- **Edge Cases**: Covers error states, boundary conditions (e.g., missing `title`), and invalid inputs.

### Running Tests

To execute tests for the `Abbr` component:

```bash
# Run all tests for the Abbr component
pnpm test src/abbr/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As an inline text element, it has negligible runtime performance impact.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedAbbrClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing a seamless experience.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```tsx
import { Abbr, type AbbrProps, type AbbrRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyAbbreviation: React.FC = () => {
  const abbrRef = useRef<AbbrRef>(null);
  
  return (
    <p>
      The <Abbr ref={abbrRef} title="HyperText Transfer Protocol">HTTP</Abbr> protocol.
    </p>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Abbr` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Abbr } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API, especially ensuring the `title` prop is used.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.abbr`, `.abbr--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.

### Breaking Changes

(List any breaking changes from previous versions here, e.g., `Prop X removed`, `Behavior Y changed`)

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Abbr` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases, especially for `title` attribute exposure and polymorphic misuse.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance, focusing on `title` attribute usage and screen reader interpretation.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.

## 🔗 Related Components

- [Acronym](../acronym/README.md)
- [Cite](../cite/README.md)
- [Code](../code/README.md)
