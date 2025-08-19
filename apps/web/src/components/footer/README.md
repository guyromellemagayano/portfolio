<!-- markdownlint-disable line-length -->
# Footer Component

A comprehensive footer component system featuring a main `Footer` component with navigation links, brand information, and legal text, following our established development standards.

## 📁 File Structure

```bash
footer/
├── Footer.tsx              # Main footer component with client-side logic
├── Footer.module.css       # CSS modules for styling
├── Footer.data.ts          # Data, constants, and type definitions
├── Footer.queries.ts       # Server-side data fetching and caching
├── Footer.test.tsx         # Comprehensive test suite
├── index.ts               # Component exports
└── README.md              # This documentation
```

## 🏗️ Architecture

This component follows the **"inline types for all components"** pattern and uses a **client-server component split** for optimal performance. For detailed information about these architectural patterns, see the [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns) section in the Development Optimization Guide.

## 🚀 Features

- **Main Footer Component**: Client-side component with navigation and brand information
- **Navigation System**: Internal and external links with proper security attributes
- **Discriminated Unions**: Type-safe link handling with `internal`/`external` variants
- **Brand Information**: Customizable brand name and legal text
- **Server-Side Data**: CMS-ready data fetching with caching and revalidation
- **Ref Forwarding**: Supports `React.forwardRef` for proper ref handling
- **CSS Modules**: Scoped styling with **Tailwind CSS** integration
- **Type Safe**: Full **TypeScript** support with proper type inference
- **Responsive Design**: Mobile-first approach with flexible layout
- **Security**: Proper `rel` attributes for external links with `target="_blank"`

## 📖 Usage

### Basic Usage

```typescript
import { Footer } from '@/components/footer'
import { Container, Main } from '@guyromellemagayano/components'

function MyLayout() {
  return (
    <>
      <Container>
        <Main>Page content goes here...</Main>
      </Container>
      <Footer />
    </>
  )
}
```

### With Custom Brand Information

```typescript
import { Footer } from '@/components/footer'

function MyLayout() {
  return (
    <Footer 
      brandName="My Company"
      legalText="© 2024 My Company. All rights reserved."
    />
  )
}
```

### With Custom Navigation Links

```typescript
import { Footer } from '@/components/footer'
import type { FooterLink } from '@/components/footer/Footer.data'

function MyLayout() {
  const customLinks: ReadonlyArray<FooterLink> = [
    { kind: "internal", label: "Home", href: "/" },
    { kind: "internal", label: "Contact", href: "/contact" },
    { 
      kind: "external", 
      label: "GitHub", 
      href: "https://github.com/username", 
      newTab: true 
    },
  ]

  return (
    <Footer navLinks={customLinks} />
  )
}
```

### With Custom Styling

```typescript
import { Footer } from '@/components/footer'

function MyLayout() {
  return (
    <Footer 
      className="custom-footer"
      style={{ backgroundColor: '#f8f9fa' }}
    />
  )
}
```

### Server-Side Data Integration

```typescript
import { getFooterData } from '@/components/footer/Footer.queries'
import { Footer } from '@/components/footer'
import { Container, Main } from '@guyromellemagayano/components'

async function MyLayout() {
  const footerData = await getFooterData()
  
  return (
    <>
      <Container>
        <Main>Page content goes here...</Main>
      </Container>
      <Footer 
        brandName={footerData.brandName}
        legalText={footerData.legalText}
        navLinks={footerData.nav}
      />
    </>
  )
}
```

## 🔧 Props

### Public Props

- `className?: string` - CSS classes for styling
- `brandName?: string` - Custom brand name (default: "Guy Romelle Magayano")
- `legalText?: string` - Custom legal text (default: "All rights reserved.")
- `navLinks?: ReadonlyArray<FooterLink>` - Custom navigation links
- `...rest` - All standard HTML footer attributes

### Internal Props (Not for External Use)

- `_internalId?: string` - Override generated ID for debugging (inherited from CommonWebAppComponentProps)
- `_debugMode?: boolean` - Enable debug logging in development (inherited from CommonWebAppComponentProps)

## 🎨 Styling

The component uses CSS modules with Tailwind CSS integration:

### CSS Module Structure

```css
/* Footer.module.css */
@reference "tailwindcss";

/* Applied to FooterComponent */
.footerComponent {
  @apply w-full border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900;
}

/* Applied to Div (footer content wrapper) */
.footerContent {
  @apply mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:gap-8;
}

/* Applied to Div (brand section) */
.footerBrand {
  @apply flex flex-col items-center gap-1 text-center md:items-start md:text-left;
}

/* Applied to Span (brand name) */
.brandName {
  @apply text-sm font-medium text-gray-900 dark:text-gray-100;
}

/* Applied to Span (legal text) */
.legalText {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

/* Applied to Nav (navigation section) */
.footerNav {
  @apply flex items-center;
}

/* Applied to Ul (navigation list) */
.navList {
  @apply flex flex-wrap items-center gap-6;
}

/* Applied to Li (navigation items) */
.navItem {
  @apply list-none;
}

/* Applied to A (navigation links) */
.navLink {
  @apply text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100;
}
```

