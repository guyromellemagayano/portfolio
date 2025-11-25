---
apply: by file patterns
patterns: apps/**/*.tsx, packages/**/*.tsx
---

# Performance Standards

## React Performance Optimization

### Memoization Patterns

#### Component Memoization

```typescript
// Base component with memoization control
export interface ComponentProps extends CommonComponentProps {
  /** Whether to enable memoization */
  isMemoized?: boolean;
}

// Memoized version with custom comparison
const MemoizedComponent = React.memo(BaseComponent, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
  );
});

// Main component with memoization option
export const Component: ComponentComponent = setDisplayName(
  function Component(props) {
    const {children, isMemoized = false, ...rest} = props;
    const ComponentToRender = isMemoized ? MemoizedComponent : BaseComponent;
    return <ComponentToRender {...rest} > {children} < /ComponentToRender>;
  }
);
```

#### Hook Memoization

```typescript
// Memoize expensive computations
const processedData = useMemo(() => {
  return expensiveDataProcessing(rawData);
}, [rawData]);

// Memoize event handlers
const handleClick = useCallback((event: React.MouseEvent) => {
  onAction?.(event);
}, [onAction]);

// Memoize component references
const componentRef = useRef<HTMLElement>(null);
```

### Performance Optimization Patterns

#### Virtual Scrolling

```typescript
// For large lists (>100 items)
export function VirtualizedList({items}: { items: Item[] }) {
  const [containerRef, {width, height}] = useResizeObserver();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  return (
    <div ref = {containerRef}
  style = {
  {
    height, overflow
  :
    'auto'
  }
}>
  <div style = {
  {
    height: virtualizer.getTotalSize(), position
  :
    'relative'
  }
}>
  {
    virtualizer.getVirtualItems().map(virtualItem => (
      <div
        key = {virtualItem.key}
    style = {
    {
      position: 'absolute',
        top
    :
      0,
        left
    :
      0,
        width
    :
      '100%',
        height
    :
      virtualItem.size,
        transform
    :
      `translateY(${virtualItem.start}px)`,
    }
  }
  >
    <ListItem item = {items[virtualItem.index]}
    />
    < /div>
  ))
  }
  </div>
  < /div>
)
  ;
}
```

#### Lazy Loading

```typescript
// Intersection observer for lazy loading
export function useComponentVisibility(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {threshold: 0.1}
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

// Lazy component loading
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback = { < LoadingSpinner / >
}>
  <LazyComponent / >
  </Suspense>
)
  ;
}
```

#### Code Splitting

```typescript
// Route-based code splitting
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

// Component-based code splitting
const HeavyChart = React.lazy(() => import('./HeavyChart'));

// Dynamic imports for conditional loading
const loadFeature = async () => {
  const {FeatureComponent} = await import('./FeatureComponent');
  return FeatureComponent;
};
```

## Bundle Optimization

### Tree Shaking

```typescript
// Use named imports for better tree shaking
import {specificFunction} from 'large-library';
// Instead of: import * as library from 'large-library';

// Use dynamic imports for optional features
const loadOptionalFeature = async () => {
  if (shouldLoadFeature) {
    const {OptionalFeature} = await import('./OptionalFeature');
    return OptionalFeature;
  }
  return null;
};
```

### Asset Optimization

```typescript
// Image optimization with next/image
import Image from 'next/image';

function OptimizedImage({src, alt, ...props}) {
  return (
    <Image
      src = {src}
  alt = {alt}
  width = {800}
  height = {600}
  placeholder = "blur"
  blurDataURL = "data:image/jpeg;base64,..."
  {...
    props
  }
  />
)
  ;
}

// WebP format with fallbacks
function ResponsiveImage({src, alt}) {
  return (
    <picture>
      <source srcSet = {`${src}.webp`
}
  type = "image/webp" / >
  <source srcSet = {`${src}.jpg`
}
  type = "image/jpeg" / >
  <img src = {`${src}.jpg`
}
  alt = {alt}
  />
  < /picture>
)
  ;
}
```

## Network Performance

### Data Fetching Optimization

```typescript
// React Query for caching and background updates
export function useOptimizedData(key: string, fetcher: () => Promise<any>) {
  return useQuery({
    queryKey: [key],
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
}

// Prefetching for better UX
export function usePrefetchData() {
  const queryClient = useQueryClient();

  const prefetchData = useCallback(async (key: string) => {
    await queryClient.prefetchQuery({
      queryKey: [key],
      queryFn: () => fetchData(key),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);

  return {prefetchData};
}
```

### Request Optimization

```typescript
// Debounced search
export function useDebouncedSearch(delay: number = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return {searchTerm, setSearchTerm, debouncedSearchTerm};
}

// Request deduplication
const requestCache = new Map();

export async function deduplicatedRequest(url: string, options: RequestInit) {
  const key = `${url}-${JSON.stringify(options)}`;

  if (requestCache.has(key)) {
    return requestCache.get(key);
  }

  const promise = fetch(url, options);
  requestCache.set(key, promise);

  // Clean up after request completes
  promise.finally(() => {
    requestCache.delete(key);
  });

  return promise;
}
```

