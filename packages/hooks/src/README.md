# Hooks Package

A collection of reusable React hooks that provide common functionality across components in the portfolio project.

## 📁 File Structure

```bash
packages/hooks/
├── package.json              # Package configuration and dependencies
├── src/
│   ├── index.ts              # Main export file
│   ├── useComponentId.ts     # Component ID generation and debug logging hook
│   └── README.md             # This documentation
└── dist/                     # Built distribution files (generated)
```

## 🏗️ Architecture

This package follows a **simple, focused structure** with a single source file containing all hook implementations. The package is designed to be lightweight and focused on providing essential React hooks for component development.

## 🚀 Features

- **useComponentId Hook**: Automatic component ID generation and debug logging
- **setDisplayName Utility**: Automatic displayName assignment for React components
- **TypeScript Support**: Full type safety with proper interfaces
- **Cross-Environment Safety**: Works in both development and production
- **Logger Integration**: Uses `@guyromellemagayano/logger` for consistent logging
- **Stack Trace Analysis**: Intelligent component name detection from call stack

## 📖 Usage

### useComponentId Hook

The primary hook for component ID generation and debug logging:

```typescript
import { useComponentId } from "@guyromellemagayano/hooks";

function MyComponent({ _internalId, _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  return (
    <div 
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
    >
      {props.children}
    </div>
  );
}
```

### setDisplayName Utility

Automatically sets displayName for React components:

```typescript
import { setDisplayName } from "@guyromellemagayano/hooks";

export const MyComponent = setDisplayName(
  React.forwardRef(function MyComponent(props, ref) {
    // Component implementation
  }),
  "MyComponent"
);
```

### Combined Usage

```typescript
import { useComponentId, setDisplayName } from "@guyromellemagayano/hooks";

const MyComponent = setDisplayName(
  React.forwardRef(function MyComponent(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;
    
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    return (
      <div 
        {...rest}
        ref={ref}
        data-component-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
      >
        {rest.children}
      </div>
    );
  }),
  "MyComponent"
);
```

## 🔧 API Reference

### useComponentId

**Options:**

- `internalId?: string` - Override the auto-generated ID
- `debugMode?: boolean` - Enable debug logging (default: false)

**Returns:**

- `id: string` - The component ID (custom or auto-generated)
- `isDebugMode: boolean` - Whether debug mode is active

**Features:**

- Automatically detects component name from export const declaration
- Cross-environment safety (only logs in development)
- Uses React's `useId()` for stable ID generation
- Integrates with `@guyromellemagayano/logger`

### setDisplayName

**Parameters:**

- `component: T` - The React component to set displayName for
- `functionName: string` - The name to assign as displayName

**Returns:**

- `T` - The component with displayName set

**Features:**

- Only sets displayName if not already set
- Preserves existing displayName assignments
- Type-safe with TypeScript generics

## 🎯 Use Cases

### Component ID Generation

```typescript
// Automatic ID generation
const { id } = useComponentId();
// Result: "r:0:1" (React-generated stable ID)

// Custom ID override
const { id } = useComponentId({ internalId: "my-custom-id" });
// Result: "my-custom-id"
```

### Debug Logging

```typescript
// Debug mode enabled
const { id, isDebugMode } = useComponentId({ debugMode: true });
// Logs: "MyComponent rendered with ID: r:0:1" (in development only)
```

### DisplayName Management

```typescript
// Automatic displayName assignment
const MyComponent = setDisplayName(
  React.forwardRef(function MyComponent(props, ref) {
    // Implementation
  }),
  "MyComponent"
);
// Result: MyComponent.displayName === "MyComponent"
```

## 🔄 Migration Guide

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

### From Manual ID Generation

**Before:**

```typescript
function MyComponent({ id, debugMode, ...props }) {
  const componentId = id || useId();
  const isDebug = debugMode && process.env.NODE_ENV === "development";
  
  if (isDebug) {
    console.log(`MyComponent rendered with ID: ${componentId}`);
  }
  
  return <div data-id={componentId}>{props.children}</div>;
}
```

**After:**

```typescript
function MyComponent({ _internalId, _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });
  
  return (
    <div 
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
    >
      {props.children}
    </div>
  );
}
```

## 🧪 Testing

The hooks package includes comprehensive testing:

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Installation

```bash
# Install as a dependency
npm install @guyromellemagayano/hooks

# Or using pnpm (recommended)
pnpm add @guyromellemagayano/hooks
```

## 🔗 Dependencies

- **React**: Core React hooks and types
- **@guyromellemagayano/logger**: Consistent logging across the project

## 🏷️ TypeScript

Full TypeScript support with proper type definitions:

```typescript
import type { UseComponentIdOptions, UseComponentIdReturn } from "@guyromellemagayano/hooks";

// Type-safe usage
const options: UseComponentIdOptions = {
  internalId: "custom-id",
  debugMode: true,
};

const result: UseComponentIdReturn = useComponentId(options);
```

## 🚀 Performance

- **Minimal overhead**: Hooks are lightweight and optimized
- **Stable IDs**: Uses React's `useId()` for consistent ID generation
- **Conditional logging**: Debug logging only occurs in development
- **Stack trace analysis**: Efficient component name detection

## 🔒 Security

- **No sensitive data**: Hooks don't collect or expose sensitive information
- **Environment-aware**: Debug features only active in development
- **Safe defaults**: Graceful fallbacks for all edge cases

## 📈 Future Enhancements

Potential future additions to the hooks package:

- **useLocalStorage**: Persistent state management
- **useDebounce**: Debounced value updates
- **useIntersectionObserver**: Element visibility detection
- **useMediaQuery**: Responsive design hooks
- **usePrevious**: Previous value tracking
