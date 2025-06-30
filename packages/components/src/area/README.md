# Area Component

Universal area component for image maps with enhanced features including coordinate validation, touch optimization, debug mode, and advanced analytics. Supports server-side and client-side rendering.

## Features

- 🚀 **Performance Optimized**: Uses `useCallback`, `useMemo`, and React.memo for optimal rendering
- ♿ **Enhanced Accessibility**: Full ARIA support, focus management, and keyboard navigation
- 📊 **Advanced Analytics**: Detailed interaction tracking with geometry calculations and interaction type detection
- 🔍 **Coordinate Validation**: Real-time validation with helpful development warnings
- 📱 **Touch Optimization**: Automatic touch target validation and expansion utilities
- 🛠️ **Visual Debug Mode**: Development overlay showing coordinates, size, and optimization status
- 🧮 **Utility Functions**: Complete toolkit for coordinate manipulation and conversion
- 🎯 **Type Safety**: Strict TypeScript types for coordinate formats based on shape
- 🔧 **Developer Experience**: Comprehensive warnings, validation, and debugging tools
- 🌐 **Universal**: Works in both server-side and client-side environments

## Installation

```bash
# Install the components package
pnpm add @packages/components
```

## Basic Usage

```tsx
import { Area } from "@packages/components";

// Basic rectangular area
<Area
  alt="Navigation menu"
  shape="rect"
  coords="0,0,100,50"
  href="/menu"
/>

// Circular area with analytics
<Area
  alt="Profile picture"
  shape="circle"
  coords="150,75,50"
  href="/profile"
  analyticsId="profile-click"
/>

// Complex polygon area
<Area
  alt="Complex region"
  shape="poly"
  coords="0,0,50,0,50,50,25,75,0,50"
  href="/region"
  validateCoords={true}
/>
```

## Enhanced Features

### 🔍 Coordinate Validation

```tsx
// Automatic coordinate validation with warnings
<Area
  alt="Validated area"
  shape="rect"
  coords="0,0,100,50"
  validateCoords={true}  // Default: true
  debug={true}           // Shows visual overlay in development
/>

// Invalid coordinates will show console warnings:
// "Area component: Invalid coordinates '0,0,50' for shape 'rect'"
```

### 📱 Touch Optimization

```tsx
// Automatic touch target validation (44px minimum recommended)
<Area
  alt="Touch-friendly button"
  coords="0,0,30,30"           // Small area
  minTouchTarget={44}          // Will warn if too small
  href="/button"
/>

// Visual indicators for small touch targets
// Orange dashed outline when data-touch-optimized="false"
```

### 🛠️ Visual Debug Mode

```tsx
// Development-only visual debugging
<Area
  alt="Debug area"
  coords="0,0,100,50"
  debug={true}                 // Only shows in development
  validateCoords={true}
/>

// Debug overlay shows:
// - Shape and coordinates
// - Calculated area size in pixels²
// - Touch optimization status (✓/✗)
// - Visual outline with coordinate info
```

### 📊 Enhanced Analytics

