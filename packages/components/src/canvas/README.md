<!-- markdownlint-disable line-length descriptive-link-text -->
# Canvas Component

A polymorphic wrapper for the HTML `<canvas>` element with analytics integration, drawing capabilities, and comprehensive event handling. Designed for graphics rendering, data visualization, and interactive drawing applications, prioritizing proper canvas semantics and accessibility standards.

## 📋 Table of Contents

- [Canvas Component](#canvas-component)
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
    - [Different Sizes](#different-sizes)
    - [Drawing Context](#drawing-context)
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

The `Canvas` component provides a flexible, accessible HTML canvas element for graphics rendering and interactive drawing applications. It supports custom dimensions, context management, and can be rendered as different elements for versatile usage patterns. The component includes comprehensive analytics integration and event handling while maintaining high performance and accessibility standards for visual content.

### Key Features

- **Graphics Rendering**: Utilizes the native `<canvas>` element for 2D and 3D graphics rendering.
- **Custom Dimensions**: Configurable width and height with responsive design support.
- **Context Management**: Built-in support for canvas context initialization and management.
- **Analytics Integration**: Comprehensive event tracking for canvas interactions including dimensions.
- **Interactive Events**: Enhanced click handling with canvas-specific event callbacks.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Validation System**: Runtime validation warnings for invalid prop usage in development.
- **Accessibility Support**: Proper ARIA attributes and screen reader compatibility.
- **Responsive Design**: CSS support for responsive canvas behavior.
- **High Performance**: Optimized for fast rendering and efficient graphics operations.

## 🚀 Quick Start

### Installation

To use the `Canvas` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Canvas` component and use it in your React application:

```tsx
import { Canvas } from '@guyromellemagayano/components';

function DrawingArea() {
  return (
    <Canvas 
      width={400} 
      height={300}
      onCanvasClick={(event) => console.log('Canvas clicked!')}
    />
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
| `as` | `React.ElementType` \| `string` | `"canvas"` | The HTML element or custom component to render as. Defaults to `"canvas"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `onAnalytics` | `(data: { event: string; category: string; label: string; action: string; canvasWidth?: number; canvasHeight?: number; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Canvas` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | - | Width of the canvas in pixels. Only valid for `<canvas>` elements. |
| `height` | `number` | - | Height of the canvas in pixels. Only valid for `<canvas>` elements. |
| `onCanvasClick` | `(event: React.MouseEvent<HTMLCanvasElement>) => void` | - | Callback function triggered when the canvas is clicked. |
| `onContextReady` | `(context: CanvasRenderingContext2D \| null) => void` | - | Callback function triggered when the canvas context is ready for drawing operations. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Canvas` component for graphics rendering.

```tsx
import { Canvas } from '@guyromellemagayano/components';

function BasicCanvasExample() {
  return (
    <Canvas 
      width={400} 
      height={300}
      style={{ border: '1px solid #ccc' }}
    />
  );
}
```

### Different Sizes

Shows various canvas sizes and responsive behavior.

```tsx
import { Canvas } from '@guyromellemagayano/components';

function SizedCanvasExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Small canvas */}
      <Canvas 
        width={200} 
        height={150}
        className="canvas--small"
      />
      
      {/* Medium canvas */}
      <Canvas 
        width={400} 
        height={300}
        className="canvas--medium"
      />
      
      {/* Large canvas */}
      <Canvas 
        width={600} 
        height={450}
        className="canvas--large"
      />
      
      {/* Responsive canvas */}
      <Canvas 
        width={800} 
        height={600}
        className="canvas--responsive"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
```

### Drawing Context

Demonstrates how to access and use the canvas drawing context.

```tsx
import { Canvas } from '@guyromellemagayano/components';
import { useRef, useEffect } from 'react';

function DrawingCanvasExample() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Draw a simple rectangle
    context.fillStyle = '#3b82f6';
    context.fillRect(50, 50, 100, 75);
    
    // Draw a circle
    context.beginPath();
    context.arc(200, 100, 40, 0, 2 * Math.PI);
    context.fillStyle = '#ef4444';
    context.fill();
  }, []);
  
  const handleContextReady = (context: CanvasRenderingContext2D | null) => {
    if (context) {
      console.log('Canvas context is ready for drawing');
    }
  };

  return (
    <Canvas 
      ref={canvasRef}
      width={400} 
      height={200}
      onContextReady={handleContextReady}
    />
  );
}
```

### With Custom Styling

Applies custom CSS classes and inline styles to the `Canvas` component.

```tsx
import { Canvas } from '@guyromellemagayano/components';

function StyledCanvasExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Canvas 
        width={300} 
        height={200}
        className="canvas--dark"
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      />
      
      <Canvas 
        width={300} 
        height={200}
        className="canvas--minimal"
        style={{ 
          backgroundColor: '#f8fafc',
          border: '2px dashed #cbd5e1'
        }}
      />
      
      <Canvas 
        width={300} 
        height={200}
        className="canvas--bordered"
        style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px'
        }}
      />
    </div>
  );
}
```

### With Analytics

Integrates comprehensive analytics tracking for canvas interactions.

```tsx
import { Canvas } from '@guyromellemagayano/components';

function AnalyticsCanvasExample() {
  const handleAnalytics = (data) => {
    console.log('Canvas interaction recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, {
    //   action: data.action,
    //   canvasWidth: data.canvasWidth,
    //   canvasHeight: data.canvasHeight
    // });
  };
  
  const handleCanvasClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Canvas clicked at: (${x}, ${y})`);
  };

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Canvas 
        width={300} 
        height={200}
        analyticsId="drawing-canvas"
        onAnalytics={handleAnalytics}
        onCanvasClick={handleCanvasClick}
      />
      
      <Canvas 
        width={400} 
        height={300}
        analyticsId="visualization-canvas"
        onAnalytics={handleAnalytics}
        style={{ cursor: 'crosshair' }}
      />
    </div>
  );
}
```

### Polymorphic Rendering

Shows how to render the `Canvas` component as different HTML elements or custom React components.

⚠️ **Warning**: When using the `as` prop with non-canvas elements, canvas-specific props like `width` and `height` may not apply or may trigger validation warnings in development mode.

```tsx
import { Canvas } from '@guyromellemagayano/components';

function PolymorphicCanvasExample() {
  const CustomCanvasContainer = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} className="custom-canvas-container" />
  ));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Render as div for non-canvas content */}
      <Canvas 
        as="div" 
        style={{ 
          width: '400px', 
          height: '300px',
          backgroundColor: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>Canvas-styled div container</p>
      </Canvas>
      
      {/* Render as section for semantic content */}
      <Canvas 
        as="section" 
        className="canvas--bordered"
        style={{ padding: '20px' }}
      >
        <h3>Canvas Section</h3>
        <p>This uses canvas styling but renders as a section element.</p>
      </Canvas>
      
      {/* Render with custom component */}
      <Canvas 
        as={CustomCanvasContainer}
        width={300}
        height={200}
      >
        Custom canvas container component
      </Canvas>
    </div>
  );
}
```

### Client-Side Rendering

Demonstrates usage of `Canvas` component with client-side rendering capabilities.

```tsx
import { Canvas } from '@guyromellemagayano/components';

