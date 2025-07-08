import fs from "fs";
import path from "path";

import { logInfo } from "@guyromellemagayano/logger";

export interface FileTemplate {
  file: string;
  content: string;
}

export interface ScaffoldOptions {
  name: string;
  overwrite?: boolean;
}

export interface ScaffoldResult {
  success: boolean;
  filesCreated: string[];
  errors: string[];
}

/**
 * Validates component name according to PascalCase convention
 */
export function validateComponentName(name: string): {
  isValid: boolean;
  error?: string;
} {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: "Component name cannot be empty" };
  }

  if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
    return {
      isValid: false,
      error: "Component name must be in PascalCase (e.g., MyComponent)",
    };
  }

  return { isValid: true };
}

/**
 * Creates server component template
 */
export function createServerTemplate(name: string): string {
  return `import React from 'react';
import './styles.css';

export interface ${name}Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  isClient?: boolean;
  isMemoized?: boolean;
  analyticsId?: string;
  onAnalytics?: (data: unknown) => void;
}

const ${name} = React.forwardRef<HTMLElement, ${name}Props>(
  ({ as: Component = 'div', children, className = '', ...props }, ref) => {
    return (
      <Component ref={ref} className={\`component-name \${className}\`} {...props}>
        {children}
      </Component>
    );
  }
);

${name}.displayName = '${name}';
export default ${name};
`;
}

/**
 * Creates client component template
 */
export function createClientTemplate(name: string): string {
  return `"use client";
import React from 'react';
import ServerComponent, { ${name}Props } from './index';

const ${name}Client = React.memo(
  React.forwardRef<HTMLElement, ${name}Props>((props, ref) => {
    return <ServerComponent {...props} ref={ref} />;
  })
);

${name}Client.displayName = '${name}Client';
export default ${name}Client;
`;
}

/**
 * Creates styles template
 */
export function createStylesTemplate(name: string): string {
  return `.component-name {
  /* BEM base styles for ${name} */
}
`;
}

/**
 * Creates test template
 */
export function createTestTemplate(name: string): string {
  return `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${name} from './index';

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name}>Test</${name}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
`;
}

/**
 * Creates README template
 */
