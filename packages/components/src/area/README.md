<!-- markdownlint-disable line-length -->
# Area Component

A polymorphic and accessible wrapper for the HTML `<area>` element, specifically designed for defining clickable regions within an image map. This component ensures high performance and adheres to strict accessibility standards for interactive image maps.

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

The `Area` component provides a flexible, accessible HTML `<area>` element, exclusively used within `<map>` elements to define clickable regions in an image map. It ensures that interactive areas of an image are semantically correct and accessible, while maintaining high performance.

### Key Features

- **Semantic Markup**: Utilizes the native `<area>` HTML element for proper semantic meaning within image maps.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components (with appropriate warnings if semantic meaning is lost).
- **Comprehensive Event Handling**: Robust handling of various user events specific to interactive map areas.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards for interactive image maps.

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

```tsx
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
| `onAnalytics` | `(data: { event: string; category: string; label: string; content: string; }) => void` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| `[key: data-${string}]` | `string \| undefined` | - | Supports arbitrary `data-*` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the `Area` component and are essential for defining image map regions.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alt` | `string` | - | A short, descriptive alternative text for the area, crucial for accessibility. |
| `coords` | `string` | - | A set of comma-separated coordinates defining the shape of the area. Format varies by `shape`. |
| `shape` | `"rect" \| "circle" \| "poly" \| "default"` | `"rect"` | The shape of the area. |
| `href` | `string` | - | The URL that the hyperlink points to when the area is clicked. |
| `target` | `string` | `"_self"` | Specifies where to open the linked document (e.g., `_blank`, `_self`, `_parent`, `_top`). |
| `download` | `string` \| `boolean` | `false` | Specifies that the target will be downloaded when a user clicks on the hyperlink. |
| `hreflang` | `string` | - | Specifies the language of the linked document. |
| `ping` | `string` | - | A space-separated list of URLs to which, when the hyperlink is followed, `POST` requests will be sent. |
| `rel` | `string` | - | Specifies the relationship between the current document and the linked document. |
| `referrerpolicy` | `string` | - | How much referrer information to send with the link. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the `Area` component within an image map.

```tsx
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

### With Custom Styling

Applies custom CSS classes and inline styles to the `Area` component (though direct visual styling of `<area>` elements is limited).

```tsx
import { Img, Map, Area } from '@guyromellemagayano/components';

function StyledAreaExample() {
  return (
    <>
      <Img src="planets.gif" alt="Planets" useMap="#styledmap" />
      <Map name="styledmap">
        <Area 
          shape="rect" 
          coords="0,0,82,126" 
          href="sun.htm" 
          alt="Sun"
          className="outline-blue-500 outline-2 outline-dashed"
          style={{ opacity: 0.8 }}
        />
      </Map>
    </>
  );
}
```

### With Analytics

Integrates analytics tracking for clicks on `Area` components within an image map.

```tsx
import { Img, Map, Area } from '@guyromellemagayano/components';