## Memory Management

### Cleanup Patterns

```typescript
// Cleanup event listeners
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// Cleanup timers
useEffect(() => {
  const timer = setInterval(() => {
    // Periodic task
  }, 1000);

  return () => clearInterval(timer);
}, []);

// Cleanup subscriptions
useEffect(() => {
  const subscription = dataStream.subscribe(handleData);

  return () => subscription.unsubscribe();
}, []);
```

### Memory Leak Prevention

```typescript
// Avoid closures in useEffect dependencies
useEffect(() => {
  const fetchData = async () => {
    const data = await api.getData();
    setData(data);
  };

  fetchData();
}, []); // Empty dependency array

// Use refs for mutable values
const isMountedRef = useRef(true);

useEffect(() => {
  return () => {
    isMountedRef.current = false;
  };
}, []);

// Check if component is still mounted before state updates
const updateState = useCallback((newState) => {
  if (isMountedRef.current) {
    setState(newState);
  }
}, []);
```

## Performance Monitoring

### Performance Metrics

```typescript
// Web Vitals monitoring
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Custom performance marks
performance.mark('component-render-start');
// Component rendering logic
performance.mark('component-render-end');
performance.measure('component-render', 'component-render-start', 'component-render-end');
```

### Performance Testing

```typescript
// Performance testing with React Testing Library
import {render} from '@testing-library/react';
import {performance} from 'perf_hooks';

it('should render within performance budget', () => {
  const start = performance.now();
  render(<Component / >);
  const end = performance.now();

  expect(end - start).toBeLessThan(100); // 100ms budget
});

// Bundle size testing
import {getBundleSize} from 'bundle-analyzer';

it('should not exceed bundle size limit', () => {
  const bundleSize = getBundleSize('./dist/main.js');
  expect(bundleSize).toBeLessThan(500 * 1024); // 500KB limit
});
```

## Performance Best Practices

### General Guidelines

- **Measure First**: Always measure before optimizing
- **Profile Regularly**: Use React DevTools Profiler
- **Set Performance Budgets**: Define acceptable performance thresholds
- **Monitor in Production**: Use real user monitoring (RUM)
- **Optimize Critical Path**: Focus on above-the-fold content
- **Lazy Load Non-Critical**: Defer non-essential resources
- **Use CDN**: Serve static assets from CDN
- **Enable Compression**: Use gzip/brotli compression
- **Minimize HTTP Requests**: Combine and minify resources
- **Cache Strategically**: Implement appropriate caching strategies

# Performance Standards

## React Performance Optimization

### Memoization Patterns

#### Component Memoization

```typescript
// Base component with memoization control
export interface ComponentProps extends CommonComponentProps {
  /** Whether to enable memoization */
  isMemoized?: boolean;
}

// Memoized version with custom comparison
const MemoizedComponent = React.memo(BaseComponent, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
  );
});

// Main component with memoization option
export const Component: ComponentComponent = setDisplayName(
  function Component(props) {
    const {children, isMemoized = false, ...rest} = props;
    const ComponentToRender = isMemoized ? MemoizedComponent : BaseComponent;
    return <ComponentToRender {...rest} > {children} < /ComponentToRender>;
  }
);
```

#### Hook Memoization

```typescript
// Memoize expensive computations
const processedData = useMemo(() => {
  return expensiveDataProcessing(rawData);
}, [rawData]);

// Memoize event handlers
const handleClick = useCallback((event: React.MouseEvent) => {
  onAction?.(event);
}, [onAction]);

// Memoize component references
const componentRef = useRef<HTMLElement>(null);
```

### Performance Optimization Patterns

#### Virtual Scrolling

```typescript
// For large lists (>100 items)
export function VirtualizedList({items}: { items: Item[] }) {
  const [containerRef, {width, height}] = useResizeObserver();

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 200,
    overscan: 5,
  });

  return (
    <div ref = {containerRef}
  style = {
  {
    height, overflow
  :
    'auto'
  }
}>
  <div style = {
  {
    height: virtualizer.getTotalSize(), position
  :
    'relative'
  }
}>
  {
    virtualizer.getVirtualItems().map(virtualItem => (
      <div
        key = {virtualItem.key}
    style = {
    {
      position: 'absolute',
        top
    :
      0,
        left
    :
      0,
        width
    :
      '100%',
        height
    :
      virtualItem.size,
        transform
    :
      `translateY(${virtualItem.start}px)`,
    }
  }
  >
    <ListItem item = {items[virtualItem.index]}
    />
    < /div>
  ))
  }
  </div>
  < /div>
)
  ;
}
```

#### Lazy Loading

```typescript
// Intersection observer for lazy loading
export function useComponentVisibility(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {threshold: 0.1}
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

// Lazy component loading
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback = { < LoadingSpinner / >
}>
  <LazyComponent / >
  </Suspense>
)
  ;
}
```

#### Code Splitting

