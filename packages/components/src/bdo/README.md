# BDO Component

Accessible bidirectional override component for forced text direction control with analytics tracking and enhanced styling.

## Features

- Performance optimized with React.memo and hooks
- Proper HTML `<bdo>` element for bidirectional text override
- Analytics tracking with Google Analytics
- Enhanced styling with emphasized variant
- TypeScript support with comprehensive types
- Universal rendering for SSR and client-side
- Polymorphic rendering support
- Accessibility with focus management
- Required direction attribute for semantic meaning

## Installation

```bash
pnpm add @packages/components
```

## Usage

```tsx
import { Bdo } from "@packages/components";

// Basic usage - force LTR display
<Bdo dir="ltr">Text forced left-to-right</Bdo>

// Force RTL display
<Bdo dir="rtl">Text forced right-to-left</Bdo>

// Emphasized override
<Bdo dir="ltr" emphasized>Important LTR text</Bdo>

// With analytics
<Bdo dir="rtl" analyticsId="override-element">
  نص مُجبر على الاتجاه
</Bdo>

// Polymorphic usage
<Bdo as="span" dir="ltr">Span with forced direction</Bdo>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dir` | `"ltr" \| "rtl"` | **Required** | Text direction override (required) |
| `emphasized` | `boolean` | `false` | Apply emphasized styling |
| `analyticsId` | `string` | - | Analytics tracking identifier |
| `onAnalytics` | `function` | - | Custom analytics function |
| `as` | `string \| Component` | `"bdo"` | Element or component to render as |
| `isClient` | `boolean` | `false` | Enable client-side rendering |
| `isMemoized` | `boolean` | `false` | Use memoized component |

## Examples

### Arabic Text in LTR Context

```tsx
{/* Force Arabic text to display left-to-right (for testing or special cases) */}
<p>
  This Arabic text <Bdo dir="ltr">مرحبا بك</Bdo> is forced to display LTR.
</p>
```

### English Text in RTL Context

```tsx
{/* Force English text to display right-to-left within RTL content */}
<div dir="rtl">
  <p>
    هذا النص الإنجليزي <Bdo dir="rtl">Hello World</Bdo> مُجبر على العرض من اليمين لليسار
  </p>
</div>
```

### Phone Numbers and Codes

```tsx
{/* Ensure phone numbers display in consistent direction */}
<p dir="rtl">
  رقم الهاتف: <Bdo dir="ltr">+1 (555) 123-4567</Bdo>
</p>
```

### Email Addresses

```tsx
{/* Force email addresses to display LTR even in RTL context */}
<div dir="rtl">
  البريد الإلكتروني: <Bdo dir="ltr">user@example.com</Bdo>
</div>
```

### Emphasized Override

```tsx
<Bdo dir="ltr" emphasized>
  !IMPORTANT TEXT FORCED LEFT-TO-RIGHT
</Bdo>
```

### Testing Text Direction

```tsx
{/* For testing how text would appear in opposite direction */}
<div>
  <p>Normal: Hello World</p>
  <p>Overridden: <Bdo dir="rtl">Hello World</Bdo></p>
</div>
```

### With Custom Analytics

```tsx
<Bdo
  dir="ltr"
  onAnalytics={(data) => {
    console.log('BDO override used:', data);
    // Track direction overrides for UX analysis
  }}
>
  {overriddenContent}
</Bdo>
```

## When to Use

The BDO element should be used when:

- Forcing text to display in a specific direction regardless of content
- Testing how text appears in opposite directions
- Displaying codes, phone numbers, or technical content in consistent direction
- Creating special visual effects with text direction
- Overriding automatic text direction detection

## Important Notes

### Required Direction Attribute

Unlike BDI, the `dir` attribute is **required** for BDO elements. This is because:

- BDO must explicitly override the text direction
- The semantic meaning requires a specified direction
- Screen readers need the direction information for proper pronunciation

### Use with Caution

BDO should be used sparingly as it:

- Overrides natural text direction which can confuse users
- May create poor reading experiences for multilingual content
- Can make text harder to read when used inappropriately

### Accessibility Considerations

- Screen readers will follow the overridden direction
- May cause confusion when overriding natural text flow
- Should be used only when necessary for technical or design requirements

## BDO vs BDI

| Feature | BDO (Override) | BDI (Isolate) |
|---------|----------------|---------------|
| Purpose | Force direction | Isolate direction |
| dir attribute | Required | Optional |
| Use case | Override natural flow | Protect surrounding text |
| Accessibility | More intrusive | More natural |

## Styling

```css
.bdo                    /* Base bidirectional override styles */
.bdo--emphasized       /* Emphasized variant */
.bdo--ltr              /* Left-to-right specific styles */
.bdo--rtl              /* Right-to-left specific styles */
```

## Accessibility

- Maintains semantic meaning of `<bdo>` element
- Required direction attribute for screen readers
- Keyboard navigation support
- Focus indicators for interactive elements
- High contrast mode compatibility
- Warning styles for direction mismatches

## Browser Support

The `<bdo>` element is supported in all modern browsers and has good legacy support.

## Testing

```bash
pnpm test
```

## LICENSE

MIT
