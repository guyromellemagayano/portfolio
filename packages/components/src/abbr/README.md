<!-- markdownlint-disable line-length descriptive-link-text -->
# Abbr Component

A polymorphic, accessible wrapper for the HTML `<abbr>` (Abbreviation) element with enhanced analytics tracking and tooltip functionality. This component enhances clarity, ensures high performance, and adheres to strict accessibility standards for textual content.

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
    - [Emphasized with Custom Tooltip](#emphasized-with-custom-tooltip)
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

The `Abbr` component provides a flexible, accessible HTML `<abbr>` element. It is designed for semantically marking up abbreviations and acronyms, allowing authors to provide the full description of the term using the `title` attribute. This component enhances clarity with advanced tooltip functionality, analytics tracking, and performance optimizations.

### Key Features

- **Semantic Markup**: Utilizes the native `<abbr>` HTML element for proper semantic meaning for abbreviations.
- **Enhanced Tooltips**: Customizable tooltip functionality with showTooltip and custom tooltip override options.
- **Analytics Integration**: Built-in analytics tracking with flexible implementation options.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Performance Optimized**: Client-side code splitting and memoization support.
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
| `onAnalytics` | `(data: { event: string; category: string; label: string; abbreviation: string; expanded: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Abbr` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | The full, expanded form of the abbreviation or acronym. This is crucial for accessibility. |
| `showTooltip` | `boolean` | `true` | If `true`, displays the browser's native tooltip on hover with the content from `title` or `tooltip`. |
| `tooltip` | `string` | - | Custom text to display in the tooltip. If provided, this overrides the `title` prop for tooltip display. |
| `emphasized` | `boolean` | `false` | If `true`, applies emphasized styling to the abbreviation with heavier border and distinct color. |

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
        style={{ borderBottom: '2px solid purple' }}
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
    // trackEvent(data.event, data.category, data.label, data.abbreviation, data.expanded);
  };

  return (
    <p>
      Learn about <Abbr 
        title="Search Engine Optimization"
        analyticsId="seo-abbr"
        onAnalytics={handleAnalytics}
      >
        SEO
      </Abbr> best practices.
    </p>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Abbr` component as a different HTML element or a custom React component. **Note**: Rendering `<abbr>` as a generic element will cause semantic meaning to be lost and trigger a development warning.

```tsx
import { Abbr } from '@guyromellemagayano/components';
import React from 'react';

function PolymorphicAbbrExample() {
  const CustomSpan = React.forwardRef((props, ref) => (
    <span {...props} ref={ref} className="custom-abbr-span" />
  ));

  return (
    <p>
      A custom <Abbr as={CustomSpan} title="Central Processing Unit">
        CPU
      </Abbr> component.
    </p>
  );
}
```

### Emphasized with Custom Tooltip

Demonstrates the `emphasized` prop and a custom `tooltip` that overrides the title.

```tsx
import { Abbr } from '@guyromellemagayano/components';

function EmphasizedAbbrExample() {
  return (
    <p>
      Please review the <Abbr 
        title="Service Level Agreement" 
        emphasized 
        tooltip="Our commitment to 99.9% uptime and performance standards"
      >
        SLA
      </Abbr> document.
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
- **`aria-label`**: The component automatically sets an `aria-label` based on the `title` or `tooltip` content, providing an accessible name.
- **Keyboard Navigation**: Content within the `Abbr` component (if interactive) is fully navigable via keyboard.
- **Focus Management**: Ensures logical focus order for any interactive elements contained within.
- **High Contrast**: Designed to be usable in high contrast mode preferences with enhanced borders.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences to disable animations.

### ARIA Attributes

Relevant ARIA attributes are applied to enhance accessibility:

- `aria-label`: Automatically set based on the `title` or `tooltip` content to provide an accessible name.
- **Note**: The native `<abbr>` element with its `title` attribute handles most accessibility concerns inherently. Additional ARIA attributes are only applied when necessary or when using polymorphic rendering.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.abbr` : The base class for the `Abbr` component, defining its fundamental styles including the characteristic dotted underline and help cursor.

### Modifiers

- `.abbr--emphasized`: Applied when the `emphasized` prop is `true`, providing heavier styling with solid borders and distinct colors.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

The component provides extensive CSS variables for customization:

```css
:root {
  /* Base colors */
  --abbr-color: inherit;
  --abbr-border: currentColor;
  --abbr-hover-border: #333;
  --abbr-focus-color: #0066cc;
  
  /* Emphasized colors */
  --abbr-emphasized-color: #0066cc;
  --abbr-emphasized-hover-color: #0052a3;
  --abbr-emphasized-hover-bg: rgba(0, 102, 204, 0.1);
  
  /* Dark mode colors */
  --abbr-dark-border: #ccc;
  --abbr-dark-hover-border: #fff;
  --abbr-dark-emphasized-color: #66b3ff;
  --abbr-dark-emphasized-hover-color: #80c4ff;
  --abbr-dark-emphasized-hover-bg: rgba(102, 179, 255, 0.1);
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
- **Tooltip Behavior**: Tests `showTooltip` and custom `tooltip` override functionality.
- **Emphasized State**: Validates emphasized styling and data attributes.
- **Interactions**: Tests user interactions and event handling including analytics tracking.
- **Accessibility**: Ensures `title` attribute is correctly exposed and `aria-label` is properly set.
- **Analytics**: Validates both `analyticsId` and `onAnalytics` functionality with graceful error handling.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components (with expected warnings for semantic misuse).
- **Edge Cases**: Covers error states, boundary conditions (e.g., missing `title`), and analytics failures.

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
- **Conditional Analytics**: Analytics handlers are only created when analytics props are provided, avoiding unnecessary function creation.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedAbbrClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile with touch-friendly interactions.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.
- **Print Media**: Special print styles show expanded forms in parentheses for better printed documentation.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```tsx
import { Abbr, type AbbrProps, type AbbrRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyAbbreviation: React.FC = () => {
  const abbrRef = useRef<AbbrRef>(null);
  
  const handleAnalytics = (data: Parameters<NonNullable<AbbrProps['onAnalytics']>>[0]) => {
    console.log(`Clicked ${data.abbreviation}: ${data.expanded}`);
  };
  
  return (
    <p>
      The <Abbr 
        ref={abbrRef} 
        title="HyperText Transfer Protocol"
        onAnalytics={handleAnalytics}
        emphasized
      >
        HTTP
      </Abbr> protocol.
    </p>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Abbr` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Abbr } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API, especially ensuring the `title` prop is used.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.abbr`, `.abbr--emphasized`).
4. **Analytics**: Migrate to the new analytics integration pattern with support for both `analyticsId` and `onAnalytics` props.

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

- [Cite](../cite/README.md)
- [Code](../code/README.md)
- [Em](../em/README.md)
