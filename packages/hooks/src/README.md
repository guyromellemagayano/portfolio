# `@guyromellemagayano/hooks` Package

A collection of reusable React hooks that provide common functionality across components in the portfolio project. This package offers essential utilities for component development, debugging, and type safety.

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

<a ID="overview"></a>

## 🎯 Overview

The `@guyromellemagayano/hooks` package provides essential React hooks and utilities for modern component development:

### ✨ Key Features

- **🆔 Component ID Generation**: Automatic, stable ID generation for React components
- **🐛 Debug Logging**: Integrated debugging with the project's logging system
- **🔍 Component Name Detection**: Intelligent component name detection from call stack
- **🛡️ Cross-Environment Safety**: Works safely in both development and production
- **📝 TypeScript Support**: Full type safety with proper interfaces
- **🔧 Utility Functions**: Helper functions for common component patterns

### 🎯 Use Cases

- **Form Components**: Generate unique IDs for form fields and validation
- **Modal Dialogs**: Create accessible modal components with proper ARIA attributes
- **Data Tables**: Generate row and cell IDs for complex data structures
- **Debug Components**: Add debug information to components during development
- **Component Libraries**: Standardize component naming and identification

### 📁 File Structure

```bash
@guyromellemagayano/hooks/
├── package.json              # Package configuration and dependencies
├── src/
│   ├── index.ts              # Main export file
│   ├── useComponentId/       # Component ID generation hook
│   │   ├── index.ts          # Hook exports
│   │   ├── useComponentId.ts # Main hook implementation
│   │   ├── useComponentId.test.ts # Hook tests
│   │   └── README.md         # Hook-specific documentation
│   ├── utils/                # Utility functions
│   │   ├── index.ts          # Utility exports
│   │   └── setDisplayName.ts # Display name utility
│   └── README.md             # This documentation
└── dist/                     # Built distribution files (generated)
```

<a ID="installation"></a>

## 📦 Installation

The package is available as an npm package:

```bash
# Install as a dependency
npm install @guyromellemagayano/hooks

# Or using pnpm (recommended)
pnpm add @guyromellemagayano/hooks
```

<a ID="quick-start"></a>

## 🚀 Quick Start

### Basic Hook Usage

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

### Utility Function Usage

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

<a ID="api-reference"></a>

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

### `setDisplayName(component, functionName?)`

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `component` | `T` | ✅ | - | The React component to set displayName for |
| `functionName` | `string` | ❌ | Auto-detected | The name to assign as displayName |

**Returns:**

| Type | Description |
|------|-------------|
| `T` | The component with displayName set |

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

<a ID="examples"></a>

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
      <Div>
        <label htmlFor={`${id}-email`}>Email:</label>
        <input id={`${id}-email`} name="email" type="email" />
      </Div>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Modal Component with Accessibility

```typescript
import { useComponentId, setDisplayName } from "@guyromellemagayano/hooks";
import { Div, Heading, Button } from "@guyromellemagayano/components";

const Modal = setDisplayName(
  React.forwardRef(function Modal({ _internalId, title, children, onClose, ...props }, ref) {
    const { id } = useComponentId({
      internalId: _internalId,
    });
    
    return (
      <Div 
        {...props}
        ref={ref}
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
  })
);
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

### Component Library Pattern

```typescript
import { useComponentId, setDisplayName } from "@guyromellemagayano/hooks";
import { Div, Button } from "@guyromellemagayano/components";

const Card = setDisplayName(
  React.forwardRef(function Card({ _internalId, _debugMode, title, children, ...props }, ref) {
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
        <Div>
          <Heading as="h3">{title}</Heading>
        </Div>
        <Div>{children}</Div>
      </Div>
    );
  })
);

const CardButton = setDisplayName(
  React.forwardRef(function CardButton({ _internalId, children, ...props }, ref) {
    const { id } = useComponentId({
      internalId: _internalId,
    });
    
    return (
      <Button 
        {...props}
        ref={ref}
        data-component-id={id}
      >
        {children}
      </Button>
    );
  })
);
```

<a ID="best-practices"></a>

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

### 4. Component Naming

Use proper component naming for better debugging:

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

### 5. ID Generation Strategy

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

<a ID="troubleshooting"></a>

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

#### TypeScript Errors

**Problem:** TypeScript can't find type definitions.

**Solution:**

```typescript
// ✅ Import types explicitly
import type { UseComponentIdOptions, UseComponentIdReturn } from "@guyromellemagayano/hooks";

// ✅ Use proper type annotations
const options: UseComponentIdOptions = {
  internalId: "custom-id",
  debugMode: true,
};

const result: UseComponentIdReturn = useComponentId(options);
```

### Performance Considerations

- **Stable IDs**: The hook uses React's `useId()` for stable ID generation
- **Conditional Logging**: Debug logging only occurs in development
- **Minimal Overhead**: The hook is lightweight and optimized
- **Memoization**: Consider memoizing components that use the hook frequently

### Edge Cases & Limitations

#### Component Name Detection

The `setDisplayName` function uses call stack analysis to auto-detect component names. This works best with:

```typescript
// ✅ Works well
export const MyComponent = () => <div>Content</div>;

// ✅ Works well
export default function MyComponent() {
  return <div>Content</div>;
}

// ⚠️ May not detect correctly
const MyComponent = () => <div>Content</div>;
export { MyComponent };

// ❌ Won't detect correctly
export default () => <div>Content</div>;
```

#### Debug Mode Limitations

- Debug logging only works in development environment
- Component name detection may fall back to "Component" in complex scenarios
- Stack trace analysis has limitations in minified production builds

#### ID Generation

- React's `useId()` generates stable IDs that persist across re-renders
- Custom `internalId` takes precedence over auto-generated IDs
- IDs are unique within the React component tree

<a ID="related-utilities"></a>

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

### Custom Components

The hooks work seamlessly with the project's custom components:

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";
import { Div, Form, Button, Heading, Table, Tbody } from "@guyromellemagayano/components";

// All custom components support the hooks
function MyComponent() {
  const { id } = useComponentId();
  return <Div data-component-id={id}>Content</Div>;
}
```

<a ID="testing"></a>

## 🧪 Testing

The package includes comprehensive tests covering:

- ID generation with and without custom IDs
- Debug mode functionality
- Component name detection
- Edge cases and error handling
- TypeScript type safety

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

<a ID="migration-guide"></a>

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

### From Manual displayName Assignment

**Before:**

```typescript
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  // Implementation
});
MyComponent.displayName = "MyComponent";
```

**After:**

```typescript
const MyComponent = setDisplayName(
  React.forwardRef(function MyComponent(props, ref) {
    // Implementation
  }),
  "MyComponent"
);
```

## 🚀 Future Enhancements

Potential future improvements:

- **ID Collision Detection**: Warn about duplicate IDs
- **Performance Metrics**: Track component render performance
- **Custom Logging**: Allow custom log formats
- **ID Persistence**: Persist IDs across page reloads
- **Analytics Integration**: Send usage analytics
- **Additional Hooks**: `useLocalStorage`, `useDebounce`, `useIntersectionObserver`

## 🔒 Security

- **No sensitive data**: Hooks don't collect or expose sensitive information
- **Environment-aware**: Debug features only active in development
- **Safe defaults**: Graceful fallbacks for all edge cases

## 📦 Dependencies

- **React**: Core React hooks and types
- **@guyromellemagayano/logger**: Consistent logging across the project

---

For more information about specific hooks, see the [useComponentId documentation](./useComponentId/README.md).