function ClientCanvasExample() {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Canvas 
        width={400} 
        height={300}
        isClient
        analyticsId="client-canvas"
      />
      
      <Canvas 
        width={300} 
        height={200}
        isClient
        className="canvas--dark"
        onCanvasClick={(event) => {
          console.log('Client-side canvas clicked');
        }}
      />
    </div>
  );
}
```

## 🔍 Validation System

### Polymorphic Validation

The `Canvas` component includes a sophisticated validation system to ensure proper usage of canvas-specific attributes when rendering as different elements.

**Validated Attributes:**

- `width`: Only valid for `<canvas>` elements
- `height`: Only valid for `<canvas>` elements

When rendering as a non-canvas element (using the `as` prop), the component will:

- Display development warnings for invalid attribute usage
- Add `data-element-validation="warning"` attribute for debugging
- Add `data-polymorphic-element` attribute for debugging
- Continue to function normally in production

### Development Warnings

In development mode, you'll see console warnings when using canvas-specific props with other elements:

```typescript
// This will trigger validation warnings in development
<Canvas as="div" width={400} height={300}>
  Invalid canvas dimensions on div
</Canvas>

// Console output may include warnings about canvas-specific attributes
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices for graphics and visual content:

- **Semantic HTML**: Utilizes the native `<canvas>` element, ensuring proper graphics semantics for assistive technologies.
- **ARIA Support**: Includes default `aria-label` and `role="img"` for screen reader compatibility.
- **Keyboard Navigation**: Supports focus management for interactive canvas applications.
- **Focus Management**: Clear focus indicators and logical tab order when interactive.
- **Screen Reader Support**: Proper labeling and alternative text support for canvas content.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences.
- **Alternative Text**: Supports custom `aria-label` for describing canvas content.

