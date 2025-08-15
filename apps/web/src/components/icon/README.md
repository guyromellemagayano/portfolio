<!-- markdownlint-disable line-length -->
# Icon Component

A comprehensive icon component system featuring a main `Icon` component with compound sub-components for social media icons, following our established development standards.

## 📁 File Structure

```bash
icon/
├── Icon.tsx          # Main icon component with compound sub-components
├── Icon.test.tsx     # Comprehensive test suite using Vitest
├── index.ts          # Component exports
└── README.md         # This documentation
```

## 🏗️ Architecture

This component follows the **"Inline types for all components"** pattern and uses a **compound component pattern** for better organization and reusability.

### Why Inline Types?

- **Single Source of Truth**: Types and components in one file
- **Better Tree Shaking**: Only imports what's needed
- **Easier Refactoring**: Changes in one place
- **Simpler Structure**: Less files to manage
- **External Dependency Support**: Works with any external types

### Why Compound Component Pattern?

- **Clean API**: `Icon.X`, `Icon.Instagram`, etc.
- **Shared Logic**: Common functionality in main component
- **Flexible Usage**: Use main component or specific icons
- **Better Organization**: Related components grouped together

## 🚀 Features

- **Main Icon Component**: Generic SVG wrapper with shared functionality
- **Compound Sub-Components**: Individual social media icons (`Icon.X`, `Icon.Instagram`, etc.)
- **Ref Forwarding**: Supports `React.forwardRef` for proper ref handling
- **Shared Hook Integration**: Uses `useComponentId` for ID generation and debug logging
- **Accessibility**: Proper `aria-hidden` attributes handled by base components
- **Type Safe**: Full **TypeScript** support with proper type inference
- **Flexible Styling**: Accepts all standard SVG props and className

## 📖 Usage

### Main Icon Component

```typescript
import { Icon } from '@/components/icon'

function MyComponent() {
  return (
    <Icon className="w-6 h-6 text-gray-600">
      <path d="M0 0h24v24H0z" />
    </Icon>
  )
}
```

### Compound Component Usage

```typescript
import { Icon } from '@/components/icon'

function MyComponent() {
  return (
    <div className="flex space-x-4">
      <Icon.X className="w-6 h-6 text-gray-600 hover:text-blue-500" />
      <Icon.Instagram className="w-6 h-6 text-gray-600 hover:text-pink-500" />
      <Icon.LinkedIn className="w-6 h-6 text-gray-600 hover:text-blue-600" />
      <Icon.GitHub className="w-6 h-6 text-gray-600 hover:text-gray-900" />
    </div>
  )
}
```

### With Links for Social Media

```typescript
import { Icon } from '@/components/icon'

function MyComponent() {
  return (
    <div className="flex space-x-4">
      <a href="https://twitter.com/username" aria-label="Follow on X">
        <Icon.X className="w-6 h-6 hover:text-blue-500 transition-colors" />
      </a>
      <a href="https://github.com/username" aria-label="View on GitHub">
        <Icon.GitHub className="w-6 h-6 hover:text-gray-900 transition-colors" />
      </a>
    </div>
  )
}
```

### Custom Icon with Main Component

```typescript
import { Icon } from '@/components/icon'

function MyComponent() {
  return (
    <Icon 
      className="w-8 h-8 text-green-500" 
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </Icon>
  )
}
```

## 🔧 Props

### Main Icon Component Props

- `children?: ReactNode` - SVG content (paths, circles, etc.)
- `as?: Component` - Custom component to render (defaults to `Svg`)
- `className?: string` - CSS classes for styling
- `_internalId?: string` - Custom ID override for debugging
- `_debugMode?: boolean` - Enable debug logging
- `...rest` - All standard SVG attributes

### Individual Icon Props

All icon sub-components accept the same props as the main component:

- `className?: string` - CSS classes for styling
- `width?: number | string` - Icon width
- `height?: number | string` - Icon height
- `fill?: string` - Fill color
- `stroke?: string` - Stroke color
- `_internalId?: string` - Custom ID override
- `_debugMode?: boolean` - Enable debug logging
- `...rest` - All standard SVG attributes

## 🎨 Styling

The components use standard SVG elements and can be styled with:

- **Tailwind CSS classes**: `w-6 h-6 text-gray-600 hover:text-blue-500`
- **CSS modules**: Import and apply custom styles
- **Inline styles**: Direct style props
- **CSS custom properties**: Use CSS variables for theming

### Example Styling

```typescript
// Tailwind CSS
<Icon.X className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors" />

// Custom CSS
<Icon.GitHub className="social-icon social-icon--github" />

// Inline styles
<Icon.LinkedIn style={{ width: '24px', height: '24px', fill: '#0077b5' }} />
```

## 🔒 Security & Type Safety

### Type Organization

This component follows the **inline types pattern**:

