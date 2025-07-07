<!-- markdownlint-disable line-length -->
# B Component

A polymorphic and accessible wrapper for the HTML `<b>` element with enhanced emphasis options and analytics tracking, designed for
semantically highlighting text with bold visual style without conveying additional importance.
A polymorphic and accessible wrapper for the HTML `<b>` element with enhanced emphasis options and analytics tracking, designed for semantically highlighting text with bold visual style without conveying additional importance.

## 📋 Table of Contents

- [B Component](#b-component)
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
    - [Emphasized Variant](#emphasized-variant)
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
    - [Visual Features](#visual-features)
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

The `B` component provides a flexible, accessible HTML `<b>` element designed to represent text to which attention is drawn without
conveying extra semantic importance. Beyond basic bold styling, it includes an emphasized variant for extra-bold text, analytics
tracking for interactive bold elements, and comprehensive accessibility features.

### Key Features

- **Enhanced Emphasis**: Standard bold styling with optional `emphasized` variant for extra-bold (font-weight: 900) text
- **Analytics Integration**: Built-in analytics tracking for interactive bold text elements with graceful error handling
- **Accessibility Excellence**: Full WCAG 2.1 AA compliance with proper focus management and high contrast support
- **CSS Variables System**: Comprehensive theming support with variables for colors, weights, shadows, and responsive behavior
- **Performance Optimized**: Efficient click handler creation and memoized prop calculation
- **Responsive Design**: Dark mode, high contrast, reduced motion, and print media support

## 🚀 Quick Start

### Installation

To use the `B` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `B` component and use it to apply bold visual styling to text:

```typescript
import { B } from '@guyromellemagayano/components';

// Basic bold text
<p>
  This is some <B>bold text</B> that draws attention.
</p>

// Extra emphasized bold text
<p>
  This is <B emphasized>extra bold text</B> for stronger visual impact.
</p>
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the component. |
| `className` | `string` | - | Additional CSS classes to apply to the component. |
| `style` | `React.CSSProperties` | - | Inline styles to apply to the component. |
| `as` | `React.ElementType` \| `string` | `"b"` | The HTML element or custom component to render as. Defaults to `"b"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `B` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `emphasized` | `boolean` | `false` | Whether the text should be emphasized beyond normal boldness. Applies extra-bold font-weight (900) and text-shadow for stronger visual impact. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `B` component for basic bold text.

```typescript
import { B } from '@guyromellemagayano/components';

function BasicBExample() {
  return (
    <div>
      <p>
        This paragraph contains <B>bold text</B> that draws attention 
        without conveying additional semantic importance.
      </p>
      
      <p>
        Use this for <B>keywords</B>, <B>product names</B>, or other 
        text that should be visually distinct.
      </p>
    </div>
  );
}
```

### Emphasized Variant

Shows the emphasized variant for extra-bold text styling.

```typescript
import { B } from '@guyromellemagayano/components';

function EmphasizedBExample() {
  return (
    <div>
      <p>
        Regular <B>bold text</B> vs <B emphasized>extra bold text</B> 
        for different levels of visual emphasis.
      </p>
      
      <p>
        Use emphasized bold for <B emphasized>critical information</B> 
        that needs maximum visual impact.
      </p>
      
      <h3>Visual Comparison:</h3>
      <ul>
        <li><B>Standard Bold</B> - font-weight: bold</li>
        <li><B emphasized>Emphasized Bold</B> - font-weight: 900 + text-shadow</li>
      </ul>
    </div>
  );
}
```

### With Custom Styling

Applies custom CSS classes and styles to enhance the bold text appearance.

```typescript
import { B } from '@guyromellemagayano/components';

function StyledBExample() {
  return (
    <div>
      <p>
        This text has <B className="text-primary font-semibold">custom styled bold</B> 
        with additional CSS classes.
      </p>
      
      <p>
        You can also use <B 
          style={{ 
            color: '#e74c3c', 
            textDecoration: 'underline',
            fontSize: '1.1em'
          }}
        >
          inline styles
        </B> for specific customization.
      </p>
      
      <p>
        Combine emphasized with custom styling: <B 
          emphasized 
          className="gradient-text"
          style={{ letterSpacing: '0.5px' }}
        >
          Enhanced Bold Text
        </B>
      </p>
    </div>
  );
}
```

### With Analytics

Integrates analytics tracking for interactive bold text elements.

```typescript
import { B } from '@guyromellemagayano/components';

function AnalyticsBExample() {
  const handleBoldAnalytics = (data: {
    event: string;
    category: string;
    label: string;
    content: string;
  }) => {
    console.log('Bold text interaction:', {
      ...data,
      timestamp: new Date().toISOString(),
    });
    
    // Send to analytics platform
    gtag('event', data.event, {
      event_category: data.category,
      event_label: data.label,
      text_content: data.content,
      interaction_type: 'bold_text_click',
    });
  };

  return (
    <div>
      <h3>📊 Analytics-Enabled Bold Text</h3>
      
      <p>
        Click on <B 
          analyticsId="product-name"
          onAnalytics={handleBoldAnalytics}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Premium Widget Pro
        </B> to track product interest.
      </p>
      
      <p>
        Track emphasis interactions: <B 
          emphasized
          analyticsId="call-to-action"
          onAnalytics={handleBoldAnalytics}
          style={{ cursor: 'pointer' }}
        >
          Start Free Trial
        </B>
      </p>
      
      <p>
        Analytics with gtag integration: <B 
          analyticsId="feature-highlight"
          style={{ cursor: 'pointer' }}
        >
          Advanced Analytics
        </B>
      </p>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <strong>Analytics Data Structure:</strong>
        <pre style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
{`{
  event: "click",
  category: "text-emphasis",
  label: "product-name",
  content: "Premium Widget Pro"
}`}
        </pre>
      </div>
    </div>
  );
}
```

### Polymorphic Rendering

Shows rendering as different HTML elements while maintaining functionality.

```typescript
import { B } from '@guyromellemagayano/components';
import React from 'react';

function PolymorphicBExample() {
  const CustomSpan = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
    (props, ref) => (
      <span {...props} ref={ref} className="custom-bold-span" />
    )
  );

  const CustomDiv = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props, ref) => (
      <div {...props} ref={ref} style={{ display: 'inline-block', fontWeight: 'bold' }} />
    )
  );

  return (
    <div>
      <h3>🔄 Polymorphic Rendering Examples</h3>
      
      <p>
        Standard b element: <B>bold text</B>
      </p>
      
      <p>
        Rendered as span: <B as="span">span bold text</B>
      </p>
      
      <p>
        Rendered as strong (semantic): <B as="strong">semantically important</B>
      </p>
      
      <p>
        Custom component: <B as={CustomSpan} emphasized>custom component bold</B>
      </p>
      
      <p>
        Block-level bold: <B as={CustomDiv}>block bold text</B> with custom styling.
      </p>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '8px' }}>
        <strong>Note:</strong> When using polymorphic rendering:
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>All functionality (emphasized, analytics) is preserved</li>
          <li>CSS classes and styling are maintained</li>
          <li>Development warnings appear for semantic validation</li>
          <li>Consider semantic meaning when changing elements</li>
        </ul>
      </div>
    </div>
  );
}
```

### Client-Side Rendering

Demonstrates client-side rendering with dynamic content and memoization.

```typescript
import { B } from '@guyromellemagayano/components';
import React, { useState, useEffect } from 'react';

function ClientBExample() {
  const [emphasis, setEmphasis] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [dynamicText, setDynamicText] = useState('Dynamic Content');

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicText(prev => 
        prev === 'Dynamic Content' 
          ? 'Updated Content' 
          : 'Dynamic Content'
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInteraction = () => {
    setClickCount(prev => prev + 1);
    setEmphasis(prev => !prev);
  };

  return (
    <div>
      <h3>⚡ Client-Side Rendering Demo</h3>
      
      <p>
        Client-rendered bold text: <B 
          isClient 
          isMemoized
          emphasized={emphasis}
          onClick={handleInteraction}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {dynamicText}
        </B>
      </p>
      
      <p>
        Interactive bold with state: <B 
          isClient
          emphasized={clickCount > 5}
          onClick={() => setClickCount(prev => prev + 1)}
          style={{ 
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            background: clickCount > 5 ? '#e7f3ff' : 'transparent',
            borderRadius: '4px'
          }}
        >
          Click Count: {clickCount}
        </B>
      </p>
      
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setEmphasis(!emphasis)}>
          Toggle Emphasis: {emphasis ? 'ON' : 'OFF'}
        </button>
        <button 
          onClick={() => setClickCount(0)}
          style={{ marginLeft: '0.5rem' }}
        >
          Reset Counter
        </button>
      </div>
      
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <strong>Client-Side Features:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Text alternates every 3 seconds</li>
          <li>Emphasis toggles with each click on dynamic text</li>
          <li>Counter becomes emphasized after 5 clicks</li>
          <li>Memoized client component for performance</li>
        </ul>
      </div>
    </div>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native `<b>` element appropriately for text that requires visual boldness without semantic importance.
- **Focus Management**: Enhanced focus indicators with proper outline styles and keyboard navigation support.
- **High Contrast Support**: Specialized styling for high contrast mode with increased font weights and enhanced text shadows.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences by disabling transitions and transforms.
- **Screen Reader Compatibility**: Properly announces bold text without implying additional importance (use `<strong>` for semantic emphasis).
- **Interactive Elements**: When used with analytics, provides proper cursor indication and focus states.

### ARIA Attributes

Relevant ARIA attributes are applied to enhance accessibility:

- **Focus Management**: Automatic focus outline styles with proper contrast ratios.
- **Interactive States**: When analytics are enabled, appropriate cursor and focus styling indicate interactivity.
- **Polymorphic Support**: Maintains accessibility when rendered as different elements.
- **Screen Reader Support**: Text content is properly announced without additional semantic weight.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.b`: The base class with fundamental bold styling and transition effects.

### Modifiers

- `.b--emphasized`: Emphasized variant with extra-bold font-weight (900) and text-shadow for enhanced visual impact.

### Visual Features

The component includes sophisticated visual features:

- **Font Weight Control**: Standard bold (700) vs emphasized (900) font weights
- **Text Shadow Enhancement**: Subtle text shadow for emphasized variant to improve readability
- **Smooth Transitions**: CSS transitions for font-weight, color, and text-shadow changes
- **Focus Indicators**: Prominent focus outlines with proper contrast ratios
- **Hover Effects**: Customizable hover states via CSS variables
- **Responsive Design**: Automatic adaptation for different media conditions

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Variables**: Override the comprehensive set of CSS custom properties.
2. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
3. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
4. **BEM Modifiers**: Use the emphasized modifier and create additional BEM-style modifiers.

### CSS Variables

The component provides extensive styling customization through CSS variables:

```css
/* Base styling variables */
:root {
  /* Standard bold styling */
  --b-color: inherit;
  --b-font-weight: bold;
  --b-hover-color: inherit;
  --b-focus-color: currentColor;
  --b-active-transform: none;
  
  /* Emphasized variant */
  --b-emphasized-color: inherit;
  --b-emphasized-font-weight: 900;
  --b-emphasized-text-shadow: 0.5px 0 0 currentColor;
  
  /* High contrast mode */
  --b-high-contrast-font-weight: 700;
  --b-high-contrast-emphasized-font-weight: 900;
  --b-high-contrast-text-shadow: 1px 0 0 currentColor;
  --b-high-contrast-focus-color: currentColor;
  
  /* Dark mode */
  --b-dark-color: inherit;
  --b-dark-emphasized-color: inherit;
  --b-dark-emphasized-text-shadow: 0.75px 0 0 currentColor;
}

/* Component styles */
.b {
  font-weight: var(--b-font-weight);
  color: var(--b-color);
  transition: font-weight 0.1s ease, color 0.2s ease, text-shadow 0.2s ease;
}

.b--emphasized {
  font-weight: var(--b-emphasized-font-weight);
  color: var(--b-emphasized-color);
  text-shadow: var(--b-emphasized-text-shadow);
}

/* Responsive media queries */
@media (prefers-contrast: high) {
  .b {
    font-weight: var(--b-high-contrast-font-weight);
  }
  
  .b--emphasized {
    font-weight: var(--b-high-contrast-emphasized-font-weight);
    text-shadow: var(--b-high-contrast-text-shadow);
  }
}

@media (prefers-color-scheme: dark) {
  .b {
    color: var(--b-dark-color);
  }
  
  .b--emphasized {
    color: var(--b-dark-emphasized-color);
    text-shadow: var(--b-dark-emphasized-text-shadow);
  }
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests covering rendering, variants, analytics, and edge cases.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Basic Rendering**: Verifies correct HTML element creation and class application.
- **Emphasized Variant**: Tests the emphasized prop with proper class and data attribute application.
- **Analytics Integration**: Validates both custom analytics functions and gtag integration with error handling.
- **Event Handling**: Tests click, mouse enter, and focus event handling.
- **Polymorphic Rendering**: Confirms correct behavior with different HTML elements and custom components.
- **Client-Side Rendering**: Tests lazy loading and memoization features.
- **Edge Cases**: Covers empty content, numeric content, nested elements, and complex children.
- **Performance Optimization**: Verifies click handler creation only when analytics are needed.

### Running Tests

To execute tests for the `B` component:

```bash
# Run all tests for the B component
pnpm test src/b/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Conditional Analytics**: Click handlers are only created when analytics are actually needed.
- **Memoized Props**: Enhanced props are memoized to prevent unnecessary recalculation.
- **Efficient Class Building**: Optimized className construction with proper filtering.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded.
- **CSS Optimization**: Efficient transitions and hardware-accelerated properties.
- **Bundle Splitting**: Server-side and client-side code are naturally separated.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile with touch-friendly interfaces.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.
- **Font Support**: Graceful degradation for font-weight values across different systems.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```typescript
import { B, type BProps, type BRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyBoldComponent: React.FC = () => {
  const boldRef = useRef<BRef>(null);
  
  const handleAnalytics = (data: Parameters<NonNullable<BProps['onAnalytics']>>[0]) => {
    console.log(`Bold text "${data.content}" was clicked`);
  };

  return (
    <div>
      <p>
        This is <B 
          ref={boldRef}
          emphasized
          analyticsId="sample-bold"
          onAnalytics={handleAnalytics}
          className="custom-bold"
        >
          type-safe bold text
        </B> with full TypeScript support.
      </p>
      
      <p>
        Standard bold: <B>regular text</B>
      </p>
      
      <p>
        Polymorphic rendering: <B as="span">span element</B>
      </p>
    </div>
  );
};

// Type-safe props usage
const boldProps: BProps = {
  emphasized: true,
  analyticsId: 'example',
  className: 'custom-class',
  children: 'Bold content',
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version to this `B` component:

1. **Import Changes**: Update to `import { B } from '@guyromellemagayano/components';`.
2. **Emphasized Feature**: Migrate to the new `emphasized` prop for extra-bold styling.
3. **Analytics Enhancement**: Update to the new analytics system with comprehensive error handling.
4. **CSS Variables**: Migrate to the new CSS variables system for theming.
5. **Performance**: Benefit from optimized click handler creation and memoization.

### Breaking Changes

- Emphasized styling now requires explicit `emphasized` prop
- Analytics function signature includes `content` parameter
- CSS variables follow new naming convention with `--b-` prefix
- Focus styles are now automatically applied with proper contrast

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `B` component:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md).
2. **Test Variants**: Include tests for both standard and emphasized variants.
3. **Update Documentation**: Keep emphasis and analytics documentation current.
4. **Accessibility Focus**: Prioritize semantic correctness and screen reader compatibility.
5. **Performance**: Ensure analytics optimizations remain efficient.

## 🔗 Related Components

- [Strong](../strong/README.md)
- [Em](../em/README.md)
- [Mark](../mark/README.md)