function AnalyticsAreaExample() {
  const handleAreaClick = (data) => {
    console.log('Area click analytics:', data);
    // Example: trackEvent(data.event, data.category, data.label, data.content);
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

### Polymorphic Rendering

Shows how to use the `as` prop to render an `Area` component as a different HTML element. Note: Semantic meaning and functionality will be lost if rendered as a non-`<area>` element without a `<map>` parent.

```tsx
import { Area } from '@guyromellemagayano/components/area';
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

Demonstrates usage of the `Area` component with client-side rendering and optional memoization. This is typically less common for `<area>` elements as they are declarative.

```tsx
import { Area, Img, Map } from '@guyromellemagayano/components';
import React, { useState, useEffect } from 'react';

function ClientAreaExample() {
  const [coords, setCoords] = useState("0,0,50,50");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate dynamic coordinates for a client-side Area (uncommon but possible)
      const newCoords = `
        ${Math.floor(Math.random() * 100)},
        ${Math.floor(Math.random() * 100)},
        ${Math.floor(Math.random() * 50) + 50},
        ${Math.floor(Math.random() * 50) + 50}
      `.replace(/\s/g, ''); // Remove whitespace
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
- **Alternative Text (`alt`)**: The `alt` prop is crucial for screen readers, providing a textual description of the area's purpose or destination. This is enforced and highlighted.
- **Keyboard Navigation**: Interactive areas within the image map are fully navigable via keyboard, supporting `Tab` key for focus and `Enter` for activation.
- **Focus Management**: Ensures logical focus order and visible focus indicators for each defined area.
- **Screen Reader Support**: Provides appropriate context for screen reader users by correctly associating areas with their `alt` text and `href` destinations.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's `prefers-reduced-motion` preferences to disable unnecessary animations.

### ARIA Attributes

Relevant ARIA attributes are applied to enhance accessibility where needed:

- `role`: Typically not needed when using the native `<area>` element within a `<map>`, as its semantic role is inherent. Can be applied if the `as` prop changes the element type and a specific semantic role is required.
- `aria-label`: Can provide an accessible name for the interactive area if its visible context is not sufficiently descriptive. Often redundant if `alt` is well-defined for `<area>`.
- `aria-describedby`: Links to descriptive text elsewhere on the page for additional context, useful for more complex interactive map areas.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- `.area` : The base class for the `Area` component, defining its fundamental styles. Note: Direct visual styling of `<area>` elements is generally limited, as they are not visually rendered elements themselves but define interactive regions.

### Modifiers

- `.area--[modifier-name]` : Used for variations in state or appearance (e.g., `.area--active`, `.area--selected`).
- `.area__[element-name]` : Used for elements within the `Area` component (less common for `<area>` itself).

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the `className` prop. Note: The visual effect of classes on `<area>` is usually indirect (e.g., affecting the parent `<map>` or highlighting through JavaScript).
2. **Inline Styles**: Apply component-specific styling directly using the `style` prop (visual impact is limited).
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

```css
.area {
  --area-outline-color: var(--color-primary, blue);
  --area-outline-style: dashed;
  --area-outline-width: 2px;
  /* These are more conceptual, as `<area>` is not a visual element */
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
- **Interactions**: Tests user interactions (clicks, hovers) and event handling for interactive areas.
- **Accessibility**: Ensures `alt` attribute presence, keyboard navigation, and screen reader compatibility.
- **Analytics**: Validates analytics tracking and custom analytics functions for area clicks.
- **Polymorphic**: Confirms correct rendering when used with the `as` prop for different elements or custom components (with expected warnings for semantic misuse).
- **Edge Cases**: Covers error states, boundary conditions (e.g., invalid `coords`), and invalid inputs.

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

- **Memoization**: Utilizes `React.memo` for its client-side components (`MemoizedAreaClient`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing a seamless experience for interactive images.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

```tsx
import { Area, type AreaProps, type AreaRef } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

function MyImageMapWithRefs() {
  const areaRef = useRef<AreaRef>(null);

  const handleAreaClick = () => {
    if (areaRef.current) {
      console.log('Area clicked:', areaRef.current);
    }
  };

  return (
    <img src="map.png" useMap="#mapref" alt="Example map" />
    <map name="mapref">
      <Area 
        ref={areaRef}
        shape="rect" 
        coords="0,0,100,100" 
        href="#example"
        alt="Example Area"
        onClick={handleAreaClick}
      />
    </map>
  );
}
```

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this `Area` component, please follow these steps:

1. **Import Changes**: Update your import statements to `import { Area } from '@guyromellemagayano/components/area';`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API, especially `coords` and `shape`.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (`.area`, `.area--modifier`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.

### Breaking Changes

(List any breaking changes from previous versions here, e.g., `Prop X removed`, `Behavior Y changed`)

## 🤝 Contributing

### Contribution Guidelines

When contributing to the `Area` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's `README.md` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance, especially for image map interaction and `alt` text.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.

## 🔗 Related Components

- [Map](../map/README.md)
- [Img](../img/README.md)
