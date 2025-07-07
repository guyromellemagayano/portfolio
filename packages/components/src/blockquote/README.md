<!-- markdownlint-disable line-length descriptive-link-text -->
# Blockquote Component

A polymorphic wrapper for the HTML `<blockquote>` element with analytics integration, cite attribution support, and comprehensive event handling. Designed for semantic quotations and excerpts, prioritizing proper citation attribution and accessibility standards for quoted content.

## 📋 Table of Contents

- [Blockquote Component](#blockquote-component)
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
    - [With Citation](#with-citation)
    - [Nested Content](#nested-content)
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

The `Blockquote` component provides a flexible, accessible HTML blockquote element for semantic quotations and excerpts. It represents content that is quoted from another source, optionally with a citation whose address may be specified using the `cite` attribute. The component includes analytics integration and comprehensive event handling while maintaining high performance and accessibility standards.

### Key Features

- **Semantic Quotations**: Utilizes the native `<blockquote>` element for proper quotation semantics.
- **Citation Support**: Built-in `cite` attribute support for source attribution and validation.
- **Visual Quote Marks**: Automatic quote mark rendering with CSS pseudo-elements.
- **Analytics Integration**: Integrated support for tracking user interactions with quoted content.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Validation System**: Runtime validation warnings for invalid prop usage in development.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards for semantic quotations.

## 🚀 Quick Start

### Installation

To use the `Blockquote` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Blockquote` component and use it in your React application:

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function QuotedContent() {
  return (
    <Blockquote>
      To be or not to be, that is the question.
    </Blockquote>
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
| `as` | `React.ElementType` \| `string` | `"blockquote"` | The HTML element or custom component to render as. Defaults to `"blockquote"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Blockquote` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cite` | `string` | - | Specifies the URL of the source of the quotation. Only valid for `<blockquote>` elements. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Blockquote` component for semantic quotations.

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function BasicBlockquoteExample() {
  return (
    <Blockquote>
      The only way to do great work is to love what you do.
    </Blockquote>
  );
}
```

### With Citation

Shows how to add a citation source using the `cite` attribute.

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function CitedBlockquoteExample() {
  return (
    <div>
      <Blockquote cite="https://example.com/article">
        Innovation distinguishes between a leader and a follower.
      </Blockquote>
      <footer>
        — Steve Jobs, <cite><a href="https://example.com/article">Stanford Commencement Address</a></cite>
      </footer>
    </div>
  );
}
```

### Nested Content

Demonstrates usage with complex nested HTML content including paragraphs and citations.

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function NestedBlockquoteExample() {
  return (
    <Blockquote cite="https://example.com/philosophy">
      <p>
        The unexamined life is not worth living.
      </p>
      <footer>
        — <cite>Socrates, as quoted by Plato</cite>
      </footer>
    </Blockquote>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Blockquote` component.

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function StyledBlockquoteExample() {
  return (
    <Blockquote 
      className="text-blue-800 border-blue-500 bg-blue-50"
      style={{ 
        borderLeftWidth: '6px',
        padding: '16px 24px',
        borderRadius: '4px'
      }}
    >
      Success is not final, failure is not fatal: it is the courage to continue that counts.
    </Blockquote>
  );
}
```

### With Analytics

Integrates analytics tracking for interactions with quoted content.

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function AnalyticsBlockquoteExample() {
  const handleAnalytics = (data) => {
    console.log('Quote interaction recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content);
  };

  return (
    <Blockquote 
      analyticsId="inspirational-quote"
      onAnalytics={handleAnalytics}
      cite="https://example.com/quotes"
    >
      The future belongs to those who believe in the beauty of their dreams.
    </Blockquote>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Blockquote` component as a different HTML element or a custom React component.

⚠️ **Warning**: When using the `as` prop with non-blockquote elements, the `cite` attribute will trigger validation warnings in development mode since it's only semantically valid for `<blockquote>` elements.

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function PolymorphicBlockquoteExample() {
  const CustomQuoteSection = React.forwardRef((props, ref) => (
    <section {...props} ref={ref} className="custom-quote-section" />
  ));

  return (
    <div>
      <Blockquote as="section">
        Quote rendered as section element
      </Blockquote>
      
      <Blockquote as={CustomQuoteSection}>
        Quote with custom component
      </Blockquote>
    </div>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `Blockquote` component with client-side rendering and memoization.

```typescript
import { Blockquote } from '@guyromellemagayano/components';

function ClientBlockquoteExample() {
  return (
    <Blockquote 
      isClient 
      isMemoized // Optional: for memoized client component
      cite="https://example.com/dynamic-quotes"
    >
      Imagination is more important than knowledge.
    </Blockquote>
  );
}
```

## 🔍 Validation System

### Polymorphic Validation

The `Blockquote` component includes a sophisticated validation system to ensure proper usage of HTML-specific attributes when rendering as different elements.

**Validated Attributes:**

- `cite`: Only valid for `<blockquote>` elements

When rendering as a non-blockquote element (using the `as` prop), the component will:

- Display development warnings for invalid attribute usage
- Add `data-element-validation="warning"` attribute for debugging
- Continue to function normally in production

### Development Warnings

In development mode, you'll see console warnings when using blockquote-specific props with other elements:

```typescript
// This will trigger a warning in development
<Blockquote as="div" cite="https://example.com">
  Invalid cite usage
</Blockquote>

// Console output:
// Warning: Blockquote: The following props are only valid for <blockquote> elements: cite
// You're rendering as <div>. Consider removing these props or using the correct element.
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for quotations:

- **Semantic HTML**: Utilizes the native `<blockquote>` element, ensuring proper quotation semantics for assistive technologies.
- **Citation Attribution**: Supports the `cite` attribute for programmatic source identification.
- **Screen Reader Support**: Content is properly identified as quoted material by screen readers.
- **Keyboard Navigation**: Fully navigable via keyboard when interactive elements are present.
- **Focus Management**: Ensures logical focus order and visible focus indicators.
- **Visual Quote Marks**: Provides visual quote indicators through CSS pseudo-elements.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences.

### ARIA Attributes

The `<blockquote>` element has implicit semantic meaning and typically doesn't require additional ARIA attributes. However, you can enhance accessibility by:

- Adding `aria-label` or `aria-labelledby` for complex quotations
- Using `role="blockquote"` when rendering as non-blockquote elements
- Including proper citation markup with `<cite>` elements

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.blockquote` : The base class for the `Blockquote` component, defining its fundamental styles.

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
.blockquote {
  /* Layout and spacing */
  --blockquote-margin: 1em 40px;
  --blockquote-padding: 0.5em 1em;
  
  /* Visual styling */
  --blockquote-border-left: 4px solid #ddd;
  --blockquote-font-style: italic;
  --blockquote-background-color: #f9f9f9;
  --blockquote-color: #555;
  
  /* Focus states */
  --blockquote-focus-outline: 2px solid #007acc;
  --blockquote-focus-outline-offset: 2px;
  
  /* Quote marks */
  --blockquote-quote-open: open-quote;
  --blockquote-quote-close: close-quote;
}

/* Base styles with CSS variables */
.blockquote {
  margin: var(--blockquote-margin);
  padding: var(--blockquote-padding);
  border-left: var(--blockquote-border-left);
  font-style: var(--blockquote-font-style);
  background-color: var(--blockquote-background-color);
  color: var(--blockquote-color);
}

.blockquote::before {
  content: var(--blockquote-quote-open);
}

.blockquote::after {
  content: var(--blockquote-quote-close);
}

/* Enhanced accessibility support */
.blockquote:focus {
  outline: var(--blockquote-focus-outline);
  outline-offset: var(--blockquote-focus-outline-offset);
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
- **Citation Support**: Tests `cite` attribute application and validation.
- **Semantic Meaning**: Validates proper `<blockquote>` element usage and semantics.
- **Analytics**: Validates analytics tracking with graceful failure if the tracking service is unavailable.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components.
- **Validation System**: Tests polymorphic validation warnings and proper development feedback.
- **Event Handling**: Covers click, mouse, and focus event handling.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Blockquote` component:

```bash
# Run all tests for the Blockquote component
pnpm test src/blockquote/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As a semantic block element, it has low runtime performance impact.
- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedBlockquoteClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.
- **Optimized Class Building**: Efficient className concatenation prevents unnecessary string operations.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing seamless quotation display.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, ensuring proper quotation interpretation.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```typescript
import { Blockquote, type BlockquoteProps, type BlockquoteRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const blockquoteRef = useRef<BlockquoteRef>(null);
  
  return (
    <Blockquote 
      ref={blockquoteRef} 
      cite="https://example.com/source"
    >
      The best time to plant a tree was 20 years ago. The second best time is now.
    </Blockquote>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Blockquote` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Blockquote } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.blockquote`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.
5. **Citation Attributes**: Ensure `cite` attributes are only used with actual `<blockquote>` elements.
6. **Validation**: Be aware of new development warnings for invalid prop usage.

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- Analytics integration follows new pattern with comprehensive event data
- Validation system added for polymorphic usage
- CSS class structure updated to BEM methodology

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Blockquote` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance for semantic quotations and proper citation attribution.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.
6. **Test Citation Features**: Verify proper citation attribute handling and validation system functionality.

## 🔗 Related Components

- [Cite](../cite/README.md)
- [Q](../q/README.md)
