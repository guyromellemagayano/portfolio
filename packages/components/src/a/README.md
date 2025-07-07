<!-- markdownlint-disable line-length descriptive-link-text -->
# A Component

An accessible anchor component with robust analytics tracking, polymorphic rendering capabilities, and comprehensive event handling. Designed for diverse navigation links, external references, and interactive elements, prioritizing high performance and accessibility standards.

## 📋 Table of Contents

- [A Component](#a-component)
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
    - [Variants Example](#variants-example)
    - [With an Icon](#with-an-icon)
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

The `A` component provides a flexible, accessible HTML anchor element. It supports a range of functionalities including built-in analytics tracking, polymorphic rendering, and comprehensive event handling. It is engineered to maintain high performance and adhere to strict accessibility standards.

### Key Features

- **Analytics Tracking**: Integrated support for tracking user interactions.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards in mind.

## 🚀 Quick Start

### Installation

To use the `A` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `A` component and use it in your React application:

```tsx
import { A } from '@guyromellemagayano/components';

function MyComponent() {
  return (
    <A href="/home">
      Go to Home
    </A>
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
| `as` | `React.ElementType` \| `string` | `"a"` | The HTML element or custom component to render as. Defaults to `"a"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `A` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `"#"` | The URL that the hyperlink points to. |
| `target` | `string` | `"_self"` | Specifies where to open the linked document (e.g., `_blank`, `_self`, `_parent`, `_top`). |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'unstyled'` | `'default'` | The visual variant of the link, affecting its color and decoration. |
| `active` | `boolean` | `false` | If `true`, applies active styling and sets `aria-current="page"`. |
| `disabled` | `boolean` | `false` | If `true`, disables the link, making it non-interactive. |
| `loading` | `boolean` | `false` | If `true`, shows a loading spinner and disables the link. |
| `icon` | `React.ReactNode` | - | An icon element to display within the link. |
| `iconPosition` | `'left' \| 'right'` | `'left'` | The position of the icon relative to the text content. |
| `tooltip` | `string` | - | Text to display in an accessible tooltip on hover. |
| `confirm` | `string` | - | If set, displays a `window.confirm()` dialog with this message before navigating. |
| `prefetch` | `boolean` | `false` | If `true`, enables prefetching for internal links on hover. |
| `download` | `string` \| `boolean` | `false` | Specifies that the target will be downloaded when a user clicks on the hyperlink. |
| `hreflang` | `string` | - | Specifies the language of the linked document. |
| `ping` | `string` | - | A space-separated list of URLs to which, when the hyperlink is followed, `POST` requests will be sent. |
| `rel` | `string` | - | Specifies the relationship of the target object to the link object. Automatically includes `noopener noreferrer` for external links. |
| `referrerpolicy` | `string` | - | How much referrer information to send with the link. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `A` component.

```tsx
import { A } from '@guyromellemagayano/components';

function BasicAExample() {
  return (
    <A href="/about">
      Learn more about us
    </A>
  );
}
```

### Variants Example

Shows the different visual variants of the `A` component.

```tsx
import { A } from '@guyromellemagayano/components';
import React from 'react';

function VariantsAExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <A href="#" variant="default">Default Link</A>
      <A href="#" variant="primary">Primary Link</A>
      <A href="#" variant="secondary">Secondary Link</A>
      <A href="#" variant="unstyled">Unstyled Link</A>
    </div>
  );
}
```

### With an Icon

Demonstrates using the `icon` and `iconPosition` props.

```tsx
import { A } from '@guyromellemagayano/components';
import React from 'react';

// A placeholder SVG icon
const MyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L6.59 1.41 12.17 7H0v2h12.17l-5.58 5.59L8 16l8-8z"/>
  </svg>
);

function IconAExample() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <A href="#" icon={<MyIcon />}>Default Icon</A>
      <A href="#" icon={<MyIcon />} iconPosition="right">Icon Right</A>
      <A href="#" icon={<MyIcon />} loading>Loading with Icon</A>
    </div>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `A` component.

```tsx
import { A } from '@guyromellemagayano/components';

function StyledAExample() {
  return (
    <A 
      href="/services"
      className="text-blue-600 hover:underline"
      style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
    >
      Our Services
    </A>
  );
}
```

### With Analytics

Integrates analytics tracking for clicks on the `A` component.