### ARIA Attributes

The `<canvas>` element requires additional accessibility considerations:

- `role="img"` is automatically applied for screen reader compatibility
- `aria-label="Canvas element"` is provided by default but can be overridden
- Custom `aria-label` should describe the canvas content or purpose
- `aria-describedby` can link to detailed descriptions of visual content
- Interactive canvas applications may need additional ARIA attributes

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.canvas` : The base class for the `Canvas` component, defining its fundamental styles.

### Modifiers

- `.canvas--small` : Small size preset (200x150px).
- `.canvas--medium` : Medium size preset (400x300px).
- `.canvas--large` : Large size preset (600x450px).
- `.canvas--full-width` : Full width responsive styling.
- `.canvas--dark` : Dark theme styling.
- `.canvas--minimal` : Minimal styling without borders or shadows.
- `.canvas--bordered` : Enhanced border styling.
- `.canvas--responsive` : Responsive behavior for mobile devices.
- `.canvas--loading` : Loading state styling.
- `.canvas--error` : Error state styling.
- `.canvas--disabled` : Disabled state styling.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.canvas {
  /* Base styling */
  --canvas-display: block;
  --canvas-max-width: 100%;
  --canvas-height: auto;
  --canvas-border: 1px solid #e2e8f0;
  --canvas-border-radius: 0.375rem;
  --canvas-background-color: #ffffff;
  --canvas-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --canvas-transition: all 0.2s ease-in-out;
  
  /* Interactive states */
  --canvas-hover-border-color: #cbd5e1;
  --canvas-hover-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --canvas-focus-outline: 2px solid #3b82f6;
  --canvas-focus-outline-offset: 2px;
  --canvas-focus-border-color: #3b82f6;
  
  /* State styling */
  --canvas-loading-opacity: 0.6;
  --canvas-error-border-color: #ef4444;
  --canvas-error-background-color: #fef2f2;
  --canvas-disabled-opacity: 0.5;
  
  /* Theme variations */
  --canvas-dark-background-color: #1f2937;
  --canvas-dark-border-color: #374151;
  --canvas-dark-color: #f9fafb;
}

/* Base styles with CSS variables */
.canvas {
  display: var(--canvas-display);
  max-width: var(--canvas-max-width);
  height: var(--canvas-height);
  border: var(--canvas-border);
  border-radius: var(--canvas-border-radius);
  background-color: var(--canvas-background-color);
  box-shadow: var(--canvas-box-shadow);
  transition: var(--canvas-transition);
}

.canvas:hover {
  border-color: var(--canvas-hover-border-color);
  box-shadow: var(--canvas-hover-box-shadow);
}

.canvas:focus {
  outline: var(--canvas-focus-outline);
  outline-offset: var(--canvas-focus-outline-offset);
  border-color: var(--canvas-focus-border-color);
}

/* State implementations */
.canvas--loading {
  opacity: var(--canvas-loading-opacity);
  pointer-events: none;
}

.canvas--error {
  border-color: var(--canvas-error-border-color);
  background-color: var(--canvas-error-background-color);
}

.canvas--disabled {
  opacity: var(--canvas-disabled-opacity);
  pointer-events: none;
  cursor: not-allowed;
}

/* Theme implementations */
.canvas--dark {
  background-color: var(--canvas-dark-background-color);
  border-color: var(--canvas-dark-border-color);
  color: var(--canvas-dark-color);
}

.canvas--minimal {
  border: none;
  box-shadow: none;
  background-color: transparent;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .canvas--responsive {
    width: 100%;
    height: auto;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .canvas {
    border: 2px solid #000000;
  }
  
  .canvas:focus {
    outline: 3px solid #000000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .canvas {
    transition: none;
  }
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests, covering basic rendering, props, and interactions.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Rendering**: Verifies basic rendering, prop application, and correct DOM output.
- **Canvas Properties**: Tests width, height, and canvas-specific attribute handling.
- **Event Handling**: Validates click events, canvas-specific callbacks, and mouse interactions.
- **Analytics**: Validates analytics tracking including canvas dimensions with graceful failure handling.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements.
- **Validation System**: Tests polymorphic validation warnings and proper development feedback.
- **Accessibility**: Ensures proper ARIA attributes, roles, and screen reader support.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs including negative dimensions.

### Running Tests

To execute tests for the `Canvas` component:

```bash
# Run all tests for the Canvas component
pnpm test src/canvas/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Minimal Overhead**: As a graphics element, it provides essential canvas functionality with minimal runtime impact.
- **Event Handler Optimization**: Efficient event handling prevents unnecessary re-renders during interactions.
- **Context Management**: Optimized canvas context initialization and management.
- **Responsive Design**: CSS-based responsive behavior reduces JavaScript overhead.
- **Analytics Optimization**: Efficient analytics tracking with error handling and dimension capture.
- **Memory Management**: Proper cleanup and memory management for canvas operations.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Canvas Support**: Requires browsers with HTML5 Canvas API support.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing seamless touch interactions with canvas.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies, ensuring proper graphics interpretation.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```tsx
import { Canvas, type CanvasProps, type CanvasRef } from '@guyromellemagayano/components';
import React, { useRef, useEffect } from 'react';

const MyComponent: React.FC = () => {
  const canvasRef = useRef<CanvasRef>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Type-safe canvas drawing operations
    context.fillStyle = '#3b82f6';
    context.fillRect(0, 0, 100, 100);
  }, []);
  
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('Canvas clicked at:', event.clientX, event.clientY);
  };
  
  return (
    <Canvas 
      ref={canvasRef}
      width={400}
      height={300}
      onCanvasClick={handleCanvasClick}
      analyticsId="typed-canvas"
    />
  );
};
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Canvas` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Canvas } from '@guyromellemagayano/components';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.canvas`, `.canvas--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern with canvas dimension tracking.
5. **Event Handling**: Update to use new `onCanvasClick` callback for canvas-specific interactions.
6. **Context Management**: Migrate to new `onContextReady` callback for context initialization.

### Breaking Changes

- Component requires React 18+
- TypeScript definitions updated for better type safety
- Analytics integration includes canvas dimensions in event data
- Validation system added for polymorphic usage
- CSS class structure updated to BEM methodology
- Event handling enhanced with canvas-specific callbacks
- Accessibility improvements with automatic ARIA attributes

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Canvas` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance for graphics and visual content.
5. **Consider Performance**: Optimize for performance implications, especially for graphics rendering operations.
6. **Test Canvas Operations**: Verify proper canvas functionality, context management, and drawing operations.

## 🔗 Related Components

- [Img](../img/README.md)
- [Svg](../svg/README.md)
