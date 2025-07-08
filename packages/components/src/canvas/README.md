<!-- markdownlint-disable line-length descriptive-link-text -->
# Canvas Component

Universal canvas component with context management, drawing utilities, comprehensive analytics, and accessibility features. Supports server-side and client-side rendering with advanced canvas capabilities.

## 📋 Table of Contents

- [Canvas Component](#canvas-component)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
  - [🚀 Quick Start](#-quick-start)
  - [⚙️ Props](#️-props)
    - [Standard Props](#standard-props)
    - [Canvas-Specific Props](#canvas-specific-props)
  - [💡 Examples](#-examples)
    - [Basic Canvas](#basic-canvas)
    - [Interactive Drawing Canvas](#interactive-drawing-canvas)
    - [WebGL Canvas](#webgl-canvas)
    - [Responsive Canvas](#responsive-canvas)
    - [Canvas with Analytics](#canvas-with-analytics)
    - [Canvas with Debug Mode](#canvas-with-debug-mode)
    - [Polymorphic Canvas](#polymorphic-canvas)
    - [Client-Side Canvas](#client-side-canvas)
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
    - [From Basic HTML Canvas](#from-basic-html-canvas)
    - [Breaking Changes](#breaking-changes)
  - [🤝 Contributing](#-contributing)
    - [Contribution Guidelines](#contribution-guidelines)
  - [🔗 Related Components](#-related-components)

## 📖 Overview

The Canvas component provides comprehensive canvas functionality with:

- **🎨 Multiple Context Types**: Support for 2D, WebGL, WebGL2, and bitmap rendering contexts
- **📱 Touch & Mouse Support**: Complete drawing event handling for all input methods
- **📊 Analytics Integration**: Built-in Google Analytics tracking with custom analytics support
- **♿ Accessibility**: Full ARIA support, keyboard navigation, and screen reader compatibility
- **🔧 High DPI Support**: Automatic pixel ratio scaling for crisp rendering on high-resolution displays
- **📐 Responsive Design**: Auto-resize capabilities with container-aware dimensions
- **⚠️ Error Handling**: Graceful context initialization failure handling with fallback UI
- **🐛 Debug Mode**: Developer-friendly debug overlay with real-time canvas information
- **🔄 Polymorphic Rendering**: Render as any HTML element with validation warnings
- **⚡ Performance Optimized**: Lazy loading, memoization, and hardware acceleration

## 🚀 Quick Start

```tsx
import { Canvas } from '@guyromellemagayano/components';

// Basic canvas
<Canvas width={400} height={300}>
  Fallback content for unsupported browsers
</Canvas>

// Interactive drawing canvas
<Canvas
  width={600}
  height={400}
  active
  contextType="2d"
  onDrawStart={(event) => console.log('Drawing started')}
  onDrawing={(event) => console.log('Drawing...')}
  onDrawEnd={(event) => console.log('Drawing ended')}
  analyticsId="drawing-canvas"
>
  Interactive drawing surface
</Canvas>
```

## ⚙️ Props

### Standard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | `undefined` | Fallback content for canvas |
| `className` | `string` | `undefined` | Additional CSS classes |
| `style` | `React.CSSProperties` | `undefined` | Inline styles |
| `as` | `React.ElementType` | `"canvas"` | Element type for polymorphic rendering |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Enable memoization for performance |
| `analyticsId` | `string` | `undefined` | Analytics identifier for tracking |
| `onAnalytics` | `(data: CanvasAnalyticsData) => void` | `undefined` | Custom analytics function |
| [key: data-${string}] | `string` | `undefined` | Data attributes for testing/styling |

### Canvas-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `300` | Canvas width in pixels |
| `height` | `number` | `150` | Canvas height in pixels |
| `dimensions` | `CanvasDimensions` | `undefined` | Custom dimensions with pixel ratio |
| `variant` | `CanvasVariant` | `"default"` | Visual variant (`default`, `responsive`, `fullscreen`, `thumbnail`) |
| `contextType` | `CanvasContextType` | `"2d"` | Rendering context type (`2d`, `webgl`, `webgl2`, `bitmaprenderer`) |
| `active` | `boolean` | `false` | Enable drawing interactions |
| `loading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable all interactions |
| `enableHighDPI` | `boolean` | `true` | Enable high DPI support |
| `preserveDrawingBuffer` | `boolean` | `false` | Preserve drawing buffer for context |
| `alpha` | `boolean` | `true` | Enable alpha channel |
| `antialias` | `boolean` | `true` | Enable antialiasing |
| `debug` | `boolean` | `false` | Show debug information overlay |
| `autoResize` | `boolean` | `false` | Auto-resize with container |
| `maxWidth` | `number` | `undefined` | Maximum width for responsive sizing |
| `maxHeight` | `number` | `undefined` | Maximum height for responsive sizing |
| `onDrawStart` | `(event) => void` | `undefined` | Drawing start callback |
| `onDrawing` | `(event) => void` | `undefined` | Drawing move callback |
| `onDrawEnd` | `(event) => void` | `undefined` | Drawing end callback |
| `onContextReady` | `(context, canvas) => void` | `undefined` | Context initialization callback |
| `onResize` | `(dimensions) => void` | `undefined` | Resize callback |
| `alt` | `string` | `undefined` | Alt text for accessibility |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `description` | `string` | `undefined` | Description for screen readers |

## 💡 Examples

### Basic Canvas

```tsx
<Canvas width={400} height={300} className="my-canvas">
  Your browser does not support canvas
</Canvas>
```

### Interactive Drawing Canvas

```tsx
<Canvas
  width={600}
  height={400}
  variant="responsive"
  active
  contextType="2d"
  enableHighDPI
  onDrawStart={(event) => {
    console.log('Drawing started at:', event.clientX, event.clientY);
  }}
  onDrawing={(event) => {
    console.log('Drawing at:', event.clientX, event.clientY);
  }}
  onDrawEnd={(event) => {
    console.log('Drawing ended');
  }}
  onContextReady={(context, canvas) => {
    if (context instanceof CanvasRenderingContext2D) {
      context.strokeStyle = '#3b82f6';
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.lineJoin = 'round';
    }
  }}
  ariaLabel="Interactive drawing canvas"
  description="Use mouse or touch to draw on this canvas"
>
  Interactive drawing surface
</Canvas>
```

### WebGL Canvas

```tsx
<Canvas
  width={800}
  height={600}
  contextType="webgl"
  alpha={false}
  antialias={true}
  preserveDrawingBuffer={true}
  onContextReady={(context, canvas) => {
    if (context instanceof WebGLRenderingContext) {
      context.clearColor(0.0, 0.0, 0.0, 1.0);
      context.clear(context.COLOR_BUFFER_BIT);
    }
  }}
  ariaLabel="WebGL rendering canvas"
>
  WebGL content
</Canvas>
```

### Responsive Canvas

```tsx
<Canvas
  width={800}
  height={600}
  variant="responsive"
  autoResize
  maxWidth={1200}
  maxHeight={800}
  onResize={(dimensions) => {
    console.log('Canvas resized to:', dimensions);
  }}
>
  Responsive canvas content
</Canvas>
```

### Canvas with Analytics

```tsx
<Canvas
  width={500}
  height={300}
  active
  analyticsId="drawing-board"
  onAnalytics={(data) => {
    console.log('Canvas analytics:', data);
    // Custom analytics tracking
    myAnalytics.track(data.event, data);
  }}
  onDrawStart={() => console.log('User started drawing')}
>
  Analytics-enabled canvas
</Canvas>
```

### Canvas with Debug Mode

```tsx
<Canvas
  width={400}
  height={300}
  debug
  contextType="2d"
  enableHighDPI
  variant="responsive"
  active
>
  Debug mode canvas - shows overlay with canvas information
</Canvas>
```

### Polymorphic Canvas

```tsx
{/* Renders as div with canvas functionality */}
<Canvas
  as="div"
  width={300}
  height={200}
  className="canvas-like-div"
>
  Canvas functionality in a div
</Canvas>

{/* Custom component */}
<Canvas
  as={MyCustomComponent}
  width={400}
  height={300}
  customProp="value"
>
  Canvas with custom component
</Canvas>
```

### Client-Side Canvas

```tsx
<Canvas
  width={600}
  height={400}
  isClient
  isMemoized
  active
  contextType="2d"
  onContextReady={(context, canvas) => {
    // Client-side only initialization
    initializeCanvasLibrary(context, canvas);
  }}
>
  Client-side optimized canvas
</Canvas>
```

## 🔍 Validation System

### Polymorphic Validation

The Canvas component includes runtime validation for polymorphic usage:

```tsx
// ✅ Correct usage
<Canvas width={400} height={300}>Canvas content</Canvas>

// ⚠️ Warning in development
<Canvas as="div" width={400} height={300}>
  Canvas props on div element
</Canvas>
```

### Development Warnings

When using canvas-specific props with non-canvas elements, you'll see helpful warnings:

```bash
Canvas: The following props are only valid for <canvas> elements: width, height.
You're rendering as <div>. Canvas-specific sizing and context properties.
Consider using a semantic <canvas> element or removing these props.
```

## ♿ Accessibility

### Best Practices Followed

- **Semantic HTML**: Uses proper `<canvas>` element by default
- **ARIA Support**: Comprehensive ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support for interactions
- **Focus Management**: Proper focus indicators and management
- **Alternative Content**: Support for fallback content in children
- **High Contrast**: High contrast mode support
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

### ARIA Attributes

| Attribute | Description | Default Value |
|-----------|-------------|---------------|
| `aria-label` | Canvas description | `"Interactive canvas"` |
| `aria-describedby` | References description element | Generated ID when description provided |
| `role` | Element role | `"img"` or `"application"` based on interactivity |

## 🎨 Styling

### BEM Methodology

The component follows BEM naming conventions:

```css
.canvas                 /* Base component */
.canvas--default        /* Default variant */
.canvas--responsive     /* Responsive variant */
.canvas--active         /* Active state */
.canvas--disabled       /* Disabled state */
.canvas--loading        /* Loading state */
.canvas--drawing        /* Drawing state */
.canvas--debug          /* Debug mode */
```

### Base Classes

- `.canvas` - Base canvas styles
- `.canvas-wrapper` - Wrapper for additional elements

### Modifiers

- `.canvas--default` - Default canvas styling
- `.canvas--responsive` - Responsive canvas that scales with container
- `.canvas--fullscreen` - Full viewport canvas
- `.canvas--thumbnail` - Small thumbnail canvas
- `.canvas--active` - Interactive canvas with drawing capabilities
- `.canvas--disabled` - Non-interactive disabled canvas
- `.canvas--loading` - Canvas in loading state
- `.canvas--drawing` - Canvas currently being drawn on
- `.canvas--debug` - Canvas with debug overlay
- `.canvas--error` - Canvas with initialization error

### Customization Options

```css
/* CSS Custom Properties */
.canvas {
  --canvas-border-color: #e2e8f0;
  --canvas-background-color: #ffffff;
  --canvas-active-color: #3b82f6;
  --canvas-disabled-opacity: 0.6;
  --canvas-border-radius: 4px;
  --canvas-focus-color: #3b82f6;
  --canvas-error-color: #ef4444;
  --canvas-success-color: #10b981;
  --canvas-debug-color: #8b5cf6;
}
```

### CSS Variables

The component supports extensive theming through CSS variables:

```css
.my-canvas {
  --canvas-border-color: #1e293b;
  --canvas-background-color: #f8fafc;
  --canvas-active-color: #059669;
  --canvas-border-radius: 8px;
}
```

## 🧪 Testing

### Test Files

- `index.test.tsx` - Main component tests
- `index.client.test.tsx` - Client-side specific tests

### Test Coverage

The component has comprehensive test coverage including:

- ✅ Basic rendering with all variants
- ✅ Context initialization (2D, WebGL, WebGL2, bitmap)
- ✅ Drawing event handling (mouse and touch)
- ✅ Analytics integration and tracking
- ✅ Accessibility features and ARIA support
- ✅ Error handling and fallback states
- ✅ Polymorphic rendering with validation
- ✅ High DPI support and pixel ratio scaling
- ✅ Responsive behavior and auto-resize
- ✅ Client-side rendering capabilities
- ✅ Edge cases and error conditions

### Running Tests

```bash
# Run all canvas tests
pnpm test src/canvas

# Run tests in watch mode
pnpm test:watch src/canvas

# Run with coverage
pnpm test:coverage src/canvas
```

## ⚡ Performance

### Optimization Techniques

- **Lazy Loading**: Client components are loaded only when needed
- **Memoization**: Event handlers and computed values are memoized
- **Hardware Acceleration**: CSS transforms for better performance
- **High DPI Optimization**: Efficient pixel ratio scaling
- **Context Reuse**: Canvas contexts are cached and reused
- **Touch Optimization**: Optimized touch event handling
- **Memory Management**: Proper cleanup of event listeners and contexts

## 🌐 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Canvas Support**: All browsers with HTML5 canvas support
- **WebGL Support**: Modern browsers with WebGL 1.0/2.0
- **High DPI**: Browsers supporting devicePixelRatio
- **Touch Events**: Mobile browsers with touch support
- **Accessibility**: Browsers with ARIA support

## 📘 TypeScript

```tsx
import React from 'react';
import { Canvas, type CanvasProps, type CanvasDimensions, CanvasUtils } from '@guyromellemagayano/components';

// Basic usage with TypeScript
const MyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const handleContextReady = (context: RenderingContext | null, canvas: HTMLCanvasElement) => {
    if (context instanceof CanvasRenderingContext2D) {
      // Type-safe 2D context operations
      context.strokeStyle = '#3b82f6';
      context.lineWidth = 2;
    }
  };

  const handleDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Type-safe event handling
    console.log('Drawing event:', event.type);
  };

  const customDimensions: CanvasDimensions = {
    width: 800,
    height: 600,
    pixelRatio: window.devicePixelRatio || 1,
  };

  return (
    <Canvas
      ref={canvasRef}
      dimensions={customDimensions}
      contextType="2d"
      active
      onContextReady={handleContextReady}
      onDrawing={handleDrawing}
      analyticsId="my-canvas"
    >
      Interactive canvas
    </Canvas>
  );
};

// Utility functions
const isValidDimensions = CanvasUtils.validateDimensions(800, 600);
const pixelRatio = CanvasUtils.getPixelRatio();
const responsiveDims = CanvasUtils.getResponsiveDimensions(800, 600, 1200, 800);
```

## 📚 Migration Guide

### From Basic HTML Canvas

```tsx
// Before: Basic HTML canvas
<canvas width="400" height="300" id="myCanvas">
  Fallback content
</canvas>

// After: Component library canvas
<Canvas width={400} height={300} analyticsId="myCanvas">
  Fallback content
</Canvas>
```

### Breaking Changes

- Canvas-specific props are validated when using polymorphic rendering
- Event handlers receive enhanced event objects with drawing state
- Context initialization is asynchronous with callback support
- High DPI scaling is enabled by default (can be disabled)

## 🤝 Contributing

### Contribution Guidelines

When contributing to the Canvas component:

1. **Follow TypeScript Patterns**: Use proper typing for all props and event handlers
2. **Test Coverage**: Ensure comprehensive test coverage for new features
3. **Accessibility**: Maintain WCAG 2.1 AA compliance
4. **Performance**: Consider performance impact of new features
5. **Documentation**: Update README and JSDoc comments
6. **Canvas Standards**: Follow HTML5 canvas best practices
7. **Browser Compatibility**: Test across supported browsers

## 🔗 Related Components

- **Image**: For static image display with canvas-like features
- **Video**: For video content with canvas integration capabilities
- **SVG Components**: For vector graphics that complement canvas raster graphics
- **Drawing Components**: Specialized drawing tools that use canvas internally