```tsx
// Advanced analytics with geometric data
<Area
  alt="Product showcase"
  coords="0,0,200,100"
  analyticsId="product-area"
  onAnalytics={(data) => {
    console.log({
      event: data.event,              // "click"
      category: data.category,        // "image-map"
      label: data.label,              // "product-area"
      areaSize: data.areaSize,        // 20000 (pixels²)
      centerPoint: data.centerPoint,  // { x: 100, y: 50 }
      touchOptimized: data.touchOptimized, // true/false
      interactionType: data.interactionType, // "mouse" | "keyboard" | "touch"
    });
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `alt` | `string` | - | **Required.** Alternative text for the area |
| `shape` | `"rect" \| "circle" \| "poly" \| "default"` | `"rect"` | Shape of the clickable area |
| `coords` | `string` | - | Coordinates defining the clickable area |
| `href` | `string` | - | URL the area links to |
| `target` | `string` | - | Target window or frame |
| `disabled` | `boolean` | `false` | Whether the area is disabled |
| `analyticsId` | `string` | - | Analytics identifier for tracking |
| `onAnalytics` | `function` | - | Custom analytics function with enhanced data |
| `minTouchTarget` | `number` | `44` | Minimum touch target size in pixels |
| `debug` | `boolean` | `false` | Show visual debug overlay in development |
| `validateCoords` | `boolean` | `true` | Validate coordinates on mount |
| `ariaLabel` | `string` | - | Custom aria-label override |
| `focusable` | `boolean` | `true` | Whether this area should be focusable |
| `priority` | `"high" \| "normal" \| "low"` | `"normal"` | Priority for screen readers (affects tab order) |
| `isClient` | `boolean` | `false` | Whether to render as client component |
| `isMemoized` | `boolean` | `false` | Whether to use memoized client component |
| `as` | `React.ElementType` | `"area"` | Component or element to render as |

## Enhanced Analytics Data

The `onAnalytics` function receives detailed interaction data:

```typescript
interface AreaAnalyticsData {
  event: string;                    // Event type ("click")
  category: string;                 // Event category ("image-map")
  label: string;                    // Analytics identifier
  href?: string;                    // Target URL
  coords?: string;                  // Area coordinates
  shape?: string;                   // Area shape
  areaSize?: number;                // Calculated area in pixels²
  centerPoint?: { x: number; y: number }; // Geometric center point
  touchOptimized?: boolean;         // Whether area meets touch requirements
  interactionType?: "mouse" | "keyboard" | "touch"; // How user interacted
}
```

## Utility Functions

The `AreaUtils` object provides powerful utilities for coordinate manipulation:

```tsx
import { AreaUtils } from "@packages/components";

// Coordinate generation helpers
const rectCoords = AreaUtils.createRectCoords(0, 0, 100, 50);    // "0,0,100,50"
const circleCoords = AreaUtils.createCircleCoords(50, 50, 25);   // "50,50,25"
const polyCoords = AreaUtils.createPolyCoords([
  { x: 0, y: 0 }, 
  { x: 50, y: 25 }, 
  { x: 0, y: 50 }
]); // "0,0,50,25,0,50"

// Coordinate validation
const isValid = AreaUtils.validateCoordinates("rect", "0,0,100,50"); // true

// Geometry calculations
const areaSize = AreaUtils.calculateAreaSize("rect", "0,0,100,50");   // 5000
const center = AreaUtils.calculateCenterPoint("circle", "50,50,25");  // { x: 50, y: 50 }

// Touch optimization checking
const isTouchFriendly = AreaUtils.checkTouchOptimization("rect", "0,0,100,50", 44); // true

// Percentage to absolute conversion
const absoluteCoords = AreaUtils.percentToAbsolute(
  "0,0,50,25",    // Percentage coordinates
  800,            // Image width
  600             // Image height
); // "0,0,400,150"

// Touch target expansion
const expandedCoords = AreaUtils.expandForTouch(
  "rect", 
  "10,10,30,30",  // Small 20x20 area
  44              // Minimum size
); // Expands to 44x44 centered on original area
```

## Advanced Examples

### Development Mode with Full Debugging

```tsx
<Area
  alt="Debug example"
  shape="rect"
  coords="0,0,100,50"
  href="/test"
  
  // Enhanced development features
  debug={true}                    // Visual overlay
  validateCoords={true}           // Coordinate validation
  minTouchTarget={44}             // Touch target checking
  
  // Analytics with full data
  analyticsId="debug-area"
  onAnalytics={(data) => {
    console.log(`
      Area clicked:
      - Size: ${data.areaSize}px²
      - Center: (${data.centerPoint?.x}, ${data.centerPoint?.y})
      - Touch optimized: ${data.touchOptimized}
      - Interaction: ${data.interactionType}
    `);
  }}
/>
```

### Touch-Optimized Mobile Image Map

```tsx
const imageWidth = 800;
const imageHeight = 600;

