<!-- markdownlint-disable line-length -->
# Area Component

A sophisticated, polymorphic wrapper for the HTML `<area>` element with advanced coordinate validation, touch optimization, debug mode, and comprehensive analytics. Specifically designed for defining clickable regions within image maps with enterprise-grade features.

## 📋 Table of Contents

- [Area Component](#area-component)
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
  - [🛠️ Utility Functions](#️-utility-functions)
    - [AreaUtils Export](#areautils-export)
    - [Coordinate Generation](#coordinate-generation)
    - [Validation Functions](#validation-functions)
    - [Geometric Calculations](#geometric-calculations)
  - [💡 Examples](#-examples)
    - [Basic Example](#basic-example)
    - [With Advanced Analytics](#with-advanced-analytics)
    - [With Debug Mode and Validation](#with-debug-mode-and-validation)
    - [Touch Validation Example](#touch-validation-example)
    - [Using Utility Functions](#using-utility-functions)
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

The `Area` component provides a sophisticated, accessible HTML `<area>` element for defining clickable regions within image maps. Beyond basic functionality, it includes advanced coordinate validation, touch optimization checking, geometric calculations, debug visualization, and comprehensive analytics tracking with interaction type detection.

### Key Features

- **Coordinate Validation**: Automatic validation of coordinates based on shape with development warnings
- **Touch Optimization**: WCAG-compliant touch target validation with 44px minimum recommendations
- **Debug Mode**: Visual debug overlays in development showing area boundaries and coordinates
- **Advanced Analytics**: Rich analytics data including geometric calculations, interaction types, and touch optimization status
- **Utility Functions**: Comprehensive `AreaUtils` export for coordinate manipulation
- **Accessibility Excellence**: Full WCAG 2.1 AA compliance with focus management and screen reader support
- **Performance Optimized**: Client-side code splitting, memoization, and efficient geometric calculations

## 🚀 Quick Start

### Installation

To use the `Area` component in your project, install the `@guyromellemagayano/components` package:

```bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
```

### Basic Usage

Import the `Area` component and use it within a `<Map>` component (or a native `<map>` element) in your React application:

```typescript
import { Img, Map, Area } from '@guyromellemagayano/components';

function MyImageMap() {
  return (
    <>
      <Img src="planets.gif" alt="Planets" useMap="#planetmap" />
      <Map name="planetmap">
        <Area shape="rect" coords="0,0,82,126" href="sun.htm" alt="Sun" />
        <Area shape="circle" coords="90,58,3" href="mercury.htm" alt="Mercury" />
        <Area shape="circle" coords="124,58,8" href="venus.htm" alt="Venus" />
      </Map>
    </>
  );
}
```

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the component. Note: `<area>` elements typically do not render children. |
| `className` | `string` | - | Additional CSS classes to apply to the component. |
| `style` | `React.CSSProperties` | - | Inline styles to apply to the component. |
| `as` | `React.ElementType` \| `string` | `"area"` | The HTML element or custom component to render as. Defaults to `"area"`. |
| `isClient` | `boolean` | `false` | If `true`, the component will be rendered client-side, enabling client-only features. |
| `isMemoized` | `boolean` | `false` | If `true` and `isClient` is also `true`, the client component will be memoized for performance optimization. |
| `analyticsId` | `string` | - | A unique identifier for analytics tracking of component interactions. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Area` component and provide its advanced functionality.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alt` | `string` | - | **Required**. A short, descriptive alternative text for the area, crucial for accessibility. |
| `coords` | `string` | - | A set of comma-separated coordinates defining the shape of the area. Format varies by `shape`. |
| `shape` | `"rect" \| "circle" \| "poly" \| "default"` | `"rect"` | The shape of the area. |
| `href` | `string` | - | The URL that the hyperlink points to when the area is clicked. |
| `target` | `string` | `"_self"` | Specifies where to open the linked document (e.g., `_blank`, `_self`, `_parent`, `_top`). |
| `disabled` | `boolean` | `false` | If `true`, disables the area, making it non-interactive. |
| `onAnalytics` | `(data: AreaAnalyticsData) => void` | - | A custom function for handling advanced analytics with geometric and interaction data. |
| `minTouchTarget` | `number` | `44` | The minimum size (in pixels) for an area to be considered touch-optimized. |
| `debug` | `boolean` | `false` | If `true` in a development environment, renders a visual debug overlay for the area. |
| `validateCoords` | `boolean` | `true` | If `true`, validates the coordinates against the shape on mount and warns if invalid. |
| `ariaLabel` | `string` | - | Custom aria-label override. Defaults to `alt` text. |
| `focusable` | `boolean` | `true` | If `true`, the area will be focusable via keyboard navigation. |
| `priority` | `'high' \| 'normal' \| 'low'` | `'normal'` | Sets the tab order priority for screen readers and keyboard navigation. |

## 🛠️ Utility Functions

### AreaUtils Export

The component exports a comprehensive `AreaUtils` object with utility functions for coordinate manipulation:

```typescript
import { AreaUtils } from '@guyromellemagayano/components';

// Validate coordinates
const isValid = AreaUtils.validateCoordinates('rect', '0,0,100,100');

// Calculate area size
const size = AreaUtils.calculateAreaSize('circle', '50,50,25');

// Check touch optimization
const touchOptimized = AreaUtils.checkTouchOptimization('rect', '0,0,100,100', 44);
```

### Coordinate Generation

| Function | Description | Example |
|----------|-------------|---------|
| `createRectCoords(x1, y1, x2, y2)` | Creates type-safe rectangular coordinates | `AreaUtils.createRectCoords(0, 0, 100, 100)` |
| `createCircleCoords(x, y, r)` | Creates type-safe circular coordinates | `AreaUtils.createCircleCoords(50, 50, 25)` |
| `createPolyCoords(points)` | Creates polygon coordinates from point array | `AreaUtils.createPolyCoords([{x:0,y:0}, {x:50,y:25}])` |

### Validation Functions

| Function | Description | Example |
|----------|-------------|---------|
| `validateCoordinates(shape, coords)` | Validates coordinates for any shape | `AreaUtils.validateCoordinates('rect', '0,0,100,100')` |
| `validateRectCoords(coords)` | Validates rectangular coordinates | `AreaUtils.validateRectCoords('0,0,100,100')` |
| `validateCircleCoords(coords)` | Validates circular coordinates | `AreaUtils.validateCircleCoords('50,50,25')` |
| `validatePolyCoords(coords)` | Validates polygon coordinates | `AreaUtils.validatePolyCoords('0,0,50,25,100,0')` |

### Geometric Calculations

| Function | Description | Example |
|----------|-------------|---------|
| `calculateAreaSize(shape, coords)` | Calculates area size in pixels² | `AreaUtils.calculateAreaSize('circle', '50,50,25')` |
| `calculateCenterPoint(shape, coords)` | Calculates geometric center point | `AreaUtils.calculateCenterPoint('rect', '0,0,100,100')` |
| `checkTouchOptimization(shape, coords, minSize)` | Checks if area meets touch requirements | `AreaUtils.checkTouchOptimization('rect', '0,0,44,44')` |
| `percentToAbsolute(coords, width, height)` | Converts percentage to absolute coordinates | `AreaUtils.percentToAbsolute('0,0,50,50', 200, 200)` |
| `expandForTouch(shape, coords, minSize)` | Expands area to meet touch requirements | `AreaUtils.expandForTouch('rect', '0,0,20,20', 44)` |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Area` component within an image map.

```typescript
import { Img, Map, Area } from '@guyromellemagayano/components';

function BasicAreaExample() {
  return (
    <>
      <Img src="workplace.jpg" alt="Workplace" useMap="#workplacemap" />
      <Map name="workplacemap">
        <Area shape="rect" coords="34,44,270,350" href="computer.htm" alt="Computer" />
        <Area shape="circle" coords="337,300,44" href="coffee.htm" alt="Coffee" />
      </Map>
    </>
  );
}
```

### With Advanced Analytics

Demonstrates the rich analytics data available with geometric calculations and interaction detection.

```typescript
import { Img, Map, Area, type AreaAnalyticsData } from '@guyromellemagayano/components';

function AdvancedAnalyticsExample() {
  const handleAreaClick = (data: AreaAnalyticsData) => {
    console.log('Rich analytics data:', {
      event: data.event,
      label: data.label,
      areaSize: data.areaSize, // Calculated area in pixels²
      centerPoint: data.centerPoint, // Geometric center {x, y}
      touchOptimized: data.touchOptimized, // Boolean for touch suitability
      interactionType: data.interactionType, // 'mouse' | 'keyboard' | 'touch'
      shape: data.shape,
      coords: data.coords,
    });

    // Send comprehensive data to analytics platform
    gtag('event', 'area_interaction', {
      area_size: data.areaSize,
      interaction_method: data.interactionType,
      touch_friendly: data.touchOptimized,
    });
  };

  return (
    <>
      <Img src="shapes.png" alt="Shapes" useMap="#shapesmap" />
      <Map name="shapesmap">
        <Area 
          shape="circle" 
          coords="50,50,40" 
          href="circle.htm" 
          alt="Circle"
          analyticsId="circle-area"
          onAnalytics={handleAreaClick}
        />
        <Area 
          shape="rect" 
          coords="120,10,220,90" 
          href="rectangle.htm" 
          alt="Rectangle"
          analyticsId="rectangle-area"
          onAnalytics={handleAreaClick}
        />
      </Map>
    </>
  );
}
```

### With Debug Mode and Validation

Demonstrates the debug visualization and automatic coordinate validation.

```typescript
import { Img, Map, Area } from '@guyromellemagayano/components';

function DebugValidationExample() {
  return (
    <div style={{ position: 'relative' }}>
      <Img src="workplace.jpg" alt="Workplace" useMap="#debugmap" />
      <Map name="debugmap">
        {/* Valid area with debug overlay (development only) */}
        <Area 
          shape="rect" 
          coords="34,44,270,350" 
          href="#computer" 
          alt="Computer" 
          debug 
          validateCoords 
        />
        
        {/* Invalid coordinates - will show warning in console and red outline */}
        <Area 
          shape="rect" 
          coords="invalid,coords,here" 
          href="#invalid" 
          alt="Invalid Area" 
          debug 
        />
        
        {/* Small touch target - will show orange outline warning */}
        <Area 
          shape="circle" 
          coords="400,300,10" 
          href="#small" 
          alt="Too Small for Touch" 
          minTouchTarget={44}
        />
      </Map>
    </div>
  );
}
```

### Touch Validation Example

Demonstrates touch optimization checking and validation.

```typescript
import { Img, Map, Area, AreaUtils } from '@guyromellemagayano/components';

function TouchValidationExample() {
  // Check touch optimization programmatically
  const isOptimized = AreaUtils.checkTouchOptimization('rect', '0,0,50,50', 44);
  
  // Expand area to meet touch requirements
  const expandedCoords = AreaUtils.expandForTouch('rect', '0,0,20,20', 44);

  return (
    <>
      <Img src="mobile-map.png" alt="Mobile Friendly Map" useMap="#touchmap" />
      <Map name="touchmap">
        <Area 
          shape="rect" 
          coords={expandedCoords} // Uses expanded coordinates
          href="#expanded" 
          alt="Touch Optimized Area"
          minTouchTarget={44}
        />
        
        <Area 
          shape="circle" 
          coords="200,200,30" // 60px diameter - good for touch
          href="#good-touch" 
          alt="Touch Friendly Circle"
        />
      </Map>
      
      {!isOptimized && (
        <p>Warning: Some areas may be too small for comfortable touch interaction.</p>
      )}
    </>
  );
}
```

### Using Utility Functions

Demonstrates programmatic coordinate generation and validation.

```typescript
import { Img, Map, Area, AreaUtils } from '@guyromellemagayano/components';

function UtilityFunctionsExample() {
  // Generate coordinates programmatically
  const rectCoords = AreaUtils.createRectCoords(10, 10, 100, 60);
  const circleCoords = AreaUtils.createCircleCoords(200, 200, 30);
  
  // Calculate geometric properties
  const rectArea = AreaUtils.calculateAreaSize('rect', rectCoords);
  const circleCenter = AreaUtils.calculateCenterPoint('circle', circleCoords);
  
  // Validate coordinates
  const isValidRect = AreaUtils.validateCoordinates('rect', rectCoords);
  
  return (
    <>
      <Img src="generated-map.png" alt="Generated Map" useMap="#generatedmap" />
      <Map name="generatedmap">
        <Area 
          shape="rect" 
          coords={rectCoords} 
          href="#rect" 
          alt={`Rectangle (${rectArea}px²)`}
        />
        
        <Area 
          shape="circle" 
          coords={circleCoords} 
          href="#circle" 
          alt={`Circle centered at (${circleCenter?.x}, ${circleCenter?.y})`}
        />
      </Map>
      
      <div>
        <p>Rectangle area: {rectArea}px²</p>
        <p>Circle center: ({circleCenter?.x}, {circleCenter?.y})</p>
        <p>Rectangle valid: {isValidRect ? 'Yes' : 'No'}</p>
      </div>
    </>
  );
}
```

### Polymorphic Rendering

Shows how to use the `as` prop to render as a different element (with semantic warnings).

```typescript
import { Area } from '@guyromellemagayano/components';
import React from 'react';

function PolymorphicAreaExample() {
  const CustomDiv = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} className="custom-area-wrapper" />
  ));

  return (
    <Area as={CustomDiv} 
      coords="10,10,20,20" 
      shape="rect" 
      alt="Wrapped area" 
      style={{ border: '1px solid red' }}
    >
      This content will appear inside the div.
    </Area>
  );
}
```

### Client-Side Rendering

Demonstrates client-side rendering with dynamic coordinates.

```typescript
import { Area, Img, Map } from '@guyromellemagayano/components';
import React, { useState, useEffect } from 'react';

function ClientAreaExample() {
  const [coords, setCoords] = useState("0,0,50,50");

  useEffect(() => {
    const interval = setInterval(() => {
      const newCoords = `${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 100)},${Math.floor(Math.random() * 50) + 50},${Math.floor(Math.random() * 50) + 50}`;
      setCoords(newCoords);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Img src="dynamic-map.png" alt="Dynamic Map" useMap="#dynamicmap" />
      <Map name="dynamicmap">
        <Area 
          isClient 
          isMemoized 
          shape="rect" 
          coords={coords}
          href="#dynamic"
          alt="Dynamic Area"
        />
      </Map>
    </>
  );
}
```

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices, particularly important for image maps:

- **Semantic HTML**: Utilizes the native `<area>` element, which intrinsically defines interactive regions within an image map for assistive technologies.
- **Alternative Text (`alt`)**: The `alt` prop is required and crucial for screen readers, providing a textual description of the area's purpose or destination.
- **Keyboard Navigation**: Interactive areas within the image map are fully navigable via keyboard, supporting `Tab` key for focus and `Enter`/`Space` for activation.
- **Touch Target Validation**: Automatically checks if the defined area meets WCAG minimum touch target size (44px by default) with visual indicators for non-compliant areas.
- **Focus Management**: Comprehensive focus management with `focusable`, `priority`, and `tabIndex` control for optimal screen reader experience.
- **Screen Reader Support**: Provides appropriate context with automatic `aria-label`, `aria-describedby`, and coordinate information.
- **High Contrast**: Enhanced outline support for high contrast mode with 3px borders.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences.

### ARIA Attributes

Relevant ARIA attributes are automatically applied:

- `aria-label`: Automatically set to `alt` text or overridden with `ariaLabel` prop.
- `aria-disabled`: Automatically set to `true` when the `disabled` prop is `true`.
- `aria-describedby`: Automatically links to coordinate information when coordinates are provided.
- `tabIndex`: Intelligently managed based on `focusable`, `priority`, and `disabled` props.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.area` : The base class for the `Area` component with cursor pointer and focus styles.
- `.area__debug-overlay`: Visual debugging overlay shown in development mode.
- `.area__debug-info`: Text information within the debug overlay.

### Modifiers

- `.area--disabled`: Applied when the `disabled` prop is `true`, with `pointer-events: none`.
- `.area--debug`: Applied when the `debug` prop is `true`.
- `.area--small-touch-target`: Applied when the area doesn't meet `minTouchTarget` size requirements.

### Data Attribute Styling

- `[data-touch-optimized="false"]`: Orange dashed outline for touch-unfriendly areas.
- `[data-valid-coords="false"]`: Red dashed outline for invalid coordinates.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop.
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties.
4. **CSS Modules**: Integrate with CSS Modules for scoped styling.

### CSS Variables

The component provides CSS variables for customization:

```css
:root {
  --area-focus-color: #0066cc;
}

.area:focus {
  outline: 2px solid var(--area-focus-color);
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .area:focus {
    outline: 3px solid currentColor;
    outline-offset: 1px;
  }
}
```

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- `index.test.tsx`: Contains main component tests and AreaUtils function tests.
- `utils.test.tsx`: Dedicated tests for utility functions.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Rendering**: Verifies basic rendering, prop application, and correct DOM output.
- **Shape Support**: Tests all shape types (rect, circle, poly, default) with various coordinate formats.
- **Validation**: Tests coordinate validation for all shapes with valid and invalid inputs.
- **Touch Optimization**: Tests touch target size validation and warnings.
- **Interactions**: Tests user interactions including mouse, keyboard, and touch events.
- **Analytics**: Validates comprehensive analytics data including geometric calculations and interaction types.
- **Accessibility**: Ensures proper ARIA attributes, focus management, and screen reader compatibility.
- **Utility Functions**: Comprehensive tests for all AreaUtils functions including edge cases.
- **Debug Mode**: Tests debug overlay rendering and validation warnings.
- **Error Handling**: Tests graceful handling of invalid coordinates and analytics failures.

### Running Tests

To execute tests for the `Area` component:

```bash
# Run all tests for the Area component
pnpm test src/area/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
```

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Efficient Calculations**: Geometric calculations are memoized and only computed when coordinates change.
- **Conditional Features**: Debug overlays, validation, and analytics are only active when explicitly enabled.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand.
- **Memory Management**: Event handlers are optimized with useCallback to prevent unnecessary re-renders.
- **Bundle Splitting**: Server-side and client-side code are naturally separated.
- **Tree Shaking**: Unused AreaUtils functions are eliminated in production builds.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile with touch-specific validation.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.
- **Image Maps**: Full support for native HTML image map functionality across all browsers.

## 📘 TypeScript

Full TypeScript support is provided with comprehensive type safety:

```typescript
import { 
  Area, 
  AreaUtils,
  type AreaProps, 
  type AreaRef, 
  type AreaAnalyticsData,
  type AreaShape,
  type RectCoords,
  type CircleCoords 
} from '@guyromellemagayano/components';
import React, { useRef } from 'react';

function TypeSafeImageMap() {
  const areaRef = useRef<AreaRef>(null);

  const handleAnalytics = (data: AreaAnalyticsData) => {
    // TypeScript ensures all properties are available
    console.log(`Area ${data.label}: ${data.areaSize}px², touch-optimized: ${data.touchOptimized}`);
  };

  // Type-safe coordinate generation
  const rectCoords: RectCoords = AreaUtils.createRectCoords(0, 0, 100, 100);
  const circleCoords: CircleCoords = AreaUtils.createCircleCoords(50, 50, 25);

  return (
    <>
      <img src="map.png" useMap="#typemap" alt="Type-safe map" />
      <map name="typemap">
        <Area 
          ref={areaRef}
          shape="rect" 
          coords={rectCoords}
          href="#example"
          alt="Type-safe Rectangle"
          onAnalytics={handleAnalytics}
          minTouchTarget={44}
          debug
        />
        <Area 
          shape="circle" 
          coords={circleCoords}
          href="#circle"
          alt="Type-safe Circle"
          priority="high"
        />
      </map>
    </>
  );
}

// Utility function usage with full type safety
const validation = AreaUtils.validateCoordinates('rect', '0,0,100,100');
const areaSize = AreaUtils.calculateAreaSize('circle', '50,50,25');
const centerPoint = AreaUtils.calculateCenterPoint('poly', '0,0,50,25,100,0');
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version to this `Area` component:

1. **Import Changes**: Update to `import { Area, AreaUtils } from '@guyromellemagayano/components';`.
2. **Analytics Migration**: Update to use the new `AreaAnalyticsData` interface for richer analytics.
3. **Validation**: Enable automatic coordinate validation with `validateCoords={true}`.
4. **Touch Optimization**: Review areas with the new touch target validation.
5. **Utility Functions**: Migrate to use `AreaUtils` for coordinate manipulation.

### Breaking Changes

- Analytics interface changed to `AreaAnalyticsData` with additional geometric properties
- Debug mode now requires explicit `debug={true}` prop
- Coordinate validation is now enabled by default

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Area` component:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md).
2. **Test Utilities**: Include tests for any new AreaUtils functions.
3. **Update Documentation**: Keep coordinate format documentation current.
4. **Accessibility Focus**: Prioritize image map accessibility and touch optimization.
5. **Performance**: Ensure geometric calculations remain efficient.

## 🔗 Related Components

- [Map](../map/README.md)
- [Img](../img/README.md)
