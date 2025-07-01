# Area Component

Accessible image map area component with click handling and analytics.

## Features

- Performance optimized with React.memo
- Full accessibility with ARIA support
- Analytics tracking with Google Analytics
- Shape validation and coordinate checking
- TypeScript support with comprehensive types
- Works with image maps and standalone

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Area } from "@packages/components";

// Basic usage
<Area shape="rect" coords="0,0,100,100" href="/page1" alt="Rectangle area" />

// With analytics
<Area 
  shape="circle" 
  coords="150,150,50" 
  href="/page2" 
  alt="Circle area"
  analyticsId="circle-area"
/>

// Custom click handler
<Area 
  shape="poly" 
  coords="200,200,250,200,225,250" 
  alt="Triangle area"
  onClick={() => console.log("Triangle clicked")}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `"rect" \| "circle" \| "poly" \| "default"` | `"default"` | Shape of the clickable area |
| `coords` | `string` | - | Coordinates defining the area |
| `href` | `string` | - | Link destination URL |
| `alt` | `string` | - | Alternative text for accessibility |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `onClick` | `function` | - | Click event handler |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Image Map Areas

```tsx
<img src="map.jpg" alt="Interactive map" useMap="#map" />
<map name="map">
  <Area 
    shape="rect" 
    coords="0,0,100,100" 
    href="/region1" 
    alt="Region 1"
    analyticsId="map-region-1"
  />
  <Area 
    shape="circle" 
    coords="200,200,50" 
    href="/region2" 
    alt="Region 2"
    analyticsId="map-region-2"
  />
</map>
```

### Interactive Hotspots

```tsx
<Area 
  shape="poly" 
  coords="100,100,150,100,125,150" 
  alt="Triangle hotspot"
  onClick={(e) => handleHotspotClick(e)}
  analyticsId="triangle-hotspot"
/>
```

### Navigation Area

```tsx
<Area 
  shape="rect" 
  coords="0,0,200,50" 
  href="/navigation" 
  alt="Navigation area"
  analyticsId="nav-area"
/>
```

## Styling

```css
.area                 /* Base area styles */
.area:hover          /* Hover state */
.area:focus          /* Focus state */
```

## Accessibility

- Proper `alt` text for screen readers
- Keyboard navigation with focus indicators
- ARIA attributes for enhanced accessibility
- Role and state announcements

## Testing

```bash
pnpm test
```

## LICENSE

MIT