export function createReadmeTemplate(name: string): string {
  const componentNameLower = name.toLowerCase();
  return `# ${name}

[Brief one-sentence description]

## Overview

[2-3 sentences explaining purpose, features, and when to use]

## Installation

\`\`\`bash
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
# or
pnpm add @guyromellemagayano/components
\`\`\`

## Basic Usage

\`\`\`tsx
import { ${name} } from '@guyromellemagayano/components';

function MyComponent() {
  return (
    <${name}>
      Content goes here
    </${name}>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | The content to render inside the component |
| className | string | - | Additional CSS classes to apply |
| style | React.CSSProperties | - | Inline styles to apply |
| as | ComponentType \\| string | "element" | The HTML element or custom component to render as |
| isClient | boolean | false | Whether to render as a client component |
| isMemoized | boolean | false | Whether to use memoized client component |
| analyticsId | string | - | Analytics identifier for tracking interactions |
| onAnalytics | function | - | Custom analytics function |
| [key: data-\${string}] | string \\| undefined | - | Support for data attributes commonly used in testing |

### Component-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| [componentSpecificProp] | [Type] | [Default] | [Description] |

## Examples

### Basic Example

\`\`\`tsx
import { ${name} } from '@guyromellemagayano/components';

function BasicExample() {
  return (
    <${name}>
      Basic content
    </${name}>
  );
}
\`\`\`

### With Custom Styling

\`\`\`tsx
import { ${name} } from '@guyromellemagayano/components';

function StyledExample() {
  return (
    <${name} 
      className="custom-class"
      style={{ backgroundColor: 'blue' }}
    >
      Styled content
    </${name}>
  );
}
\`\`\`

### With Analytics

\`\`\`tsx
import { ${name} } from '@guyromellemagayano/components';

function AnalyticsExample() {
  const handleAnalytics = (data) => {
    console.log('Analytics event:', data);
  };

  return (
    <${name} 
      analyticsId="my-component"
      onAnalytics={handleAnalytics}
    >
      Tracked content
    </${name}>
  );
}
\`\`\`

### Polymorphic Rendering

\`\`\`tsx
import { ${name} } from '@guyromellemagayano/components';

function PolymorphicExample() {
  const CustomElement = React.forwardRef((props, ref) => (
    <div {...props} ref={ref} data-custom="true" />
  ));

  return (
    <${name} as={CustomElement}>
      Custom element content
    </${name}>
  );
}
\`\`\`

### Client-Side Rendering

\`\`\`tsx
import { ${name} } from '@guyromellemagayano/components';

function ClientExample() {
  return (
    <${name} 
      isClient 
      isMemoized
    >
      Client-side content
    </${name}>
  );
}
\`\`\`

## Accessibility

This component follows accessibility best practices:

- **Semantic HTML**: Uses appropriate HTML elements and ARIA attributes
- **Keyboard Navigation**: Supports keyboard interaction where applicable
- **Screen Readers**: Provides proper labels and descriptions
- **Focus Management**: Maintains logical focus order
- **High Contrast**: Supports high contrast mode preferences
- **Reduced Motion**: Respects user's motion preferences

### ARIA Attributes

- role: Set to appropriate semantic role
- aria-label: Provides accessible name
- aria-describedby: Links to descriptive text when needed

## Styling

The component uses BEM (Block Element Modifier) methodology for CSS classes:

### Base Classes

- .component-name - Base component class

### Modifiers

- .component-name--modifier - State or variant modifiers

### Customization

You can customize the component using:

1. **CSS Classes**: Add your own classes via the className prop
2. **Inline Styles**: Use the style prop for component-specific styling
3. **CSS Variables**: Override default values using CSS custom properties
4. **CSS Modules**: Import and use the component's CSS module

### CSS Variables

\`\`\`css
.component-name {
  --component-name-color: inherit;
  --component-name-background: transparent;
  --component-name-border: 1px solid currentColor;
  --component-name-border-radius: 0.375rem;
  --component-name-padding: 0.5rem;
  --component-name-font-size: 1rem;
  --component-name-line-height: 1.5;
}
\`\`\`

## Testing

The component includes comprehensive test coverage:

### Test Files

- index.test.tsx - Main component tests
- index.client.test.tsx - Client component tests (if applicable)

### Test Coverage

- **Rendering**: Basic rendering and prop application
- **Interactions**: User interactions and event handling
- **Accessibility**: ARIA attributes and keyboard navigation
- **Analytics**: Analytics tracking and custom functions
- **Polymorphic**: Custom component rendering
- **Edge Cases**: Error states and boundary conditions

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run component-specific tests
npm test src/${componentNameLower}/index.test.tsx

# Run with coverage
npm test -- --coverage
\`\`\`

## Performance

The component is optimized for performance:

- **Memoization**: Uses React.memo for client components
- **Lazy Loading**: Client components are loaded on demand
- **Bundle Splitting**: Server and client code are separated
- **Tree Shaking**: Unused code is eliminated in production builds

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Accessibility**: Screen readers and assistive technologies

## TypeScript

Full TypeScript support is included:

\`\`\`tsx
import { ${name}, type ${name}Props, type ${name}Ref } from '@guyromellemagayano/components';

const MyComponent: React.FC = () => {
  const ref = useRef<${name}Ref>(null);
  
  return <${name} ref={ref}>Content</${name}>;
};
\`\`\`

## Migration Guide

### From Legacy Component

If migrating from a legacy version:

1. **Import Changes**: Update import statements
2. **Prop Changes**: Review and update prop names
3. **Styling**: Update CSS class names to BEM format
4. **Analytics**: Migrate to new analytics system

### Breaking Changes

- [List any breaking changes from previous versions]

## Contributing

When contributing to this component:

1. **Follow Standards**: Adhere to component library standards
2. **Add Tests**: Include comprehensive test coverage
3. **Update Docs**: Keep documentation current
4. **Accessibility**: Ensure accessibility compliance
5. **Performance**: Consider performance implications

## Related Components

- [Link to related components in the library]

## Changelog

### [Version] - [Date]

- **Added**: New features
- **Changed**: Breaking changes
- **Deprecated**: Features to be removed
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security updates
`;
}

/**
 * Generates all file templates for a component
 */
export function generateFileTemplates(name: string): FileTemplate[] {
  return [
    { file: "index.tsx", content: createServerTemplate(name) },
    { file: "index.client.tsx", content: createClientTemplate(name) },
    { file: "styles.css", content: createStylesTemplate(name) },
    { file: "README.md", content: createReadmeTemplate(name) },
    { file: "index.test.tsx", content: createTestTemplate(name) },
  ];
}

/**
 * Scaffolds a new component with all required files
 */
export async function scaffoldComponent(
  options: ScaffoldOptions,
  srcDir: string
): Promise<ScaffoldResult> {
  const { name, overwrite = false } = options;
  const result: ScaffoldResult = {
    success: false,
    filesCreated: [],
    errors: [],
  };

  try {
    // Validate component name
    const validation = validateComponentName(name);
    if (!validation.isValid) {
      result.errors.push(validation.error!);
      return result;
    }

    const dir = path.join(srcDir, name.toLowerCase());

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      logInfo(`📁 Created directory: ${dir}`);
    }

    // Generate file templates
    const files = generateFileTemplates(name);

    // Write files
    for (const { file, content } of files) {
      const filePath = path.join(dir, file);

      if (fs.existsSync(filePath) && !overwrite) {
        result.errors.push(
          `File ${filePath} already exists and overwrite is disabled`
        );
        continue;
      }

      try {
        fs.writeFileSync(filePath, content);
        result.filesCreated.push(filePath);
        logInfo(`✅ Created ${filePath}`);
      } catch (error) {
        result.errors.push(
          `Failed to create ${filePath}: ${(error as Error).message}`
        );
      }
    }

    result.success = result.errors.length === 0;
    return result;
  } catch (error) {
    result.errors.push(`Scaffolding failed: ${(error as Error).message}`);
    return result;
  }
}