```typescript
// Route-based code splitting
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));

// Component-based code splitting
const HeavyChart = React.lazy(() => import('./HeavyChart'));

// Dynamic imports for conditional loading
const loadFeature = async () => {
  const {FeatureComponent} = await import('./FeatureComponent');
  return FeatureComponent;
};
```

## Bundle Optimization

### Tree Shaking

```typescript
// Use named imports for better tree shaking
import {specificFunction} from 'large-library';
// Instead of: import * as library from 'large-library';

// Use dynamic imports for optional features
const loadOptionalFeature = async () => {
  if (shouldLoadFeature) {
    const {OptionalFeature} = await import('./OptionalFeature');
    return OptionalFeature;
  }
  return null;
};
```

### Asset Optimization

```typescript
// Image optimization with next/image
import Image from 'next/image';

function OptimizedImage({src, alt, ...props}) {
  return (
    <Image
      src = {src}
  alt = {alt}
  width = {800}
  height = {600}
  placeholder = "blur"
  blurDataURL = "data:image/jpeg;base64,..."
  {...
    props
  }
  />
)
  ;
}

// WebP format with fallbacks
function ResponsiveImage({src, alt}) {
  return (
    <picture>
      <source srcSet = {`${src}.webp`
}
  type = "image/webp" / >
  <source srcSet = {`${src}.jpg`
}
  type = "image/jpeg" / >
  <img src = {`${src}.jpg`
}
  alt = {alt}
  />
  < /picture>
)
  ;
}
```

## Network Performance

### Data Fetching Optimization

```typescript
// React Query for caching and background updates
export function useOptimizedData(key: string, fetcher: () => Promise<any>) {
  return useQuery({
    queryKey: [key],
    queryFn: fetcher,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  });
}

// Prefetching for better UX
export function usePrefetchData() {
  const queryClient = useQueryClient();

  const prefetchData = useCallback(async (key: string) => {
    await queryClient.prefetchQuery({
      queryKey: [key],
      queryFn: () => fetchData(key),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);

  return {prefetchData};
}
```

### Request Optimization

```typescript
// Debounced search
export function useDebouncedSearch(delay: number = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return {searchTerm, setSearchTerm, debouncedSearchTerm};
}

// Request deduplication
const requestCache = new Map();

export async function deduplicatedRequest(url: string, options: RequestInit) {
  const key = `${url}-${JSON.stringify(options)}`;

  if (requestCache.has(key)) {
    return requestCache.get(key);
  }

  const promise = fetch(url, options);
  requestCache.set(key, promise);

  // Clean up after request completes
  promise.finally(() => {
    requestCache.delete(key);
  });

  return promise;
}
```

## Memory Management

### Cleanup Patterns

```typescript
// Cleanup event listeners
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// Cleanup timers
useEffect(() => {
  const timer = setInterval(() => {
    // Periodic task
  }, 1000);

  return () => clearInterval(timer);
}, []);

// Cleanup subscriptions
useEffect(() => {
  const subscription = dataStream.subscribe(handleData);

  return () => subscription.unsubscribe();
}, []);
```

### Memory Leak Prevention

```typescript
// Avoid closures in useEffect dependencies
useEffect(() => {
  const fetchData = async () => {
    const data = await api.getData();
    setData(data);
  };

  fetchData();
}, []); // Empty dependency array

// Use refs for mutable values
const isMountedRef = useRef(true);

useEffect(() => {
  return () => {
    isMountedRef.current = false;
  };
}, []);

// Check if component is still mounted before state updates
const updateState = useCallback((newState) => {
  if (isMountedRef.current) {
    setState(newState);
  }
}, []);
```

## Performance Monitoring

### Performance Metrics

```typescript
// Web Vitals monitoring
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// Custom performance marks
performance.mark('component-render-start');
// Component rendering logic
performance.mark('component-render-end');
performance.measure('component-render', 'component-render-start', 'component-render-end');
```

### Performance Testing

```typescript
// Performance testing with React Testing Library
import {render} from '@testing-library/react';
import {performance} from 'perf_hooks';

it('should render within performance budget', () => {
  const start = performance.now();
  render(<Component / >);
  const end = performance.now();

  expect(end - start).toBeLessThan(100); // 100ms budget
});

// Bundle size testing
import {getBundleSize} from 'bundle-analyzer';

it('should not exceed bundle size limit', () => {
  const bundleSize = getBundleSize('./dist/main.js');
  expect(bundleSize).toBeLessThan(500 * 1024); // 500KB limit
});
```

## Performance Best Practices

### General Guidelines

- **Measure First**: Always measure before optimizing
- **Profile Regularly**: Use React DevTools Profiler
- **Set Performance Budgets**: Define acceptable performance thresholds
- **Monitor in Production**: Use real user monitoring (RUM)
- **Optimize Critical Path**: Focus on above-the-fold content
- **Lazy Load Non-Critical**: Defer non-essential resources
- **Use CDN**: Serve static assets from CDN
- **Enable Compression**: Use gzip/brotli compression
- **Minimize HTTP Requests**: Combine and minify resources
- **Cache Strategically**: Implement appropriate caching strategies
