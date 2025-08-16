<!-- markdownlint-disable line-length -->
# Header Component

A comprehensive header component system featuring a main `Header` component with navigation, theme toggle, avatar, and effects, following our established development standards.

## 📁 File Structure

```bash
header/
├── Header.tsx              # Main header component with client-side logic
├── Header.module.css       # CSS modules for styling
├── index.ts               # Component exports
├── models/
│   ├── Header.types.ts    # Type definitions
│   └── Header.data.ts     # Data and constants
├── _internal/
│   ├── client/
│   │   ├── HeaderEffects.client.tsx      # Client-side effects
│   │   ├── HeaderNavigation.client.tsx   # Navigation component
│   │   └── HeaderThemeToggle.client.tsx  # Theme toggle
│   └── server/
│       ├── HeaderAvatar.tsx              # Avatar component
│       └── HeaderIcons.tsx               # Icon components
└── README.md              # This documentation
```

## 🏗️ Architecture

This component follows the **"inline types for all components"** pattern and uses a **client-server component split** for optimal performance. For detailed information about these architectural patterns, see the [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns) section in the Development Optimization Guide.

## 🚀 Features

- **Main Header Component**: Client-side component with navigation and effects
- **Navigation System**: Desktop and mobile navigation with responsive design
- **Theme Toggle**: Dark/light mode switching with smooth transitions
- **Avatar Integration**: User avatar with positioning and effects
- **Header Effects**: Scroll-based animations and visual effects
- **Ref Forwarding**: Supports `React.forwardRef` for proper ref handling
- **CSS Modules**: Scoped styling with **Tailwind CSS** integration
- **Type Safe**: Full **TypeScript** support with proper type inference
- **Responsive Design**: Mobile-first approach with breakpoint handling

## 📖 Usage

### Basic Usage

```typescript
import { Header } from '@/components/header'
import { Container } from '@guyromellemagayano/components'

function MyLayout() {
  return (
    <>
      <Header />
      <Container>
        <main>Page content goes here...</main>
      </Container>
    </>
  )
}
```

### With Custom Styling

```typescript
import { Header } from '@/components/header'

function MyLayout() {
  return (
    <Header 
      className="custom-header"
      style={{ '--header-height': '80px' }}
    />
  )
}
```

### Individual Components

```typescript
import { 
  HeaderNavigation, 
  HeaderThemeToggle, 
  HeaderAvatar 
} from '@/components/header'
import { Header as HeaderComponent } from '@guyromellemagayano/components'

function CustomHeader() {
  return (
    <HeaderComponent className="custom-header">
      <HeaderNavigation />
      <HeaderThemeToggle />
      <HeaderAvatar />
    </HeaderComponent>
  )
}
```

### With Effects

```typescript
import { HeaderEffects } from '@/components/header'

function MyLayout() {
  return (
    <>
      <Header />
      <HeaderEffects />
      <main>Content with header effects</main>
    </>
  )
}
```

## 🔧 Props

### Public Props

- `className?: string` - CSS classes for styling
- `...rest` - All standard HTML header attributes

### Internal Props (Not for External Use)

- `_internalId?: string` - Override generated ID for debugging (inherited from CommonWebAppComponentProps)
- `_debugMode?: boolean` - Enable debug logging in development (inherited from CommonWebAppComponentProps)

## 🎨 Styling

The component uses CSS modules with Tailwind CSS integration:

### CSS Module Structure

```css
/* Header.module.css */
@reference "tailwindcss";

.headerComponent {
  @apply sticky top-0 z-50 w-full;
}

.headerSection {
  @apply flex items-center justify-between;
}

.avatarSection {
  @apply relative;
}

.avatarContainer {
  @apply relative;
}

.avatarPositioningWrapper {
  @apply relative;
}

.avatarRelativeContainer {
  @apply relative;
}

.avatarBorderContainer {
  @apply absolute inset-0 rounded-full;
}

.avatarImage {
  @apply relative;
}
```

### CSS Custom Properties

The header uses CSS custom properties for dynamic styling:

```css
:root {
  --header-height: 4rem;
  --header-mb: 0;
  --header-position: relative;
  --header-inner-position: relative;
  --avatar-border-opacity: 0;
  --avatar-border-transform: scale(1);
  --avatar-image-transform: scale(1);
}
```

### Styling Examples

```typescript
// Custom header height
<Header style={{ '--header-height': '80px' }} />

// Custom positioning
<Header style={{ '--header-position': 'fixed' }} />

// Custom avatar effects
<Header style={{ '--avatar-border-opacity': '0.5' }} />
```

## 🔒 Security & Type Safety

This component follows security best practices by using inline types and hiding internal implementation details. For detailed information about security patterns and type safety, see the [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety) section in the Development Optimization Guide.

## 🔧 Implementation Details

### Component Structure

```typescript
// Header.tsx - Main implementation
const BaseHeader = React.forwardRef<HeaderRef, HeaderProps>(
  function BaseHeader(props, ref) {
    const { className, ...rest } = props;

    const isHomePage = usePathname() === "/";

    // Refs used by the effects component
    const headerRef = useRef<DivRef | null>(null);
    const avatarRef = useRef<DivRef | null>(null);

    return (
      <>
        <HeaderComponent
          ref={ref}
          className={cn(styles.headerComponent, className)}
          style={{
            height: "var(--header-height)",
            marginBottom: "var(--header-mb)",
          }}
          {...rest}
          data-testid="header-root"
        >
          {/* Avatar section for home page */}
          {isHomePage && (
            <>
              <Div ref={avatarRef} className={styles.avatarSection} data-avatar />
              <Container className={styles.avatarContainer}>
                {/* Avatar positioning and effects */}
              </Container>
            </>
          )}

          {/* Main header content */}
          <Div ref={headerRef} className={styles.headerSection} data-header>
            {/* Navigation and theme toggle */}
          </Div>
        </HeaderComponent>
      </>
    );
  }
);
```

### Client-Server Split

```typescript
// Client components for interactivity
export { HeaderEffects } from "./_internal/client/HeaderEffects.client";
export { HeaderNavigation } from "./_internal/client/HeaderNavigation.client";
export { HeaderThemeToggle } from "./_internal/client/HeaderThemeToggle.client";

// Server components for static content
export { HeaderAvatar } from "./_internal/server/HeaderAvatar";
export { HeaderIcons } from "./_internal/server/HeaderIcons";
```

## 🧪 Testing

Comprehensive test coverage for header components:

- **Main Header Component**: Rendering, ref forwarding, props handling
- **Navigation Components**: Desktop and mobile navigation functionality
- **Theme Toggle**: Dark/light mode switching and state management
- **Avatar Component**: Avatar rendering and positioning
- **Header Effects**: Scroll-based animations and effects
- **Responsive Design**: Mobile and desktop breakpoint handling
- **Accessibility**: ARIA attributes and keyboard navigation
- **Integration**: Real-world usage patterns with layouts

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns)
- [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety)
- [Testing with Vitest](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest)
