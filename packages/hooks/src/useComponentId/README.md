<!-- markdownlint-disable MD051 -->
# `useComponentId` Hook

A React hook for automatic component ID generation and debug logging. This hook provides stable, unique IDs for React components and integrates with the project's logging system for development debugging.

## 📋 Table of Contents

- [🎯 Overview](#overview)
- [📦 Installation](#installation)
- [🚀 Quick Start](#quick-start)
- [🔧 API Reference](#api-reference)
- [💡 Examples](#examples)
- [✅ Best Practices](#best-practices)
- [🔍 Troubleshooting](#troubleshooting)
- [🔗 Related Utilities](#related-utilities)
- [🧪 Testing](#testing)
- [📈 Migration Guide](#migration-guide)
- [🚀 Future Enhancements](#future-enhancements)

<a id="overview"></a>

## 🎯 Overview

The `useComponentId` hook solves common problems in React component development:

### ✨ Key Features

- **🆔 Automatic ID Generation**: Provides stable, unique IDs for components
- **🐛 Debug Logging**: Optional logging for development debugging
- **🔍 Component Name Detection**: Automatically detects component names from call stack
- **🛡️ Cross-Environment Safety**: Works safely in both development and production
- **📝 TypeScript Support**: Full type safety with proper interfaces

### 🎯 Use Cases

- **Form Components**: Generate unique IDs for form fields and validation
- **Modal Dialogs**: Create accessible modal components with proper ARIA attributes
- **Data Tables**: Generate row and cell IDs for complex data structures
- **Debug Components**: Add debug information to components during development

<a id="installation"></a>

## 📦 Installation

The hook is part of the `@guyromellemagayano/hooks` package:

```bash
npm install @guyromellemagayano/hooks
```

<a id="quick-start"></a>

## 🚀 Quick Start

### Basic Usage

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";
import { Div } from "@guyromellemagayano/components";

function MyComponent() {
  const { id } = useComponentId();
  
  return <Div data-component-id={id}>Content</Div>;
}
```

### With Debug Mode

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";
import { Div } from "@guyromellemagayano/components";

function MyComponent({ _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    debugMode: _debugMode,
  });
  
  return (
    <Div 
      {...props}
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
    >
      {props.children}
    </Div>
  );
}
```

### Custom ID Override

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";
import { Div } from "@guyromellemagayano/components";

function MyComponent({ _internalId, ...props }) {
  const { id } = useComponentId({
    internalId: _internalId,
  });
  
  return <Div data-component-id={id}>{props.children}</Div>;
}
```

<a id="api-reference"></a>

## 🔧 API Reference

### `useComponentId(options?)`

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `options` | `UseComponentIdOptions` | ❌ | `{}` | Configuration options |

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | The component ID (custom or auto-generated) |
| `isDebugMode` | `boolean` | Whether debug mode is active |

### Type Definitions

```typescript
interface UseComponentIdOptions {
  /** Override the auto-generated ID with a custom one */
  internalId?: string;
  /** Enable debug logging (only active in development) */
  debugMode?: boolean;
}

interface UseComponentIdReturn {
  /** The component ID (custom or auto-generated) */
  id: string;
  /** Whether debug mode is active */
  isDebugMode: boolean;
}
```

<a id="examples"></a>

## 💡 Examples

### Form Component with Validation

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";
import { Form, Div, Button } from "@guyromellemagayano/components";
import { logInfo } from "@guyromellemagayano/logger";

function ContactForm({ _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    debugMode: _debugMode,
  });
  
  const handleSubmit = (event) => {
    if (isDebugMode) {
      logInfo(`Form ${id} submitted`);
    }
    // Form submission logic
  };
  
  return (
    <Form 
      {...props}
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      onSubmit={handleSubmit}
    >
      <Div>
        <label htmlFor={`${id}-name`}>Name:</label>
        <input id={`${id}-name`} name="name" />
      </Div>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Modal Component with Accessibility

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";
import { Div, Heading, Button } from "@guyromellemagayano/components";

function Modal({ _internalId, title, children, onClose, ...props }) {
  const { id } = useComponentId({
    internalId: _internalId,
  });
  
  return (
    <Div 
      {...props}
      role="dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-content`}
      aria-modal="true"
      data-component-id={id}
    >
      <Heading as="h2" id={`${id}-title`}>{title}</Heading>
      <Div id={`${id}-content`}>{children}</Div>
      <Button 
        onClick={onClose}
        aria-label="Close modal"
      >
        Close
      </Button>
    </Div>
  );
}
```

### Data Table with Row IDs

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";
import { Table, Tbody, Div } from "@guyromellemagayano/components";

function DataTable({ _debugMode, data, ...props }) {
  const { id, isDebugMode } = useComponentId({
    debugMode: _debugMode,
  });
  
  return (
    <Table 
      {...props}
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
    >
      <Tbody>
        {data.map((row, index) => (
          <TableRow 
            key={`${id}-row-${index}`}
            data={row}
            rowId={`${id}-row-${index}`}
          />
        ))}
      </Tbody>
    </Table>
  );
}

function TableRow({ data, rowId }) {
  const { id } = useComponentId();
  
  return (
    <Div data-component-id={id} data-row-id={rowId}>
      {/* Row content */}
    </Div>
  );
}
```

### Combined with `setDisplayName`

```typescript
import { useComponentId, setDisplayName } from "@guyromellemagayano/hooks";
import { Div } from "@guyromellemagayano/components";

const MyComponent = setDisplayName(
  React.forwardRef(function MyComponent({ _internalId, _debugMode, ...props }, ref) {
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });
    
    return (
      <Div 
        {...props}
        ref={ref}
        data-component-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
      >
        {props.children}
      </Div>
    );
  })
);
```

<a id="best-practices"></a>

## ✅ Best Practices

### 1. Hook Rules Compliance

Always follow React's rules of hooks:

```typescript
// ✅ Correct - Hook at top level
function MyComponent() {
  const { id } = useComponentId();
  // Component logic
}

// ❌ Incorrect - Hook inside conditional
function MyComponent({ showDebug }) {
  if (showDebug) {
    const { id } = useComponentId(); // This violates hook rules
  }
}
```

### 2. Consistent Naming Convention

Use consistent naming for internal props:

```typescript
// ✅ Recommended - Use underscore prefix for internal props
function MyComponent({ _internalId, _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });
}

// ✅ Alternative - Use camelCase for public props
function MyComponent({ componentId, debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: componentId,
    debugMode: debugMode,
  });
}
```

### 3. Debug Mode Usage

Use debug mode responsibly:

```typescript
// ✅ Good - Debug mode only in development
const { id, isDebugMode } = useComponentId({
  debugMode: process.env.NODE_ENV === "development",
});

// ✅ Better - Use environment-aware defaults
const { id, isDebugMode } = useComponentId({
  debugMode: _debugMode && process.env.NODE_ENV === "development",
});
```

### 4. ID Generation Strategy

Choose the right ID strategy for your use case:

```typescript
// ✅ Stable IDs for persistent elements
const { id } = useComponentId();

// ✅ Custom IDs for user-provided identifiers
const { id } = useComponentId({
  internalId: props.userProvidedId,
});

// ✅ Fallback strategy
const { id } = useComponentId({
  internalId: props.id || `auto-${Date.now()}`,
});
```

<a id="troubleshooting"></a>

## 🔍 Troubleshooting

### Common Issues

#### Hook Called Conditionally

**Problem:**

```typescript
// ❌ This will cause errors
function MyComponent({ showDebug }) {
  if (showDebug) {
    const { id } = useComponentId();
  }
}
```

**Solution:**

```typescript
// ✅ Always call the hook
function MyComponent({ showDebug }) {
  const { id, isDebugMode } = useComponentId({
    debugMode: showDebug,
  });
}
```

#### Debug Logging Not Working

**Problem:** Debug logs don't appear in development.

**Solution:**

```typescript
// ✅ Ensure NODE_ENV is set correctly
const { id, isDebugMode } = useComponentId({
  debugMode: true, // Will only log if NODE_ENV === "development"
});
```

#### Component Name Detection Issues

**Problem:** Component names are detected as "Component".

**Solution:**

```typescript
// ✅ Use named function components
export const MyComponent = () => {
  const { id } = useComponentId();
  return <div data-component-id={id}>Content</div>;
};

// ✅ Or use setDisplayName utility
export const MyComponent = setDisplayName(
  React.forwardRef(function MyComponent(props, ref) {
    const { id } = useComponentId();
    return <div ref={ref} data-component-id={id}>Content</div>;
  })
);
```

### Performance Considerations

- **Stable IDs**: The hook uses React's `useId()` for stable ID generation
- **Conditional Logging**: Debug logging only occurs in development
- **Minimal Overhead**: The hook is lightweight and optimized
- **Memoization**: Consider memoizing components that use the hook frequently

<a id="related-utilities"></a>

## 🔗 Related Utilities

### setDisplayName

Automatically sets `displayName` for React components:

```typescript
import { setDisplayName } from "@guyromellemagayano/hooks";
import { Div } from "@guyromellemagayano/components";

const MyComponent = setDisplayName(
  React.forwardRef(function MyComponent(props, ref) {
    const { id } = useComponentId();
    return <Div ref={ref} data-component-id={id}>Content</Div>;
  })
);
```

### Logger Integration

The hook integrates with `@guyromellemagayano/logger`:

```typescript
// Debug logs are sent to the logger when debug mode is enabled
// Format: "ComponentName rendered with ID: component-id"
```

<a id="testing"></a>

## 🧪 Testing

The hook includes comprehensive tests covering:

- ID generation with and without custom IDs
- Debug mode functionality
- Component name detection
- Edge cases and error handling

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

<a id="migration-guide"></a>

## 📈 Migration Guide

### From Manual ID Generation

**Before:**

```typescript
import { logInfo } from "@guyromellemagayano/logger";
import { Div } from "@guyromellemagayano/components";

function MyComponent({ id, debugMode, ...props }) {
  const componentId = id || useId();
  const isDebug = debugMode && process.env.NODE_ENV === "development";
  
  if (isDebug) {
    logInfo(`MyComponent rendered with ID: ${componentId}`);
  }
  
  return <Div data-id={componentId}>{props.children}</Div>;
}
```

**After:**

```typescript
import { Div } from "@guyromellemagayano/components";

function MyComponent({ _internalId, _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });
  
  return (
    <Div 
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
    >
      {props.children}
    </Div>
  );
}
```

<a id="future-enhancements"></a>

## 🚀 Future Enhancements

Potential future improvements:

- **ID Collision Detection**: Warn about duplicate IDs
- **Performance Metrics**: Track component render performance
- **Custom Logging**: Allow custom log formats
- **ID Persistence**: Persist IDs across page reloads
- **Analytics Integration**: Send usage analytics

---

For more information, see the [main hooks package documentation](../README.md).