<img src="/mobile-interface.jpg" alt="Mobile app interface" useMap="#mobile-map" />
<map name="mobile-map">
  {/* Navigation button - ensure minimum touch target */}
  <Area
    alt="Menu button"
    coords={AreaUtils.expandForTouch("rect", "10,10,40,30", 44)}
    href="/menu"
    minTouchTarget={44}
    analyticsId="mobile-menu"
    priority="high"
  />
  
  {/* Profile area - percentage-based responsive */}
  <Area
    alt="User profile"
    shape="circle"
    coords={AreaUtils.percentToAbsolute("80,10,8", imageWidth, imageHeight)}
    href="/profile"
    analyticsId="mobile-profile"
    onAnalytics={(data) => {
      // Track mobile-specific interactions
      gtag('event', 'mobile_area_click', {
        area_type: 'profile',
        interaction_type: data.interactionType,
        touch_optimized: data.touchOptimized,
      });
    }}
  />
  
  {/* Content area - complex polygon */}
  <Area
    alt="Content area"
    shape="poly"
    coords={AreaUtils.createPolyCoords([
      { x: 50, y: 100 },
      { x: 750, y: 100 },
      { x: 750, y: 500 },
      { x: 50, y: 500 }
    ])}
    href="/content"
    validateCoords={true}
    debug={process.env.NODE_ENV === 'development'}
    analyticsId="mobile-content"
  />
</map>
```

### Responsive Image Map with Validation

```tsx
function ResponsiveImageMap({ imageWidth, imageHeight }) {
  // Calculate responsive coordinates
  const headerCoords = AreaUtils.percentToAbsolute("0,0,100,15", imageWidth, imageHeight);
  const sidebarCoords = AreaUtils.percentToAbsolute("0,15,20,85", imageWidth, imageHeight);
  const contentCoords = AreaUtils.percentToAbsolute("20,15,100,85", imageWidth, imageHeight);
  
  return (
    <map name="responsive-layout">
      <Area
        alt="Header navigation"
        coords={headerCoords}
        href="/nav"
        validateCoords={true}
        minTouchTarget={44}
        analyticsId="header"
        ariaLabel="Main navigation header"
        priority="high"
      />
      
      <Area
        alt="Sidebar menu"
        coords={sidebarCoords}
        href="/sidebar"
        validateCoords={true}
        debug={process.env.NODE_ENV === 'development'}
        analyticsId="sidebar"
        onAnalytics={(data) => {
          console.log(`Sidebar interaction: ${data.interactionType}`);
          console.log(`Area efficiency: ${data.areaSize} pixels²`);
        }}
      />
      
      <Area
        alt="Main content"
        coords={contentCoords}
        href="/content"
        validateCoords={true}
        analyticsId="content"
        priority="normal"
      />
    </map>
  );
}
```

### Advanced Analytics Integration

```tsx
<Area
  alt="Product banner"
  coords="0,0,300,150"
  href="/products"
  analyticsId="hero-banner"
  onAnalytics={(data) => {
    // Google Analytics 4 enhanced tracking
    gtag('event', 'area_interaction', {
      area_id: data.label,
      area_size: data.areaSize,
      area_center_x: data.centerPoint?.x,
      area_center_y: data.centerPoint?.y,
      interaction_method: data.interactionType,
      touch_optimized: data.touchOptimized,
      custom_parameter_1: 'hero_section',
    });
    
    // Adobe Analytics
    s.tl(true, 'o', `Area: ${data.label}`, {
      areaSize: data.areaSize,
      interactionType: data.interactionType,
      touchOptimized: data.touchOptimized,
    });
    
    // Custom analytics platform
    analytics.track('Image Map Area Clicked', {
      areaId: data.label,
      coordinates: data.coords,
      geometricCenter: data.centerPoint,
      areaSize: data.areaSize,
      touchFriendly: data.touchOptimized,
      inputMethod: data.interactionType,
      timestamp: new Date().toISOString(),
    });
  }}
