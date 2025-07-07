<!-- markdownlint-disable line-length descriptive-link-text -->
# Bdo Component

A polymorphic wrapper for the HTML `<bdo>` (Bidirectional Override) element with analytics integration, directional text override, and comprehensive event handling. Designed for forcing text direction override in mixed-language content, prioritizing proper bidirectional text rendering and accessibility standards.

## 📋 Table of Contents

- [Bdo Component](#bdo-component)
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
    - [Direction Override](#direction-override)
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

The `Bdo` component provides a flexible, accessible HTML bidirectional override element. It forces text direction override, making text display in the specified direction regardless of the text's natural directionality. This is useful for handling mixed-language content or forcing specific display order. It includes analytics integration and comprehensive event handling while maintaining high performance and accessibility standards.

### Key Features

- **Bidirectional Override**: Forces text direction override with `unicode-bidi: bidi-override`.
- **Required Direction**: Enforces semantic meaning by requiring the `dir` prop (LTR or RTL).
- **Analytics Integration**: Integrated support for tracking user interactions with content and direction data.
- **Emphasized Styling**: Optional emphasized text appearance with direction-specific visual indicators.
- **Direction-Specific Classes**: Automatic CSS classes based on text direction (`.bdo--ltr`, `.bdo--rtl`).
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards for internationalization.

## 🚀 Quick Start

### Installation

To use the `Bdo` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Bdo` component and use it in your React application:

```typescript
import { Bdo } from '@guyromellemagayano/components';

function ForcedDirection() {
  return (
    <p>
      This text will be forced RTL: <Bdo dir="rtl">Hello World</Bdo>
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
| `as` | `React.ElementType` \| `string` | `"bdo"` | The HTML element or custom component to render as. Defaults to `"bdo"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; dir: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Bdo` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dir` | `"ltr" \| "rtl"` | **Required** | Text direction override - required for semantic meaning. |
| `emphasized` | `boolean` | `false` | If `true`, applies emphasized styling with direction-specific visual indicators. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Bdo` component for text direction override.

```typescript
import { Bdo } from '@guyromellemagayano/components';

function BasicBdoExample() {
  return (
    <p>
      Normal text <Bdo dir="rtl">Forced RTL text</Bdo> more normal text.
    </p>
  );
}
```

### Direction Override

Shows explicit text direction override for different scenarios.

```typescript
import { Bdo } from '@guyromellemagayano/components';

function DirectionBdoExample() {
  return (
    <div>
      <p>Force LTR: <Bdo dir="ltr">مرحبا بالعالم</Bdo></p>
      <p>Force RTL: <Bdo dir="rtl">Hello World</Bdo></p>
      <p>Mixed content: <Bdo dir="ltr">123 ABC مرحبا</Bdo></p>
    </div>
  );
}
```

### Emphasized Text

Applies emphasized styling with direction-specific visual indicators.

```typescript
import { Bdo } from '@guyromellemagayano/components';

function EmphasizedBdoExample() {
  return (
    <div>
      <p>LTR Emphasized: <Bdo dir="ltr" emphasized>Important LTR</Bdo></p>
      <p>RTL Emphasized: <Bdo dir="rtl" emphasized>Important RTL</Bdo></p>
    </div>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Bdo` component.

```typescript
import { Bdo } from '@guyromellemagayano/components';

function StyledBdoExample() {
  return (
    <p>
      <Bdo 
        dir="rtl"
        className="text-blue-600 font-bold"
        style={{ 
          backgroundColor: 'lightblue',
          padding: '2px 4px',
          borderRadius: '2px'
        }}
      >
        Styled Override Text
      </Bdo>
    </p>
  );
}
```

### With Analytics

Integrates analytics tracking for interactions with direction override content.

```typescript
import { Bdo } from '@guyromellemagayano/components';

function AnalyticsBdoExample() {
  const handleAnalytics = (data) => {
    console.log('Analytics event recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content, data.dir);
  };

  return (
    <p>
      Tracked override: <Bdo 
        dir="ltr"
        analyticsId="direction-override"
        onAnalytics={handleAnalytics}
      >
        Analytics Tracked Text
      </Bdo>
    </p>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Bdo` component as a different HTML element or a custom React component.

```typescript
import { Bdo } from '@guyromellemagayano/components';

function PolymorphicBdoExample() {
  const CustomDiv = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} className="custom-bdo-override" />
  ));

  return (
    <p>
      Custom element: <Bdo as={CustomDiv} dir="rtl">
        Custom Direction Override
      </Bdo>
    </p>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `Bdo` component with client-side rendering and memoization.

```typescript
import { Bdo } from '@guyromellemagayano/components';

function ClientBdoExample() {
  return (
    <p>
      Dynamic override: <Bdo 
        dir="ltr"
        isClient 
        isMemoized // Optional: for memoized client component
      >
        Client-side Direction Override
      </Bdo>
    </p>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for internationalization:

- **Semantic HTML**: Utilizes the native `<bdo>` element, ensuring proper bidirectional text override for assistive technologies.
- **Required Direction**: Enforces the `dir` attribute requirement for semantic meaning and proper screen reader interpretation.
- **Direction Override**: Provides explicit text direction control with `unicode-bidi: bidi-override` for forced text flow.
- **Screen Reader Support**: Ensures screen readers correctly interpret the forced directionality of override text.
- **Keyboard Navigation**: Content within the `Bdo` component (if interactive) is fully navigable via keyboard.
- **Focus Management**: Ensures logical focus order and visible focus indicators when interactive.
- **High Contrast**: Designed to be usable in high contrast mode preferences with enhanced visual indicators.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences to disable animations.

### ARIA Attributes

The `<bdo>` element provides semantic bidirectional text override. ARIA attributes are generally not explicitly needed for the element itself, as its semantic purpose and required `dir` attribute are well-defined by the HTML specification. However, if the `as` prop changes the element type, appropriate ARIA attributes might be required for the new semantic role.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.bdo` : The base class for the `Bdo` component, defining its fundamental styles.

### Modifiers

- `.bdo--emphasized`: Applied when the `emphasized` prop is `true`.
- `.bdo--ltr`: Applied when `dir="ltr"` for left-to-right override.
- `.bdo--rtl`: Applied when `dir="rtl"` for right-to-left override.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.bdo {
  /* Base styles */
  --bdo-display: inline;
  --bdo-color: inherit;
  --bdo-hover-color: inherit;
  --bdo-hover-bg: transparent;
  --bdo-focus-color: currentColor;
  --bdo-active-transform: none;
  
  /* Direction-specific */
  --bdo-ltr-text-align: left;
  --bdo-rtl-text-align: right;
  --bdo-context-override-ltr-text-align: left;
  --bdo-context-override-rtl-text-align: right;
  
  /* Emphasized variant */
  --bdo-emphasized-color: inherit;
  --bdo-emphasized-font-weight: 600;
  --bdo-emphasized-bg: transparent;
  --bdo-emphasized-border: none;
  
  /* Emphasized direction indicators */
  --bdo-emphasized-ltr-border: 2px solid currentColor;
  --bdo-emphasized-ltr-padding: 4px;
  --bdo-emphasized-rtl-border: 2px solid currentColor;
  --bdo-emphasized-rtl-padding: 4px;
  
  /* High contrast mode */
  --bdo-high-contrast-font-weight: normal;
  --bdo-high-contrast-emphasized-font-weight: 700;
  --bdo-high-contrast-emphasized-border: 1px solid currentColor;
  --bdo-high-contrast-focus-color: currentColor;
  --bdo-high-contrast-ltr-border-width: 3px;
  --bdo-high-contrast-rtl-border-width: 3px;
  
  /* Dark mode */
  --bdo-dark-color: inherit;
  --bdo-dark-emphasized-color: inherit;
  --bdo-dark-emphasized-bg: transparent;
  
  /* Warning styles */
  --bdo-warning-bg: rgba(255, 165, 0, 0.1);
  --bdo-warning-border: 1px dashed orange;
  --bdo-warning-border-radius: 2px;
}

/* Direction-specific styles */
.bdo--ltr {
  direction: ltr;
  text-align: var(--bdo-ltr-text-align, left);
}

.bdo--rtl {
  direction: rtl;
  text-align: var(--bdo-rtl-text-align, right);
}

/* Enhanced emphasized styles for direction indicators */
.bdo--emphasized.bdo--ltr {
  border-left: var(--bdo-emphasized-ltr-border, 2px solid currentColor);
  padding-left: var(--bdo-emphasized-ltr-padding, 4px);
}

.bdo--emphasized.bdo--rtl {
  border-right: var(--bdo-emphasized-rtl-border, 2px solid currentColor);
  padding-right: var(--bdo-emphasized-rtl-padding, 4px);
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
- **Text Direction Override**: Tests LTR and RTL direction override with proper class application.
- **Required Direction**: Validates that the `dir` prop is always required for semantic meaning.
- **Emphasized Variant**: Validates emphasized styling and direction-specific visual indicators.
- **Analytics**: Validates analytics tracking including content and direction data, with graceful failure if the tracking service is unavailable.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components.
- **Direction-Specific Classes**: Tests automatic class application based on direction.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Bdo` component:

```bash
# Run all tests for the Bdo component
pnpm test src/bdo/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As an inline text element, it has negligible runtime performance impact.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedBdoClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing seamless bidirectional text override.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, ensuring correct text direction override interpretation.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```typescript
import { Bdo, type BdoProps, type BdoRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const bdoRef = useRef<BdoRef>(null);
  
  return (
    <p>
      Override text: <Bdo ref={bdoRef} dir="rtl" emphasized>
        Forced RTL Text
      </Bdo>
    </p>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Bdo` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Bdo } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Required Direction**: Ensure the `dir` prop is always provided as it's required for semantic meaning.
4. **Styling**: Adjust your CSS class names to conform to the BEM format (`.bdo`, `.bdo--modifier`).
5. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.
6. **Direction Classes**: Update CSS to use new direction-specific classes (`.bdo--ltr`, `.bdo--rtl`).

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- `dir` prop is now required (no default value)
- Analytics integration follows new pattern with content and direction data
- Direction-specific classes automatically applied based on `dir` prop
- Emphasized styling includes direction-specific visual indicators

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Bdo` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance for bidirectional text override and internationalization.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.
6. **Test Direction Override**: Verify proper text direction override with various language combinations and forced directions.

## 🔗 Related Components

- [Bdi](../bdi/README.md)
- [Span](../span/README.md)
