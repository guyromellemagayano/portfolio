<!-- markdownlint-disable line-length proper-names -->
# Address Component

A polymorphic and accessible wrapper for the HTML `<address>` element, designed for semantically marking up contact information and addresses. This component maintains high performance and adheres to strict accessibility standards.

## 📋 Table of Contents

- [Address Component](#address-component)
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

The `Address` component provides a flexible, accessible HTML `<address>` element. It is specifically designed for semantically marking up contact information, authors, or addresses, ensuring that this crucial data is correctly structured and accessible while maintaining high performance.

### Key Features

- **Semantic Markup**: Utilizes the native `<address>` HTML element for proper semantic meaning.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards in mind.

## 🚀 Quick Start

### Installation

To use the `Address` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Address` component and use it in your React application:

```tsx
import { Address } from '@guyromellemagayano/components';

function MyContactInfo() {
  return (
    <Address>
      <p>Jane Doe</p>
      <p><a href="mailto:jane.doe@example.com">jane.doe@example.com</a></p>
      <p>123 Main Street, Anytown, USA</p>
    </Address>
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
| `as` | `React.ElementType` \| `string` | `"address"` | The HTML element or custom component to render as. Defaults to `"address"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

The `Address` component does not have unique, element-specific props beyond the standard HTML attributes it inherits (e.g., `title`, `dir`). Its primary purpose is semantic grouping of content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Text to display in a tooltip when the mouse hovers over the element. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Address` component for contact information.

```tsx
import { Address } from '@guyromellemagayano/components';

function BasicAddressExample() {
  return (
    <Address>
      <p>Written by <a href="mailto:webmaster@example.com">John Doe</a>.</p>
      <p>Visit us at:<br/>
      Example.com<br/>
      123 Example Street<br/>
      Example City, EX 12345</p>
    </Address>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Address` component.

```tsx
import { Address } from '@guyromellemagayano/components';

function StyledAddressExample() {
  return (
    <Address 
      className="text-gray-700 p-4 border rounded"
      style={{ lineHeight: '1.6', fontStyle: 'normal' }}
    >
      <strong>Our Office:</strong><br/>
      456 Innovation Drive<br/>
      Tech Hub, CA 90210
    </Address>
  );
}
```

### With Analytics

Integrates analytics tracking for interactions within the `Address` component.

```tsx
import { Address } from '@guyromellemagayano/components';

function AnalyticsAddressExample() {
  const handleAnalytics = (data) => {
    console.log('Analytics event recorded for Address:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content);
  };

  return (
    <Address 
      analyticsId="contact-info-block"
      onAnalytics={handleAnalytics}
    >
      <p>Contact us at: <a href="tel:+15551234567">+1 (555) 123-4567</a></p>
    </Address>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Address` component as a different HTML element or a custom React component, while still maintaining semantic intent where possible.

```tsx
import { Address } from '@guyromellemagayano/components';

function PolymorphicAddressExample() {
  const CustomDiv = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} className="custom-address-container" />
  ));

  return (
    <Address as={CustomDiv}>
      <p>Rendered as a custom div:</p>
      <p>Support Team<br/>
      support@example.com</p>
    </Address>
  );
}
```

### Client-Side Rendering

Demonstrates usage of the `Address` component with client-side rendering and optional memoization.

```tsx
import { Address } from '@guyromellemagayano/components';

function ClientAddressExample() {
  return (
    <Address 
      isClient 
      isMemoized // Optional: for memoized client component
    >
      <p>Dynamic address loaded client-side.</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </Address>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native `<address>` element, which intrinsically conveys its purpose to assistive technologies.
- **Keyboard Navigation**: Content within the `Address` component (e.g., links, emails) is fully navigable via keyboard.
- **Screen Reader Support**: Provides appropriate context for screen reader users by correctly structuring contact information.
- **Focus Management**: Ensures logical focus order for interactive elements contained within.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences to disable unnecessary animations.

### ARIA Attributes

Relevant ARIA attributes are applied to enhance accessibility where needed:

- `role`: Typically not needed when using the native `<address>` element, but can be applied if `as` prop changes the element type and a specific semantic role is required.
- `aria-label`: Can provide an accessible name for the component if its visible content is not sufficiently descriptive.
- `aria-describedby`: Links to descriptive text elsewhere on the page for additional context, particularly useful for complex contact forms or details.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.address` : The base class for the `Address` component, defining its fundamental styles.

### Modifiers

- `.address--[modifier-name]` : Used for variations in state or appearance (e.g., `.address--footer`, `.address--highlighted`).
- `.address__[element-name]` : Used for elements within the `Address` component (e.g., `.address__email`, `.address__phone`).

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.address {
  --address-color: inherit;
  --address-background: transparent;
  --address-border: none;
  --address-padding: 0;
  --address-font-size: 1rem;
  --address-line-height: 1.5;
  --address-font-style: normal; /* Typically `font-style: normal` for address elements */
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
- **Interactions**: Tests user interactions (clicks, hovers) and event handling.
- **Accessibility**: Ensures ARIA attributes, keyboard navigation, and screen reader compatibility.
- **Analytics**: Validates analytics tracking and custom analytics functions.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Address` component:

```bash
# Run all tests for the Address component
pnpm test src/address/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedAddressClient`) to prevent unnecessary re-renders.
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
import { Address, type AddressProps, type AddressRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const ref = useRef<AddressRef>(null);
  
  return (
    <Address ref={ref}>
      <p>Our Address:</p>
      <p>123 Dev Street</p>
      <p>Codeville, CA 90210</p>
    </Address>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Address` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Address } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.address`, `.address--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.

### Breaking Changes

(List any breaking changes from previous versions here, e.g., `Prop X removed`, `Behavior Y changed`)

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Address` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance in all development efforts.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.

## 🔗 Related Components

- [Contact](../contact/README.md)
- [Footer](../footer/README.md)
- [Section](../section/README.md)