- **Inline Types**: All types defined within component files
- **Type Imports**: Import types directly from React and external packages
- **Controlled Exports**: Only components are exported, not types
- **Type Inference**: Supports `typeof` and `React.ComponentProps` for prop types

### Security Benefits

- **API Surface Reduction**: Minimal exposed interfaces
- **Information Hiding**: Internal implementation details protected
- **Type Safety**: Compile-time error prevention
- **Controlled Access**: Only necessary components exported

## 🧪 Testing with Vitest

This component uses **Vitest** instead of Jest for testing. Here's why Vitest is superior for this monorepo setup:

### Why Vitest > Jest

#### 🚀 **Performance Benefits**

- **Native ESM Support**: Built for modern ES modules, no transpilation needed
- **Parallel Execution**: Tests run in parallel by default, significantly faster
- **Smart Caching**: Intelligent caching of test results and dependencies
- **Watch Mode**: Extremely fast watch mode with selective re-runs

#### 🏗️ **Monorepo Advantages**

- **Workspace Awareness**: Native understanding of monorepo structures
- **Shared Configurations**: Easy to share test configs across packages
- **Cross-Package Testing**: Test components that depend on other packages
- **Turborepo Integration**: Seamless integration with Turborepo for build optimization

#### 🔧 **Developer Experience**

- **TypeScript First**: Native TypeScript support without additional setup
- **Better Error Messages**: More informative error reporting
- **Hot Module Replacement**: Fast refresh during development
- **Composable Configurations**: Easy to extend and customize

#### 📦 **Modern Tooling**

- **Vite Integration**: Leverages Vite's fast bundling and dev server
- **ESM by Default**: No CommonJS compatibility layers needed
- **Plugin Ecosystem**: Rich ecosystem of testing plugins
- **Future-Proof**: Built for modern JavaScript standards

### Test Coverage

The test suite provides comprehensive coverage including:

- **Main Icon Component**: Rendering, ref forwarding, props handling
- **Compound Components**: All sub-components (X, Instagram, LinkedIn, GitHub)
- **Accessibility**: Proper ARIA attributes and semantic structure
- **Integration**: Real-world usage patterns with links and containers
- **Error Handling**: Graceful handling of edge cases
- **Styling**: CSS classes and inline styles application

### Test Structure

```typescript
// Example test structure
describe("Icon", () => {
  describe("Main Icon Component", () => {
    it("renders with default props", () => {
      // Test implementation
    });
    
    it("forwards ref correctly", () => {
      // Test implementation
    });
  });

  describe("X Icon Component", () => {
    it("renders X icon correctly", () => {
      // Test implementation
    });
  });
});
```

## 📋 Compliance

This component is fully compliant with our development standards:

- ✅ **React.forwardRef**: Proper ref forwarding implementation
- ✅ **Inline Types**: All types defined within component files
- ✅ **Named Functions**: Explicit function names for debugging
- ✅ **Display Name**: All components have displayName set
- ✅ **Type Safety**: Full TypeScript support with proper type inference
- ✅ **Security Principles**: Controlled exports, minimal API surface
- ✅ **Accessibility**: Proper ARIA attributes and semantic structure
- ✅ **Documentation**: **JSDoc** comments and README documentation
- ✅ **Testing**: Comprehensive test suite with Vitest
- ✅ **Shared Hooks**: Uses `useComponentId` for consistent behavior

## 🔄 Migration Notes

This component serves as a **reference implementation** for icon systems. The pattern can be extended to other icon sets by:

1. Creating individual icon components with inline types
2. Using `React.forwardRef` for proper ref handling
3. Setting `displayName` for debugging
4. Adding proper accessibility attributes
5. Using the compound component pattern for organization
6. Implementing comprehensive tests with Vitest

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Standards](../../../../../docs/components/COMPONENT_STANDARDS.md)
- [Testing Standards](../../../../../docs/components/TESTING.md)
- [Vitest Configuration](../../../../../packages/vitest-presets/)

## ✅ Verification

This README accurately reflects the actual implementation:

- ✅ **File Structure**: All documented files exist and match the structure
- ✅ **Component Implementation**: All components implement documented features
- ✅ **Type Definitions**: Inline types used throughout
- ✅ **Export Structure**: Index file exports all components correctly
- ✅ **Usage Examples**: All documented usage patterns work correctly
- ✅ **Build Success**: Components compile and build successfully
- ✅ **Import Patterns**: Components are properly exported and imported
- ✅ **Test Coverage**: Comprehensive test suite with Vitest
- ✅ **Performance**: Fast test execution and development experience

### Current Usage in Codebase

The Icon components are ready for use in:

- Footer components for social media links
- Header components for social media navigation
- Profile pages for social media presence
- Contact pages for social media information
- Any component requiring custom SVG icons

This confirms the components are production-ready and follow all established patterns.
