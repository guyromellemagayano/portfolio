# Component Scripts

This directory contains automation scripts for the component library development workflow.

## Scripts Overview

### `scaffold-component.ts`

**Purpose**: Creates new React components with standardized structure and files.

**Usage**:

```bash
# Interactive mode
pnpm run scaffold

# Direct execution
npx tsx scripts/scaffold-component.ts

# With options
npx tsx scripts/scaffold-component.ts --name MyComponent --overwrite
```

**Features**:

- ✅ Validates component names (PascalCase required)
- ✅ Generates server and client components
- ✅ Creates comprehensive README documentation
- ✅ Includes test templates
- ✅ Adds CSS styling structure
- ✅ Supports overwrite mode for existing components
- ✅ Automatically updates main exports

**Generated Files**:

- `index.client.tsx` - Client-side memoized component
- `index.test.tsx` - Vitest test suite
- `index.tsx` - Server component with TypeScript interfaces
- `README.md` - Comprehensive documentation template
- `styles.css` - BEM-style CSS structure


### `test-components.ts`

**Purpose**: Runs component tests with memory management and detailed reporting.

**Usage**:

```bash
# Run all component tests
pnpm run test:components

# Direct execution
npx tsx scripts/test-components.ts
```

**Features**:

- ✅ Memory-efficient testing (1GB limit per component)
- ✅ Individual component test isolation
- ✅ Timeout protection (30s per component)
- ✅ Detailed success/failure reporting
- ✅ Memory issue detection
- ✅ Performance metrics

## Core Functions

### Scaffolding Functions

**Available from `scaffold-component.ts`:**

- `validateComponentName(name: string)` - Validates PascalCase format
- `createServerTemplate(name: string)` - Generates server component code
- `createClientTemplate(name: string)` - Generates client component code
- `createStylesTemplate(name: string)` - Generates CSS structure
- `createTestTemplate(name: string)` - Generates test suite
- `generateFileTemplates(name: string)` - Creates all file templates
- `scaffoldComponent(options: ScaffoldOptions)` - Main scaffolding function
- `updateMainExports(name: string, srcDir: string)` - Updates index.ts exports
- `buildAfterScaffold(componentName: string)` - Builds component after scaffolding

### Testing Functions

**Available from `test-components.ts`:**

- `ComponentTestRunner` - Memory-efficient test runner with detailed reporting

## Testing

All script logic is thoroughly tested in `scripts/__tests__/`.

**Test Coverage**:

- ✅ Component name validation
- ✅ Template generation
- ✅ File system operations
- ✅ Error handling
- ✅ Test runner functionality
- ✅ Memory management
- ✅ Timeout handling

**Run Tests**:

```bash
# Run script tests only
pnpm test scripts/

# Run all tests including scripts
pnpm test
```

## Configuration

### ESLint

Scripts are linted with Node.js specific rules:

- Console output allowed (scripts need logging)
- Process exit allowed (scripts may terminate)
- Strict TypeScript checking
- Import resolution configured

### Prettier

Scripts are formatted with the same rules as components:

- Consistent code style
- TypeScript formatting
- Import organization

### TypeScript

Scripts use the same TypeScript configuration as components:

- Node.js types included
- Source maps enabled
- Strict type checking

## Development Workflow

### Adding New Scripts

1. **Create the script** in `scripts/` directory
2. **Include all functionality** in the single script file
3. **Write comprehensive tests** in `scripts/__tests__/`
4. **Update documentation** in this README
5. **Add to package.JSON** scripts if needed

### Script Standards

**Required**:

- ✅ TypeScript with strict typing
- ✅ Comprehensive error handling
- ✅ Detailed logging with @guyromellemagayano/logger
- ✅ Unit tests for all logic
- ✅ Clear documentation
- ✅ All functionality in single file (no separate lib files)

**Recommended**:

- ✅ Interactive prompts for user input
- ✅ Progress indicators for long operations
- ✅ Detailed success/failure reporting
- ✅ Configuration file support
- ✅ Dry-run mode for destructive operations

### Error Handling

All scripts follow consistent error handling patterns:

```typescript
try {
  // Operation logic
} catch (error) {
  logError("Operation failed:", error);
  process.exit(1);
}
```

### Logging

Scripts use the shared logger package for consistent output:

```typescript
import { logInfo, logError, logWarn } from "@guyromellemagayano/logger";

logInfo("✅ Operation completed successfully");
logWarn("⚠️  Warning message");
logError("❌ Error occurred:", error);
```

## Troubleshooting

### Common Issues

**Script not found**:

```bash
# Ensure TypeScript is compiled
pnpm build

# Or run directly with tsx
npx tsx scripts/script-name.ts
```

**Permission denied**:

```bash
# Make script executable
chmod +x scripts/script-name.ts
```

**Import errors**:

```bash
# Install dependencies
pnpm install

# Check TypeScript configuration
pnpm tsc --noEmit
```

### Debug Mode

Enable verbose logging:

```bash
DEBUG=* npx tsx scripts/script-name.ts
```

### Memory Issues

If tests are failing due to memory:

1. Increase memory limit in `test-components.ts`
2. Reduce timeout duration
3. Add more garbage collection calls

## Contributing

When contributing to scripts:

1. **Follow existing patterns** - Use established error handling and logging
2. **Keep everything in single files** - No separate lib files needed
3. **Write tests first** - Ensure all logic is testable
4. **Update documentation** - Keep this README current
5. **Test thoroughly** - Verify with different scenarios
6. **Consider performance** - Scripts should be fast and efficient

## Related Documentation

- [Component Standards](../COMPONENT_STANDARDS.md)
- [Testing Guide](../TESTING.md)
- [Package README](../README.md)