### Styling Examples

```typescript
// Custom footer styling
<Footer className="bg-blue-50 border-blue-200" />

// Custom brand styling
<Footer 
  className="custom-footer"
  style={{ 
    '--footer-bg': '#f8f9fa',
    '--footer-border': '#e9ecef'
  }} 
/>
```

## 🔒 Security & Type Safety

This component follows security best practices by using inline types and hiding internal implementation details. For detailed information about security patterns and type safety, see the [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety) section in the Development Optimization Guide.

### Security Features

- **External Link Protection**: Automatically adds `rel="noopener noreferrer"` for external links with `target="_blank"`
- **Type-Safe Links**: Discriminated unions ensure proper link handling
- **XSS Prevention**: Proper attribute handling and sanitization

## 🔧 Implementation Details

### Component Structure

```typescript
import {
  A,
  Div,
  Li,
  Nav,
  Span,
  Ul,
} from "@guyromellemagayano/components";

// Footer.tsx - Main implementation
const InternalFooter = React.forwardRef<FooterRef, InternalFooterProps>(
  function InternalFooter(props, ref) {
    const {
      className,
      componentId,
      isDebugMode,
      brandName = "Guy Romelle Magayano",
      legalText = "All rights reserved.",
      navLinks = FOOTER_COMPONENT_NAV_LINKS,
      ...rest
    } = props;

    return (
      <FooterComponent
        {...rest}
        ref={ref}
        className={cn(styles.footerComponent, className)}
        data-footer-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="footer-root"
      >
        <Div className={styles.footerContent}>
          <Div className={styles.footerBrand}>
            <Span className={styles.brandName}>{brandName}</Span>
            <Span className={styles.legalText}>{legalText}</Span>
          </Div>

          {navLinks.length > 0 && (
            <Nav className={styles.footerNav}>
              <Ul className={styles.navList}>
                {navLinks.map((link) => {
                  const isExternal = link.kind === "external";
                  const href = isExternal ? link.href : link.href.toString();

                  return (
                    <Li key={href} className={styles.navItem}>
                      <A
                        href={href}
                        target={isExternal && link.newTab ? "_blank" : "_self"}
                        rel={
                          isExternal && link.newTab
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={styles.navLink}
                      >
                        {link.label}
                      </A>
                    </Li>
                  );
                })}
              </Ul>
            </Nav>
          )}
        </Div>
      </FooterComponent>
    );
  }
);
```

### Type Definitions

```typescript
// Footer.data.ts - Type definitions
export type FooterLink =
  | { kind: "internal"; label: string; href: InternalHref }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

export type FooterComponentLabels = Readonly<{
  brandName: string;
  legalText: string;
}>;

export type FooterComponentNavLinks = ReadonlyArray<
  Extract<FooterLink, { kind: "internal" }>
>;
```

### Server-Side Data Fetching

```typescript
// Footer.queries.ts - Server-side data
export const getFooterData = unstable_cache(
  async (): Promise<FooterData> => {
    const raw = await fetchFooterRaw();
    return {
      brandName: raw.brandName ?? FOOTER_COMPONENT_LABELS.brandName,
      legalText: raw.legalText ?? FOOTER_COMPONENT_LABELS.legalText,
      nav: raw.nav?.length ? raw.nav : FOOTER_COMPONENT_NAV_LINKS,
      year: raw.year,
    };
  },
  ["footer-data"],
  { revalidate: 3600, tags: [FOOTER_TAG] }
);
```

## 🧪 Testing

Comprehensive test coverage for footer components:

- **Main Footer Component**: Rendering, ref forwarding, props handling
- **Navigation Links**: Internal and external link functionality
- **Brand Information**: Custom brand name and legal text
- **Security**: External link security attributes
- **Responsive Design**: Mobile and desktop layout handling
- **Accessibility**: Semantic structure and ARIA support
- **Edge Cases**: Empty arrays, undefined props, special characters
- **Integration**: Real-world usage patterns with layouts

### Test Coverage

- **41 Test Cases**: Comprehensive coverage of all scenarios
- **80%+ Code Coverage**: Excellent test coverage
- **Security Testing**: External link security validation
- **Type Safety**: Discriminated union testing
- **Performance**: Re-render and prop change testing

## 📚 Related Documentation

- [Development Optimization Guide](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md)
- [Component Architecture Patterns](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#component-architecture-patterns)
- [Security & Type Safety](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-security--type-safety)
- [Testing with Vitest](../../../../../docs/apps/DEVELOPMENT_OPTIMIZATION_GUIDE.md#-testing-with-vitest)
- [Header Component](../header/README.md) - Similar component architecture
