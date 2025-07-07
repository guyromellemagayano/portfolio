<!-- markdownlint-disable line-length descriptive-link-text -->
# Button Component

A polymorphic wrapper for the HTML `<button>` element with analytics integration, variant styling, loading states, and comprehensive event handling. Designed for interactive user actions with configurable appearance, behavior, and accessibility standards.

## 📋 Table of Contents

- [Button Component](#button-component)
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
    - [Variants and Sizes](#variants-and-sizes)
    - [Loading and Disabled States](#loading-and-disabled-states)
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

The `Button` component provides a flexible, accessible HTML button element for interactive user actions. It supports multiple visual variants, sizes, loading states, and can be rendered as different elements for versatile usage patterns. The component includes comprehensive analytics integration and event handling while maintaining high performance and accessibility standards.

### Key Features

- **Multiple Variants**: Five distinct visual styles (primary, secondary, outline, ghost, destructive).
- **Flexible Sizing**: Three size options (small, medium, large) with full-width support.
- **Loading States**: Built-in loading spinner with automatic interaction blocking.
- **Disabled States**: Proper disabled styling and interaction prevention.
- **Analytics Integration**: Comprehensive event tracking for user interactions.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **BEM Styling**: Consistent, maintainable CSS class structure.
- **Comprehensive Event Handling**: Robust handling of click, hover, focus, and blur events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards for interactive elements.

## 🚀 Quick Start

### Installation

To use the `Button` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Button` component and use it in your React application:

```typescript
import { Button } from '@guyromellemagayano/components';

function ActionButton() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
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
| `as` | `React.ElementType` \| `string` | `"button"` | The HTML element or custom component to render as. Defaults to `"button"`. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Button` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | The type of button. Only applies when rendered as a `<button>` element. |
| `disabled` | `boolean` | `false` | If `true`, disables the button and prevents user interaction. |
| `loading` | `boolean` | `false` | If `true`, shows loading spinner and disables interaction. |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive"` | `"primary"` | The visual style variant of the button. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the button affecting padding and font size. |
| `fullWidth` | `boolean` | `false` | If `true`, makes the button take the full width of its container. |
| `analyticsEvent` | `string` | - | Custom analytics event name to track when the button is clicked. |
| `analyticsProperties` | `Record<string, unknown>` | - | Additional properties to include with analytics events. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Button` component with different variants.

```typescript
import { Button } from '@guyromellemagayano/components';

function BasicButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
```

### Variants and Sizes

Shows all available variants and sizes for comprehensive styling options.

```typescript
import { Button } from '@guyromellemagayano/components';

function VariantsAndSizesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Size variations */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      
      {/* Full width example */}
      <Button fullWidth variant="primary">
        Full Width Button
      </Button>
      
      {/* Different variants in medium size */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="primary" size="md">Primary</Button>
        <Button variant="secondary" size="md">Secondary</Button>
        <Button variant="outline" size="md">Outline</Button>
        <Button variant="ghost" size="md">Ghost</Button>
        <Button variant="destructive" size="md">Delete</Button>
      </div>
    </div>
  );
}
```

### Loading and Disabled States

Demonstrates loading spinners and disabled button states.

```typescript
import { Button } from '@guyromellemagayano/components';
import { useState } from 'react';

function LoadingDisabledExample() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAsyncAction = async () => {
    setIsLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button loading>Loading State</Button>
      <Button disabled>Disabled State</Button>
      <Button 
        loading={isLoading} 
        onClick={handleAsyncAction}
        variant="primary"
      >
        {isLoading ? 'Processing...' : 'Start Process'}
      </Button>
      <Button disabled variant="destructive">
        Disabled Destructive
      </Button>
    </div>
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Button` component.

```typescript
import { Button } from '@guyromellemagayano/components';

function StyledButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button 
        className="custom-gradient-btn"
        style={{ 
          background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        }}
      >
        Gradient Button
      </Button>
      
      <Button 
        variant="outline"
        className="custom-border"
        style={{ 
          borderColor: '#ff6b6b',
          color: '#ff6b6b',
          borderWidth: '2px'
        }}
      >
        Custom Border
      </Button>
      
      <Button 
        size="lg"
        style={{ 
          borderRadius: '25px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        Rounded Button
      </Button>
    </div>
  );
}
```

### With Analytics

Integrates comprehensive analytics tracking for button interactions.

```typescript
import { Button } from '@guyromellemagayano/components';

function AnalyticsButtonExample() {
  const handleCustomAnalytics = () => {
    console.log('Custom analytics logic executed');
    // Example: send to your analytics platform
    // trackEvent('button_click', { component: 'custom_button' });
  };

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button 
        analyticsEvent="cta_clicked"
        analyticsProperties={{ 
          section: 'hero',
          campaign: 'summer_sale',
          value: 100 
        }}
        variant="primary"
      >
        Track CTA Click
      </Button>
      
      <Button 
        analyticsEvent="signup_started"
        analyticsProperties={{ source: 'header' }}
        onClick={handleCustomAnalytics}
        variant="secondary"
      >
        Sign Up (Tracked)
      </Button>
      
      <Button 
        analyticsEvent="download_initiated"
        analyticsProperties={{ 
          file_type: 'pdf',
          file_name: 'product_guide.pdf' 
        }}
        variant="outline"
      >
        Download Guide
      </Button>
    </div>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Button` component as different HTML elements or custom React components.

```typescript
import { Button } from '@guyromellemagayano/components';

function PolymorphicButtonExample() {
  const CustomLinkButton = React.forwardRef((props, ref) => (
    <a {...props} ref={ref} className="custom-link-button" />
  ));

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {/* Render as anchor link */}
      <Button 
        as="a" 
        href="https://example.com" 
        target="_blank"
        variant="primary"
      >
        External Link
      </Button>
      
      {/* Render as div for non-interactive styling */}
      <Button 
        as="div" 
        variant="secondary"
        style={{ cursor: 'default' }}
      >
        Styled Div
      </Button>
      
      {/* Render with custom component */}
      <Button 
        as={CustomLinkButton}
        href="/internal-page"
        variant="outline"
      >
        Custom Link Component
      </Button>
      
      {/* Form submit button */}
      <Button 
        type="submit"
        variant="primary"
        size="lg"
      >
        Submit Form
      </Button>
    </div>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `Button` component with client-side rendering and memoization.

```typescript
import { Button } from '@guyromellemagayano/components';

function ClientButtonExample() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button 
        variant="primary"
        analyticsEvent="client_interaction"
        loading={false}
      >
        Standard Button
      </Button>
      
      <Button 
        variant="secondary"
        size="lg"
        fullWidth
      >
        Client-Optimized Button
      </Button>
    </div>
  );
}
```

## 🔍 Validation System

### Polymorphic Validation

The `Button` component includes validation to ensure proper usage when rendering as different elements.

When rendering as a non-button element (using the `as` prop), the component will:

- Add `data-polymorphic-element` attribute for debugging
- Remove button-specific attributes like `type` when not applicable
- Continue to function normally in production
- Maintain all styling and interaction capabilities

### Development Warnings

In development mode, the component provides helpful debugging information:

```typescript
// Development logging shows component details
<Button as="a" href="/link">
  Link Button
</Button>

// Console output:
// Button Component: a
// Button props: { as: "a", href: "/link", ... }
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for interactive elements:

- **Semantic HTML**: Utilizes the native `<button>` element by default, ensuring proper button semantics for assistive technologies.
- **Keyboard Navigation**: Fully navigable via keyboard with proper focus management.
- **Focus Management**: Clear focus indicators and logical tab order.
- **Screen Reader Support**: Proper labeling and state communication to screen readers.
- **Disabled State Handling**: Prevents interaction and communicates disabled state to assistive technologies.
- **Loading State Communication**: Loading states are properly communicated to screen readers.
- **Color Contrast**: All variants meet WCAG AA color contrast requirements.
- **Touch Targets**: Adequate touch target size for mobile accessibility.

### ARIA Attributes

The `<button>` element has implicit semantic meaning. Additional ARIA attributes can be added as needed:

- `aria-label` for buttons with icon-only content
- `aria-describedby` for additional context
- `aria-pressed` for toggle buttons
- `aria-expanded` for buttons that control collapsible content
- `aria-disabled="true"` is automatically handled by the `disabled` prop

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.button` : The base class for the `Button` component, defining its fundamental styles.
- `.button__content` : Wrapper for button content.
- `.button__loading-spinner` : Loading spinner element.

### Modifiers

- `.button--primary` : Primary variant styling (default).
- `.button--secondary` : Secondary variant styling.
- `.button--outline` : Outline variant styling.
- `.button--ghost` : Ghost (transparent) variant styling.
- `.button--destructive` : Destructive action variant styling.
- `.button--sm` : Small size styling.
- `.button--md` : Medium size styling (default).
- `.button--lg` : Large size styling.
- `.button--disabled` : Disabled state styling.
- `.button--loading` : Loading state styling.
- `.button--full-width` : Full width styling.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.button {
  /* Base styling */
  --button-bg: #0070f3;
  --button-color: #fff;
  --button-border-radius: 4px;
  --button-font-weight: 500;
  --button-transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  
  /* Size variations */
  --button-sm-font-size: 0.875rem;
  --button-sm-padding: 0.25em 0.75em;
  --button-md-font-size: 1rem;
  --button-md-padding: 0.5em 1.25em;
  --button-lg-font-size: 1.125rem;
  --button-lg-padding: 0.75em 1.75em;
  
  /* Variant colors */
  --button-primary-bg: #0070f3;
  --button-primary-color: #fff;
  --button-secondary-bg: #eaeaea;
  --button-secondary-color: #222;
  --button-outline-bg: transparent;
  --button-outline-color: #0070f3;
  --button-outline-border: 1.5px solid #0070f3;
  --button-ghost-bg: transparent;
  --button-ghost-color: #0070f3;
  --button-destructive-bg: #e00;
  --button-destructive-color: #fff;
  
  /* State styling */
  --button-disabled-opacity: 0.6;
  --button-loading-spinner-border: 2px solid #fff;
  --button-loading-spinner-border-top: 2px solid #0070f3;
}

/* Base styles with CSS variables */
.button {
  background: var(--button-bg);
  color: var(--button-color);
  border-radius: var(--button-border-radius);
  font-weight: var(--button-font-weight);
  transition: var(--button-transition);
}

/* Variant implementations */
.button--primary {
  background: var(--button-primary-bg);
  color: var(--button-primary-color);
}

.button--secondary {
  background: var(--button-secondary-bg);
  color: var(--button-secondary-color);
}

.button--outline {
  background: var(--button-outline-bg);
  color: var(--button-outline-color);
  border: var(--button-outline-border);
}

.button--ghost {
  background: var(--button-ghost-bg);
  color: var(--button-ghost-color);
}

.button--destructive {
  background: var(--button-destructive-bg);
  color: var(--button-destructive-color);
}

/* Size implementations */
.button--sm {
  font-size: var(--button-sm-font-size);
  padding: var(--button-sm-padding);
}

.button--md {
  font-size: var(--button-md-font-size);
  padding: var(--button-md-padding);
}

.button--lg {
  font-size: var(--button-lg-font-size);
  padding: var(--button-lg-padding);
}

/* State implementations */
.button--disabled,
.button:disabled {
  opacity: var(--button-disabled-opacity);
  cursor: not-allowed;
  pointer-events: none;
}

.button__loading-spinner {
  border: var(--button-loading-spinner-border);
  border-top: var(--button-loading-spinner-border-top);
  animation: button-spin 0.8s linear infinite;
}

@keyframes button-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests, covering basic rendering, props, and interactions.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Rendering**: Verifies basic rendering, prop application, and correct DOM output.
- **Variants and Sizes**: Tests all visual variants and size combinations.
- **Interactive States**: Validates loading, disabled, and interactive behaviors.
- **Analytics**: Validates analytics tracking with comprehensive event data.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements.
- **Event Handling**: Covers click, hover, focus, and blur event handling.
- **Accessibility**: Ensures proper keyboard navigation, focus management, and ARIA support.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the `Button` component:

```bash
# Run all tests for the Button component
pnpm test src/button/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Re-renders**: Efficient event handler implementation prevents unnecessary re-renders.
- **CSS Variables**: Dynamic styling through CSS custom properties reduces JavaScript overhead.
- **BEM Methodology**: Predictable CSS class structure improves styling performance.
- **Conditional Rendering**: Loading spinners and content are conditionally rendered for optimal DOM structure.
- **Event Handler Optimization**: Analytics and event handlers are optimized for minimal performance impact.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing seamless touch interactions.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, ensuring proper button interaction.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```typescript
import { Button, type ButtonProps, type ButtonRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const buttonRef = useRef<ButtonRef>(null);
  
  const handleClick = () => {
    console.log('Button clicked!');
  };
  
  return (
    <Button 
      ref={buttonRef}
      variant="primary"
      size="lg"
      loading={false}
      disabled={false}
      onClick={handleClick}
      analyticsEvent="custom_click"
      analyticsProperties={{ section: 'header' }}
    >
      Typed Button
    </Button>
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Button` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Button } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.button`, `.button--variant`).
4. **Analytics**: Migrate to the new analytics integration pattern using `analyticsEvent` and `analyticsProperties`.
5. **Variants**: Update variant names to match the new system (primary, secondary, outline, ghost, destructive).
6. **Loading States**: Use the new `loading` prop instead of custom loading implementations.

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- Analytics integration follows new pattern with `analyticsEvent` and `analyticsProperties`
- BEM class structure replaces previous naming conventions
- Loading state implementation changed to use built-in `loading` prop
- Variant names standardized across the design system

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Button` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance for interactive elements and user actions.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.
6. **Test All Variants**: Verify proper functionality across all variants, sizes, and states.

## 🔗 Related Components

- [Link](../link/README.md)
- [A](../a/README.md)
