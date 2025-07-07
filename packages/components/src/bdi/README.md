<!-- markdownlint-disable line-length descriptive-link-text -->
# Bdi Component

A polymorphic wrapper for the HTML `<bdi>` (Bidirectional Isolate) element with analytics integration, directional text support, and comprehensive event handling. Designed for isolating text with potentially different directionality, prioritizing proper bidirectional text rendering and accessibility standards.

## 📋 Table of Contents

- [Bdi Component](#bdi-component)
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
    - [Direction Control](#direction-control)
    - [Emphasized Text](#emphasized-text)
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

The `Bdi` component provides a flexible, accessible HTML bidirectional isolate element. It isolates text that might be formatted in a different direction from surrounding text, preventing bidirectional text issues when embedding user-generated content or text with unknown directionality. It includes analytics integration and comprehensive event handling while maintaining high performance and accessibility standards.

### Key Features

- **Bidirectional Isolation**: Prevents text direction conflicts in mixed-language content.
- **Direction Control**: Support for LTR, RTL, and auto-detection of text direction.
- **Analytics Integration**: Integrated support for tracking user interactions with content and direction data.
- **Emphasized Styling**: Optional emphasized text appearance for important content.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards for internationalization.

## 🚀 Quick Start

### Installation

To use the `Bdi` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Bdi` component and use it in your React application:

```tsx
import { Bdi } from '@guyromellemagayano/components';

function UserMessage({ username, message }) {
  return (
    <p>
      User <Bdi>{username}</Bdi>: {message}
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
| `as` | `React.ElementType` \| `string` | `"bdi"` | The HTML element or custom component to render as. Defaults to `"bdi"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; dir?: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Bdi` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dir` | `"ltr" \| "rtl" \| "auto"` | - | Text direction for the isolated content. |
| `emphasized` | `boolean` | `false` | If `true`, applies emphasized styling with increased font weight. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Bdi` component for text isolation.

```tsx
import { Bdi } from '@guyromellemagayano/components';

function BasicBdiExample() {
  return (
    <p>
      Welcome, <Bdi>Username123</Bdi>!
    </p>
  );
}
```

### Direction Control

Shows setting explicit text direction for different types of content.

```tsx
import { Bdi } from '@guyromellemagayano/components';

function DirectionBdiExample() {
  return (
    <div>
      <p>LTR: <Bdi dir="ltr">Hello World</Bdi></p>
      <p>RTL: <Bdi dir="rtl">مرحبا بالعالم</Bdi></p>
      <p>Auto: <Bdi dir="auto">Mixed content</Bdi></p>
    </div>
  );
}
```

### Emphasized Text

Applies emphasized styling to make important content stand out.

```tsx
import { Bdi } from '@guyromellemagayano/components';

function EmphasizedBdiExample() {
  return (
    <p>
      Important: <Bdi emphasized>Critical Information</Bdi>
    </p>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Bdi` component.

```tsx
import { Bdi } from '@guyromellemagayano/components';

function StyledBdiExample() {
  return (
    <p>
      <Bdi 
        className="text-blue-600 font-bold"
        style={{ borderBottom: '1px dotted blue' }}
        dir="auto"
      >
        Styled Isolated Text
      </Bdi>
    </p>
  );
}
```

### With Analytics

Integrates analytics tracking for interactions with isolated text content.

```tsx
import { Bdi } from '@guyromellemagayano/components';

function AnalyticsBdiExample() {
  const handleAnalytics = (data) => {
    console.log('Analytics event recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content, data.dir);
  };

  return (
    <p>
      Tracked content: <Bdi 
        analyticsId="username-interaction"
        onAnalytics={handleAnalytics}
        dir="auto"
      >
        InteractiveUser
      </Bdi>
    </p>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Bdi` component as a different HTML element or a custom React component.

```tsx
import { Bdi } from '@guyromellemagayano/components';

function PolymorphicBdiExample() {
  const CustomSpan = React.forwardRef((props, ref) => (
    <span {...props} ref={ref} className="custom-bdi-isolation" />
  ));

  return (
    <p>
      Custom element: <Bdi as={CustomSpan} dir="auto">
        Text in Custom Span
      </Bdi>
    </p>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `Bdi` component with client-side rendering and memoization.

```tsx
import { Bdi } from '@guyromellemagayano/components';

function ClientBdiExample() {
  return (
    <p>
      Dynamic content: <Bdi 
        dir="auto"
        isClient 
        isMemoized // Optional: for memoized client component
      >
        Client-side Isolated Text
      </Bdi>
    </p>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for internationalization:

- **Semantic HTML**: Utilizes the native `<bdi>` element, ensuring proper bidirectional text isolation for assistive technologies.
- **Text Direction Isolation**: Prevents unintended text direction shifts when embedding user-generated content or text with unknown directionality.
- **Screen Reader Support**: Ensures screen readers correctly interpret the directionality of isolated text, avoiding mispronunciations or confusing layouts.
- **Keyboard Navigation**: Content within the `Bdi` component (if interactive) is fully navigable via keyboard.
- **Focus Management**: Ensures logical focus order and visible focus indicators when interactive.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences to disable animations.

### ARIA Attributes

The `<bdi>` element provides semantic bidirectional text isolation. ARIA attributes are generally not explicitly needed for the element itself, as its semantic purpose is well-defined by the HTML specification. However, if the `as` prop changes the element type, appropriate ARIA attributes might be required for the new semantic role.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.bdi` : The base class for the `Bdi` component, defining its fundamental styles.

### Modifiers

- `.bdi--emphasized`: Applied when the `emphasized` prop is `true`.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.bdi {
  /* Base styles */
  --bdi-display: inline;
  --bdi-color: inherit;
  --bdi-hover-color: inherit;
  --bdi-hover-bg: transparent;
  --bdi-focus-color: currentColor;
  --bdi-active-transform: none;
  
  /* Emphasized variant */
  --bdi-emphasized-color: inherit;
  --bdi-emphasized-font-weight: 600;
  --bdi-emphasized-bg: transparent;
  --bdi-emphasized-border: none;
  
  /* Direction-specific */
  --bdi-ltr-text-align: left;
  --bdi-rtl-text-align: right;
  --bdi-auto-direction: ltr;
  
  /* High contrast mode */
  --bdi-high-contrast-font-weight: normal;
  --bdi-high-contrast-emphasized-font-weight: 700;
  --bdi-high-contrast-emphasized-border: 1px solid currentColor;
  --bdi-high-contrast-focus-color: currentColor;
  
  /* Dark mode */
  --bdi-dark-color: inherit;
  --bdi-dark-emphasized-color: inherit;
  --bdi-dark-emphasized-bg: transparent;
}

/* Direction-specific styles */
.bdi[dir="ltr"] {
  direction: ltr;
  text-align: var(--bdi-ltr-text-align, left);
}

.bdi[dir="rtl"] {
  direction: rtl;
  text-align: var(--bdi-rtl-text-align, right);
}

.bdi[dir="auto"] {
  direction: var(--bdi-auto-direction, ltr);
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
- **Text Direction**: Tests LTR, RTL, and auto-detection with various content types.
- **Emphasized Variant**: Validates emphasized styling and data attribute application.
- **Analytics**: Validates analytics tracking including content and direction data, with graceful failure if the tracking service is unavailable.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components.
- **Mixed Language Content**: Tests proper isolation with multilingual text.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Bdi` component:

```bash
# Run all tests for the Bdi component
pnpm test src/bdi/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As an inline text element, it has negligible runtime performance impact.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedBdiClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing seamless bidirectional text handling.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, ensuring correct text direction interpretation.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```tsx
import { Bdi, type BdiProps, type BdiRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const bdiRef = useRef<BdiRef>(null);
  
  return (
    <p>
      User: <Bdi ref={bdiRef} dir="auto" emphasized>
        UserName
      </Bdi>
    </p>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Bdi` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Bdi } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.bdi`, `.bdi--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.
5. **Direction Support**: Utilize the new `dir` prop for explicit text direction control.

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- Analytics integration follows new pattern with content and direction data
- Emphasized styling uses consistent font-weight approach

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Bdi` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance for bidirectional text and internationalization.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.
6. **Test Direction Handling**: Verify proper text isolation with various language combinations and directions.

## 🔗 Related Components

- [Bdo](../bdo/README.md)
- [Span](../span/README.md)
