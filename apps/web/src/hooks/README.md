<!-- markdownlint-disable line-length -->
# Shared Hooks

A collection of reusable React hooks that provide common functionality across components.

## 📁 File Structure

```bash
hooks/
├── useComponentId.ts   # Component ID generation and debug logging
├── index.ts           # Hook exports
└── README.md          # This documentation
```

## 🏗️ Architecture

These hooks follow our established standards with inline types and proper TypeScript patterns.

### Why Shared Hooks?

- **Code Reusability**: Eliminate duplicate logic across components
- **Consistency**: Ensure all components follow the same patterns
- **Maintainability**: Single source of truth for common functionality
- **Testing**: Easier to test shared logic in isolation
- **Performance**: Optimized implementations used everywhere

## 🚀 Available Hooks

### `useComponentId`

A shared hook for component ID generation and debug logging.

#### Features

- **ID Generation**: Uses `useId()` with fallback to provided internal ID
- **Debug Logging**: Cross-environment safe debug logging
- **Auto Component Detection**: Automatically detects component name from export const declaration
- **Hook Rules Compliance**: Always calls hooks at the top level
- **Type Safety**: Full TypeScript support with proper type inference

#### Usage

```typescript
import { useComponentId } from '@web/hooks'

function MyComponent({ _internalId, _debugMode, ...props }) {
  // Component name will be auto-detected from export const declaration
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
  });

  return (
    <div 
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      {...props}
    >
      {/* Component content */}
    </div>
  );
}

// Component name is always auto-detected from export const declaration
function CustomComponent({ _internalId, _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
    // componentName is automatically detected from "CustomComponent" export
  });

  return <div data-component-id={id} {...props} />;
}
```

#### API

```typescript
interface UseComponentIdOptions {
  internalId?: string;      // Optional custom ID override
  debugMode?: boolean;      // Enable debug logging
}

interface UseComponentIdReturn {
  id: string;               // Generated or provided ID
  isDebugMode: boolean;     // Whether debug mode is active
}
```

#### Implementation Details

```typescript
export function useComponentId({
  internalId,
  debugMode = false,
}: UseComponentIdOptions = {}): UseComponentIdReturn {
  // Always call hooks at the top level
  const generatedId = useId();
  const id = internalId || generatedId;

  // Auto-detect component name from export const declaration
  const detectedComponentName = getComponentNameFromStack();

  // Cross-environment safety for debug logging
  const isDebugMode = debugMode && globalThis?.process?.env?.NODE_ENV === "development";

  // Internal debug logging
  if (isDebugMode) {
    logInfo(`${detectedComponentName} rendered with ID: ${id}`);
  }

  return {
    id,
    isDebugMode,
  };
}

// Auto-detection function that extracts component name from call stack
function getComponentNameFromStack(): string {
  // Implementation details for automatic component name detection
  // Extracts the actual export const component name, not displayName
  // Falls back to "Component" if unable to detect
}
```

## 📖 Usage Patterns

### Basic Component Integration

```typescript
// Before: Duplicate logic in every component
function Component({ _internalId, _debugMode, ...props }) {
  const generatedId = useId();
  const id = _internalId || generatedId;
  
  if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
    logInfo(`Component rendered with ID: ${id}`);
  }
  
  return <div data-id={id} {...props} />;
}

// After: Clean, reusable hook with auto-detected component name
function Component({ _internalId, _debugMode, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
    // Component name "Component" is automatically detected
  });
  
  return (
    <div 
      data-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      {...props} 
    />
  );
}
```

### Advanced Usage

```typescript
// Custom component with multiple hooks
function ComplexComponent({ _internalId, _debugMode, children, ...props }) {
  const { id, isDebugMode } = useComponentId({
    internalId: _internalId,
    debugMode: _debugMode,
    // Component name "ComplexComponent" is automatically detected
  });

  // Early return pattern
  if (!children) return null;

  return (
    <section
      id={id}
      data-component-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      aria-labelledby={id}
      {...props}
    >
      {children}
    </section>
  );
}
```

## 🔒 Security & Type Safety

### Type Organization

These hooks follow the **inline types pattern**:

- **Inline Types**: All types defined within hook files
- **Type Imports**: Import types directly from React
- **Controlled Exports**: Only hooks are exported, not types
- **Type Inference**: Supports `typeof` and `React.ComponentProps` for prop types

### Security Benefits

- **API Surface Reduction**: Minimal exposed interfaces
- **Information Hiding**: Internal implementation details protected
- **Type Safety**: Compile-time error prevention
- **Controlled Access**: Only necessary hooks exported

## 🧪 Testing

Comprehensive test coverage should include:

- **Hook Rules Compliance**: All hooks called at top level
- **ID Generation**: Proper ID generation and fallback logic
- **Debug Logging**: Debug mode works correctly in development
- **Cross-Environment Safety**: Works in browser and Node.js
- **Type Safety**: Proper TypeScript types and inference
- **Integration**: Hooks work correctly with components

### Example Test

```typescript
import { renderHook } from '@testing-library/react'
import { useComponentId } from '@web/hooks'

describe('useComponentId', () => {
  it('generates unique IDs', () => {
    const { result: result1 } = renderHook(() => useComponentId())
    const { result: result2 } = renderHook(() => useComponentId())
    
    expect(result1.current.id).not.toBe(result2.current.id)
  })

  it('uses provided internal ID', () => {
    const { result } = renderHook(() => 
      useComponentId({ internalId: 'custom-id' })
    )
    
    expect(result.current.id).toBe('custom-id')
  })

  it('enables debug mode in development', () => {
    const { result } = renderHook(() => 
      useComponentId({ debugMode: true, componentName: 'Test' })
    )
    
    expect(result.current.isDebugMode).toBe(process.env.NODE_ENV === 'development')
  })
})
```

## 📋 Compliance

These hooks are fully compliant with our development standards:

- ✅ **Hook Rules**: All hooks called at top level
- ✅ **Inline Types**: All types defined within hook files
- ✅ **Named Functions**: Explicit function names for debugging
- ✅ **Type Safety**: Full TypeScript support with proper type inference
- ✅ **Security Principles**: Controlled exports, minimal API surface
- ✅ **Cross-Environment Safety**: Works in all environments
- ✅ **Documentation**: **JSDoc** comments and README documentation

## 🔄 Migration Guide

### Migrating Existing Components

1. **Import the hook**:

   ```typescript
   import { useComponentId } from '@web/hooks'
   ```

2. **Replace manual ID logic**:

```typescript
// Before
const generatedId = useId();
const id = _internalId || generatedId;
if (_debugMode && globalThis?.process?.env?.NODE_ENV === "development") {
  logInfo(`Component rendered with ID: ${id}`);
}

// After
const { id, isDebugMode } = useComponentId({
  internalId: _internalId,
  debugMode: _debugMode,
  // Component name is automatically detected
});
```

3. **Update data attributes**:

   ```typescript
   // Before
   data-debug-mode={_debugMode ? "true" : undefined}

   // After
   data-debug-mode={isDebugMode ? "true" : undefined}
   ```

## 📚 Related Documentation

- [Development Optimization Guide](../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Standards](../../../../docs/components/COMPONENT_STANDARDS.md)
- [Testing Standards](../../../../docs/components/TESTING.md)