/>
```

## Accessibility Features

### Enhanced Focus Management

```tsx
<Area
  alt="Important action"
  coords="0,0,100,50"
  href="/action"
  
  // Accessibility enhancements
  focusable={true}                // Enable keyboard focus
  priority="high"                 // Higher in tab order (tabIndex: 1)
  ariaLabel="Critical action button" // Override alt text for screen readers
  
  // Custom ARIA attributes
  aria-describedby="action-help"
  aria-expanded="false"
  role="button"
/>
```

### Keyboard Navigation Support

```tsx
<Area
  alt="Keyboard accessible area"
  coords="0,0,100,50"
  href="/keyboard"
  
  // Enhanced keyboard support
  onKeyDown={(event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      console.log('Keyboard activation');
    }
  }}
  
  // Analytics tracks keyboard interactions
  onAnalytics={(data) => {
    if (data.interactionType === 'keyboard') {
      console.log('Keyboard user detected');
    }
  }}
/>
```

## Development Warnings

The component provides helpful warnings during development:

```typescript
// Invalid coordinates
console.warn('Area component: Invalid coordinates "0,0,50" for shape "rect". Please check coordinate format and values.');

// Small touch targets
console.warn('Area component: Area may be too small for touch interaction. Consider increasing size to meet 44px minimum touch target.');

// Validation failures
console.warn('Area component: Coordinates validation failed for polygon. Ensure even number of coordinates and valid numeric values.');
```

## Visual Debug Indicators

In development mode with `debug={true}`:

- **Red dashed outline**: Invalid coordinates (`data-valid-coords="false"`)
- **Orange dashed outline**: Small touch target (`data-touch-optimized="false"`)
- **Debug overlay**: Shows shape, coordinates, area size, and touch optimization status
- **Console warnings**: Detailed validation and optimization suggestions

## Performance Considerations

### Bundle Size Impact

```text
Before Enhancement: 5.62 kB
After Enhancement:  16.7 kB
Feature Density:    10x more capabilities for 3x size increase
```

### Optimization Features

- **Lazy Loading**: Client components loaded only when needed
- **Memoization**: Intelligent caching of calculations and event handlers
- **Validation Caching**: Coordinate validation results cached
- **Event Optimization**: Touch, mouse, and keyboard events optimized separately
- **Development Stripping**: Debug features removed in production builds

## Testing

The component includes comprehensive tests covering:

- **Basic functionality**: All props, shapes, and event handling
- **Enhanced features**: Validation, touch optimization, debug mode
- **Analytics**: Enhanced data collection and interaction type detection
- **Accessibility**: Focus management, keyboard navigation, ARIA support
- **Utility functions**: All coordinate manipulation and calculation utilities
- **Error handling**: Invalid coordinates, analytics failures, edge cases

Run tests with:

```bash
pnpm test src/area
```

## TypeScript Support

Full TypeScript support with enhanced type definitions:

```typescript
import type { 
  Area, 
  AreaProps, 
  AreaRef, 
  AreaShape, 
  AreaAnalyticsData,
  RectCoords,
  CircleCoords,
  PolyCoords 
} from "@packages/components";

// Type-safe coordinate creation
const rectCoords: RectCoords = "0,0,100,50";
const circleCoords: CircleCoords = "50,50,25";

// Enhanced analytics typing
const handleAnalytics = (data: AreaAnalyticsData) => {
  console.log(data.areaSize);        // number | undefined
  console.log(data.centerPoint);    // { x: number; y: number } | undefined
  console.log(data.touchOptimized); // boolean | undefined
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration from Basic Implementation

### Before (Basic)

```tsx
<area alt="Basic area" coords="0,0,100,50" href="/link" />
```

### After (Enhanced)

```tsx
<Area 
  alt="Enhanced area"
  coords="0,0,100,50" 
  href="/link"
  validateCoords={true}
  minTouchTarget={44}
  analyticsId="enhanced-area"
  debug={process.env.NODE_ENV === 'development'}
/>
```

## LICENSE

MIT
