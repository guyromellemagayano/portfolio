# Memory-Efficient Testing Guide

This document outlines various strategies for testing components without running into memory issues or heap overflow errors.

## 🚨 **The Problem**

When running all component tests together, you may encounter:

- `JavaScript heap out of memory` errors
- Test timeouts due to memory pressure
- Slow test execution
- Browser crashes in test environment

## ✅ **Solutions Available**

We provide multiple testing configurations and strategies to handle different scenarios:

### 1. **Lightweight Testing** (`vitest.light.config.ts`)

**Best for**: Memory-constrained environments, CI/CD

```bash
# Run all tests with minimal memory usage
pnpm test:light:run

# Watch mode with light config
pnpm test:watch:light
```

**Features**:

- Single worker process
- No concurrent tests
- Disabled CSS processing
- 2GB heap limit
- Fast timeouts
- No coverage by default

### 2. **Component-Level Testing**

**Best for**: Testing individual components with memory efficiency

```bash
# Test individual components
pnpm test:a
pnpm test:abbr  
pnpm test:address
pnpm test:area

# Test all components sequentially
pnpm test:all-components
```

**Features**:

- One component at a time
- Uses light config automatically
- Memory-efficient sequential execution
- No complex configuration needed

### 3. **Isolated Component Testing**

**Best for**: Testing one component at a time with full isolation

```bash
# Run all components individually
pnpm test:isolated

# Test specific components
pnpm test:component src/area

# Test with increased memory
pnpm test:memory
```

**Features**:

- Each component runs in separate process
- Automatic garbage collection between tests
- Memory monitoring
- Timeout protection
- Detailed failure reporting

### 4. **Component-Specific Testing**

**Best for**: Testing individual components during development

```bash
# Test specific component directories
pnpm test:components

# Test just one component
vitest run src/area --config vitest.light.config.ts

# Test with memory monitoring
node --max-old-space-size=4096 ./node_modules/.bin/vitest run src/area
```

## 🔧 **Configuration Details**

### Standard Config (`vitest.config.ts`)

- **Memory**: 4GB+ recommended
- **Workers**: 1 (optimized)
- **Concurrency**: 3 tests max
- **Best for**: Development with adequate memory

### Light Config (`vitest.light.config.ts`)

- **Memory**: 2GB heap limit
- **Workers**: 1 single fork
- **Concurrency**: Sequential only
- **Best for**: CI, memory-constrained environments, component-level testing

## 🎯 **Recommended Usage Patterns**

### For Development

```bash
# Quick component test during development
pnpm test:light src/area

# Watch specific component
vitest --config vitest.light.config.ts --watch src/area
```

### For CI/CD

```bash
# Memory-efficient component-by-component testing
pnpm test:all-components

# Or isolated testing with monitoring
pnpm test:isolated
```

### For Debugging Memory Issues

```bash
# Test with memory monitoring
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run

# Use isolated runner for detailed analysis
pnpm test:isolated
```

## 📊 **Memory Monitoring**

The isolated test runner (`scripts/test-components.ts`) provides detailed memory monitoring:

```bash
🚀 Starting memory-efficient component testing...

📋 Found 4 components: a, abbr, address, area

🧪 Testing a...
✅ a passed (1247ms)

🧪 Testing abbr...  
✅ abbr passed (1156ms)

🧪 Testing address...
✅ address passed (1398ms)

🧪 Testing area...
❌ area failed (2344ms)
💾 Memory issue detected in area

============================================================
📊 TEST SUMMARY
============================================================
✅ Passed: 3/4 components
❌ Failed: 1/4 components  
💾 Memory Issues: 1 components
🧪 Total Tests: 67
⏱️  Total Duration: 6145ms

💾 Components with Memory Issues:
  • area

💡 Consider optimizing these components for memory usage
============================================================
```

## 🚀 **Quick Start**

1. **For everyday testing:**

   ```bash
   pnpm test:light:run
   ```

2. **For memory issues:**

   ```bash
   pnpm test:isolated
   ```

3. **For component-by-component testing:**

   ```bash
   pnpm test:all-components
   ```

4. **For development:**

   ```bash
   pnpm test:watch:light
   ```

## 🔍 **Troubleshooting**

### "Heap out of memory" errors

- Use `pnpm test:light:run` or `pnpm test:isolated`
- Increase heap size: `node --max-old-space-size=8192`
- Run tests component-by-component with `pnpm test:all-components`

### Tests hanging or timing out

- Check for memory leaks in components
- Use isolated testing to identify problematic components
- Reduce test complexity or mock heavy dependencies

### Slow test execution

- Use light configuration to disable CSS processing
- Run tests sequentially instead of concurrently
- Consider mocking analytics or heavy computations

## 🛠️ **Advanced Configuration**

### Custom Memory Limits

```bash
# 8GB heap limit
node --max-old-space-size=8192 ./node_modules/.bin/vitest run

# Enable garbage collection exposure
node --expose-gc --max-old-space-size=4096 ./node_modules/.bin/vitest run
```

### Environment Variables

```bash
# Disable concurrent tests
export VITEST_MAX_CONCURRENCY=1

# Reduce workers
export VITEST_MAX_WORKERS=1

# Enable memory monitoring
export NODE_OPTIONS="--max-old-space-size=4096 --expose-gc"
```

## 📚 **Best Practices**

1. **Start with light config** for new components
2. **Use isolated testing** when debugging memory issues
3. **Profile memory usage** with Node.js memory tools
4. **Mock heavy dependencies** in tests
5. **Clean up resources** in test teardown
6. **Avoid creating large test data** unnecessarily
7. **Use component-level testing** for CI/CD pipelines

---

Choose the testing strategy that best fits your memory constraints and development workflow!