```tsx
import { A } from '@guyromellemagayano/components';

function AnalyticsAExample() {
  const handleAnalytics = (data) => {
    console.log('Analytics event recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content);
  };

  return (
    <A 
      href="/products"
      analyticsId="product-page-link"
      onAnalytics={handleAnalytics}
    >
      View Products
    </A>
  );
}
```

### Polymorphic Rendering

Shows how to render the `A` component as a different HTML element or a custom React component.

```tsx
import { A } from '@guyromellemagayano/components';

function PolymorphicAExample() {
  const CustomButton = React.forwardRef((props, ref) => (
    <button {...props} ref={ref} className="custom-btn" />
  ));

  return (
    <A as={CustomButton} onClick={() => alert('Button Clicked!')}>
      Clickable Custom Button
    </A>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `A` component with client-side rendering and memoization.

```tsx
import { A } from '@guyromellemagayano/components';

function ClientAExample() {
  return (
    <A 
      href="/dashboard"
      isClient 
      isMemoized // Optional: for memoized client component
    >
      Go to Dashboard (Client-side)
    </A>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native `<a>` element, ensuring inherent accessibility for links.
- **Keyboard Navigation**: Fully navigable via keyboard, supporting focus, activation, and tab order.
- **Screen Reader Support**: Provides appropriate labels and descriptions for screen reader users.
- **Secure by Default**: Automatically adds `rel="noopener noreferrer"` to external links and blocks `javascript:` URLs to prevent XSS.
- **State Management**: Natively handles `active`, `disabled`, and `loading` states with correct ARIA attributes.
- **Focus Management**: Ensures logical focus order and visible focus indicators.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences to disable animations.

### ARIA Attributes

Relevant ARIA attributes are applied to enhance accessibility where needed:

- `role`: Set to an appropriate semantic role if the `as` prop changes the element type (e.g., `role="button"`).
- `aria-label`: Can be used to provide an accessible name. If the `tooltip` prop is used, this will be automatically applied.
- `aria-disabled`: Automatically set to `true` when `disabled` or `loading` props are true.
- `aria-current`: Automatically set to `"page"` when the `active` prop is true.
- `aria-describedby`: Links to descriptive text, automatically used for the `tooltip` feature.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.a` : The base class for the `A` component, defining its fundamental styles.
- `.a__icon`: The wrapper for the icon element.
- `.a__spinner`: The wrapper for the loading spinner.
- `.a__tooltip`: The class for the tooltip element.

### Modifiers

- `.a--[variant]`: Applied for each variant (e.g., `.a--default`, `.a--primary`).
- `.a--active`: Applied when the `active` prop is `true`.
- `.a--disabled`: Applied when `disabled` or `loading` props are `true`.
- `.a--loading`: Applied when the `loading` prop is `true`.
- `.a--with-icon`: Applied when an `icon` is provided.
- `.a--icon-left` / `.a--icon-right`: Applied based on the `iconPosition` prop.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.a {
  --a-color: inherit;
  --a-background: transparent;
  --a-border: 1px solid currentColor;
  --a-border-radius: 0.375rem;
  --a-padding: 0.5rem;
  --a-font-size: 1rem;
  --a-line-height: 1.5;
  --a-transition-duration: 0.2s;
  /* Variant-specific variables can also be defined */
  --a-primary-color: #007bff;
  --a-secondary-color: #6c757d;
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
- **Interactions**: Tests user interactions (clicks, hovers) and event handling, including keyboard (`Enter`/`Space`) activation of the `confirm` dialog.
- **Accessibility**: Ensures ARIA attributes, keyboard navigation, and screen reader compatibility.
- **Analytics**: Validates analytics tracking and custom analytics functions, including graceful failure if the tracking service is unavailable.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `A` component:

```bash
# Run all tests for the A component
pnpm test src/a/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedAClient`) to prevent unnecessary re-renders.
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
import { A, type AProps, type ARef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const ref = useRef<ARef>(null);
  
  return (
    <A ref={ref} href="/contact">
      Contact Us
    </A>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `A` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { A } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.a`, `.a--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.

### Breaking Changes

(List any breaking changes from previous versions here, e.g., `Prop X removed`, `Behavior Y changed`)

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `A` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance in all development efforts.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.

## 🔗 Related Components

- [Button](../button/README.md)
