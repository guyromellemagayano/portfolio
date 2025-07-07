<!-- markdownlint-disable line-length descriptive-link-text -->
# Br Component

A polymorphic wrapper for the HTML `<br>` (line break) element with analytics integration, void element behavior, and comprehensive event handling. Designed for semantic line breaks in text content, prioritizing proper inline text flow and accessibility standards.

## 📋 Table of Contents

- [Br Component](#br-component)
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
    - [Text Formatting](#text-formatting)
    - [Poetry and Addresses](#poetry-and-addresses)
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

The `Br` component provides a flexible, accessible HTML line break element for inline text formatting. It represents a line break within text content, creating a new line without ending the current paragraph. The component includes analytics integration and comprehensive event handling while maintaining high performance and accessibility standards for text flow control.

### Key Features

- **Semantic Line Breaks**: Utilizes the native `<br>` element for proper inline text break semantics.
- **Void Element Behavior**: Correctly handles self-closing behavior - no children when used as `<br>`.
- **Analytics Integration**: Integrated support for tracking user interactions with line break elements.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components with children support.
- **Validation System**: Runtime validation warnings for invalid prop usage in development.
- **Debugging Support**: Visual outline in high contrast mode for development debugging.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering as an inline element.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards for text flow and inline semantics.

## 🚀 Quick Start

### Installation

To use the `Br` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Br` component and use it in your React application:

```tsx
import { Br } from '@guyromellemagayano/components';

function LineBreakText() {
  return (
    <p>
      First line of text
      <Br />
      Second line of text
    </p>
  );
}
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the component. **Note**: Only rendered when using polymorphic rendering (non-br elements). |
| `className` | `string` | - | Additional CSS classes to apply to the component. |
| `style` | `React.CSSProperties` | - | Inline styles to apply to the component. |
| `as` | `React.ElementType` \| `string` | `"br"` | The HTML element or custom component to render as. Defaults to `"br"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

The `Br` component inherits all standard HTML `<br>` element attributes and does not have additional component-specific props beyond the common ones.

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Br` component for line breaks in text.

```tsx
import { Br } from '@guyromellemagayano/components';

function BasicBrExample() {
  return (
    <p>
      This is the first line.
      <Br />
      This is the second line.
      <Br />
      This is the third line.
    </p>
  );
}
```

### Text Formatting

Shows how to use line breaks for proper text formatting in different contexts.

```tsx
import { Br } from '@guyromellemagayano/components';

function TextFormattingExample() {
  return (
    <div>
      <h2>Contact Information</h2>
      <address>
        John Doe
        <Br />
        123 Main Street
        <Br />
        City, State 12345
        <Br />
        Phone: (555) 123-4567
      </address>
    </div>
  );
}
```

### Poetry and Addresses

Demonstrates proper usage for poetry, addresses, and structured text content.

```tsx
import { Br } from '@guyromellemagayano/components';

function PoetryExample() {
  return (
    <div>
      <blockquote>
        Roses are red,
        <Br />
        Violets are blue,
        <Br />
        Programming is fun,
        <Br />
        And so are you!
      </blockquote>
      
      <address>
        Visit us at:
        <Br />
        123 Tech Street
        <Br />
        Innovation City, IC 90210
      </address>
    </div>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Br` component.

```tsx
import { Br } from '@guyromellemagayano/components';

function StyledBrExample() {
  return (
    <p>
      Line one with custom styling
      <Br 
        className="debug-break"
        style={{ 
          display: 'block',
          height: '20px',
          backgroundColor: 'rgba(255, 0, 0, 0.1)'
        }}
      />
      Line two after the styled break
    </p>
  );
}
```

### With Analytics

Integrates analytics tracking for interactions with line break elements.

```tsx
import { Br } from '@guyromellemagayano/components';

function AnalyticsBrExample() {
  const handleAnalytics = (data) => {
    console.log('Line break interaction recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content);
  };

  return (
    <p>
      Click tracking on line breaks:
      <Br 
        analyticsId="paragraph-break"
        onAnalytics={handleAnalytics}
        style={{ cursor: 'pointer' }}
      />
      Second line with analytics tracking
    </p>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Br` component as a different HTML element or a custom React component.

⚠️ **Warning**: When using the `as` prop with non-br elements, the void element behavior changes and children will be rendered. This may trigger validation warnings in development mode.

```tsx
import { Br } from '@guyromellemagayano/components';

function PolymorphicBrExample() {
  const CustomSeparator = React.forwardRef((props, ref) => (
    <hr {...props} ref={ref} className="custom-line-separator" />
  ));

  return (
    <div>
      <p>Using as HR element:</p>
      <Br as="hr" />
      
      <p>Using as span with content:</p>
      <Br as="span" style={{ display: 'block', textAlign: 'center' }}>
        --- Section Break ---
      </Br>
      
      <p>Using custom component:</p>
      <Br as={CustomSeparator} />
    </div>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `Br` component with client-side rendering and memoization.

```tsx
import { Br } from '@guyromellemagayano/components';

function ClientBrExample() {
  return (
    <p>
      Client-side rendered content:
      <Br 
        isClient 
        isMemoized // Optional: for memoized client component
      />
      Second line with client-side break
    </p>
  );
}
```

## 🔍 Validation System

### Polymorphic Validation

The `Br` component includes a sophisticated validation system to ensure proper usage of br-specific attributes when rendering as different elements.

**Validated Attributes:**

- `clear`: Only valid for `<br>` elements (legacy HTML attribute)

When rendering as a non-br element (using the `as` prop), the component will:

- Display development warnings for invalid attribute usage
- Add `data-polymorphic-element` attribute for debugging
- Continue to function normally in production
- Render children (unlike the void `<br>` element)

### Development Warnings

In development mode, you'll see console warnings when using br-specific props with other elements:

```typescript
// This will trigger a warning in development
<Br as="div" clear="left">
  Invalid clear attribute usage
</Br>

// Console output:
// Warning: <br> specific props (clear) are being used on a <div> element. 
// This may cause unexpected behavior.
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for inline text breaks:

- **Semantic HTML**: Utilizes the native `<br>` element, ensuring proper line break semantics for assistive technologies.
- **Void Element Behavior**: Correctly implements self-closing behavior for semantic line breaks.
- **Screen Reader Support**: Line breaks are properly interpreted by screen readers as text flow breaks.
- **Keyboard Navigation**: When made focusable, supports proper keyboard navigation.
- **Focus Management**: Ensures logical focus order when interactive elements are present.
- **High Contrast**: Provides visual debugging support in high contrast mode.
- **Text Flow**: Maintains proper text flow and reading order for assistive technologies.

### ARIA Attributes

The `<br>` element has implicit semantic meaning as a line break. When using polymorphic rendering, you may need:

- `role="separator"` for visual separators when using non-br elements
- `aria-hidden="true"` for decorative breaks
- Proper semantic markup when the break serves a structural purpose

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.br` : The base class for the `Br` component, defining its fundamental styles.

### Modifiers

Currently, this component uses a single base class. Additional modifiers can be added through the `className` prop for custom variations.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.br {
  /* Base display */
  --br-display: inline;
  
  /* High contrast debugging */
  --br-high-contrast-outline: 1px dashed #007acc;
  --br-high-contrast-outline-offset: 2px;
  
  /* Custom debugging styles */
  --br-debug-background: rgba(255, 0, 0, 0.1);
  --br-debug-height: auto;
}

/* Base styles with CSS variables */
.br {
  display: var(--br-display);
}

/* High contrast mode for debugging */
@media (prefers-contrast: high) {
  .br {
    outline: var(--br-high-contrast-outline);
    outline-offset: var(--br-high-contrast-outline-offset);
  }
}

/* Custom debugging styles (when needed) */
.br.debug {
  background: var(--br-debug-background);
  height: var(--br-debug-height);
  display: block;
}

/* Print styles */
@media print {
  .br {
    /* Standard line break behavior in print */
    display: inline;
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
- **Void Element Behavior**: Tests that children are not rendered for `<br>` elements.
- **Polymorphic Rendering**: Validates children rendering for non-br elements.
- **Analytics**: Validates analytics tracking with graceful failure if the tracking service is unavailable.
- **Validation System**: Tests polymorphic validation warnings and proper development feedback.
- **Event Handling**: Covers click, mouse, and focus event handling.
- **Accessibility**: Ensures proper keyboard navigation and ARIA support.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Br` component:

```bash
# Run all tests for the Br component
pnpm test src/br/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As a void inline element, it has virtually no runtime performance impact.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedBrClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.
- **Void Element Optimization**: No children processing for `<br>` elements improves rendering speed.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing seamless text flow.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, ensuring proper line break interpretation.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```tsx
import { Br, type BrProps, type BrRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const brRef = useRef<BrRef>(null);
  
  return (
    <p>
      First line of text
      <Br ref={brRef} />
      Second line with typed ref
    </p>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Br` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Br } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.br`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.
5. **Void Element Behavior**: Ensure no children are used with `<br>` elements (children only work with polymorphic rendering).
6. **Validation**: Be aware of new development warnings for invalid prop usage.

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- Analytics integration follows new pattern with comprehensive event data
- Validation system added for polymorphic usage
- Void element behavior enforced for `<br>` elements
- Children only rendered for polymorphic (non-br) usage

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Br` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance for inline text flow and line break semantics.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.
6. **Test Void Element Behavior**: Verify proper handling of children for br vs non-br elements.

## 🔗 Related Components

- [P](../p/README.md)
- [Span](../span/README.md)
