#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

import { logError, logInfo } from "@guyromellemagayano/logger";

import {
  type ElementCategory,
  type ElementSpecificPropsConfig,
  getElementConfig,
} from "../src/types";

// =============================================================================
// TYPES AND INTERFACES
// =============================================================================

export interface FileTemplate {
  file: string;
  content: string;
}

export interface ScaffoldOptions {
  name: string;
  overwrite?: boolean;
  // Future enhancements
  type?: "element" | "composite" | "pattern" | "hook" | "integration";
  includes?: string[]; // For composite components
  variants?: string[]; // For pattern-based scaffolding
  theme?: string; // For theme-specific variants
  integration?: "storybook" | "figma" | "cms" | "testing";
  framework?: "react" | "vue" | "angular" | "svelte";
  testSuite?: "unit" | "integration" | "e2e" | "performance" | "accessibility";
}

export interface ScaffoldResult {
  success: boolean;
  filesCreated: string[];
  errors: string[];
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

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
 * Generate element-specific props interface based on element configuration
 */
function generateElementProps(
  name: string,
  config: ElementSpecificPropsConfig
): string {
  const componentNameLower = name.toLowerCase();
  const {
    element,
    category,
    commonProps = [],
    specificProps = [],
    defaultVariants = ["default"],
    supportsVariants = true,
    supportsStates = true,
  } = config;

  // Determine the appropriate React HTML attributes interface
  const htmlAttributesInterface = getHTMLAttributesInterface(element);

  // Generate variant type
  const variantType = supportsVariants
    ? `export type ${name}Variant = ${defaultVariants.map((v) => `"${v}"`).join(" | ")};`
    : "";

  // Generate analytics interface
  const analyticsInterface = `export interface ${name}AnalyticsData {
  event: string;
  category: string;
  label: string;
  action: string;
  ${category === "media" ? "duration?: number;\n  position?: number;" : ""}
  ${category === "interactive" ? 'interactionType?: "mouse" | "touch" | "keyboard";' : ""}
  ${category === "form" ? "formData?: Record<string, unknown>;" : ""}
}`;

  // Generate element-specific props based on category
  const elementSpecificProps = generateCategorySpecificProps(
    category,
    name,
    commonProps,
    specificProps
  );

  // Generate main props interface
  const propsInterface = `export interface ${name}Props
  extends ${htmlAttributesInterface},
    CommonComponentProps {
  ${elementSpecificProps}
}`;

  return [variantType, analyticsInterface, propsInterface]
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Get appropriate React HTML attributes interface for element
 */
function getHTMLAttributesInterface(element: string): string {
  const interfaceMap: Record<string, string> = {
    a: "React.AnchorHTMLAttributes<HTMLAnchorElement>",
    audio: "React.AudioHTMLAttributes<HTMLAudioElement>",
    video: "React.VideoHTMLAttributes<HTMLVideoElement>",
    img: "React.ImgHTMLAttributes<HTMLImageElement>",
    input: "React.InputHTMLAttributes<HTMLInputElement>",
    textarea: "React.TextareaHTMLAttributes<HTMLTextAreaElement>",
    select: "React.SelectHTMLAttributes<HTMLSelectElement>",
    form: "React.FormHTMLAttributes<HTMLFormElement>",
    button: "React.ButtonHTMLAttributes<HTMLButtonElement>",
    canvas: "React.CanvasHTMLAttributes<HTMLCanvasElement>",
    table: "React.TableHTMLAttributes<HTMLTableElement>",
    th: "React.ThHTMLAttributes<HTMLTableHeaderCellElement>",
    td: "React.TdHTMLAttributes<HTMLTableDataCellElement>",
    ol: "React.OlHTMLAttributes<HTMLOListElement>",
    li: "React.LiHTMLAttributes<HTMLLIElement>",
    blockquote: "React.BlockquoteHTMLAttributes<HTMLQuoteElement>",
    // Add more specific mappings as needed
  };

  return interfaceMap[element] || "React.HTMLAttributes<HTMLElement>";
}

/**
 * Generate category-specific props based on element category
 */
function generateCategorySpecificProps(
  category: ElementCategory,
  name: string,
  commonProps: string[],
  specificProps: string[]
): string {
  const baseProps = `/** Analytics identifier for tracking */
  analyticsId?: string;
  /** Custom analytics function */
  onAnalytics?: (data: ${name}AnalyticsData) => void;`;

  switch (category) {
    case "interactive":
      return `${generateVariantProps(name, commonProps)}
  ${baseProps}
  /** Whether the element is active */
  active?: boolean;
  /** Whether the element is disabled */
  disabled?: boolean;
  /** Whether the element is in a loading state */
  loading?: boolean;
  /** Icon to display alongside content */
  icon?: React.ReactNode;
  /** Position of the icon relative to content */
  iconPosition?: "left" | "right";
  /** Tooltip text */
  tooltip?: string;`;

    case "form":
      return `${generateVariantProps(name, commonProps)}
  ${baseProps}
  /** Whether the field has an error */
  error?: boolean;
  /** Helper text to display below the field */
  helperText?: string;
  /** Label text for the field */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Whether the field should take full width */
  fullWidth?: boolean;
  /** Size variant */
  size?: "small" | "medium" | "large";`;

    case "media":
      return `${generateVariantProps(name, commonProps)}
  ${baseProps}
  /** Whether the media is in a loading state */
  loading?: boolean;
  /** Content to show during loading */
  loadingContent?: React.ReactNode;
  /** Content to show on error */
  errorContent?: React.ReactNode;`;

    case "content":
      return `${generateVariantProps(name, commonProps)}
  ${baseProps}
  /** Text size variant */
  size?: "small" | "medium" | "large";
  /** Text color variant */
  color?: "default" | "primary" | "secondary" | "muted";
  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";
  /** Whether to truncate text */
  truncate?: boolean;
  /** Whether to prevent text wrapping */
  noWrap?: boolean;`;

    case "text":
      return `${generateVariantProps(name, commonProps)}
  ${baseProps}
  /** Text size variant */
  size?: "small" | "medium" | "large";
  /** Text color variant */
  color?: "default" | "primary" | "secondary" | "muted";
  /** Font weight */
  weight?: "normal" | "medium" | "semibold" | "bold";
  /** Whether text is italic */
  italic?: boolean;
  /** Whether text is underlined */
  underline?: boolean;
  /** Whether text is struck through */
  strikethrough?: boolean;`;

    case "structure":
      return `${generateVariantProps(name, commonProps)}
  ${baseProps}
  /** Padding variant */
  padding?: "none" | "small" | "medium" | "large";
  /** Margin variant */
  margin?: "none" | "small" | "medium" | "large";
  /** Border variant */
  border?: "none" | "light" | "medium" | "heavy";
  /** Shadow variant */
  shadow?: "none" | "small" | "medium" | "large";
  /** Border radius variant */
  rounded?: "none" | "small" | "medium" | "large" | "full";`;

    default:
      return `${generateVariantProps(name, commonProps)}
  ${baseProps}
  /** Whether the element is active */
  active?: boolean;
  /** Whether the element is disabled */
  disabled?: boolean;`;
  }
}

/**
 * Generate variant props if supported
 */
function generateVariantProps(name: string, commonProps: string[]): string {
  if (commonProps.includes("variant")) {
    return `/** Visual variant of the component */
  variant?: ${name}Variant;`;
  }
  return "";
}

/**
 * Gets appropriate semantic element for component name
 */
function getSemanticElement(name: string): string {
  const semanticElements: Record<string, string> = {
    // HTML5 semantic elements
    Article: "article",
    Aside: "aside",
    Footer: "footer",
    Header: "header",
    Main: "main",
    Nav: "nav",
    Section: "section",

    // Form elements
    Button: "button",
    Input: "input",
    Textarea: "textarea",
    Select: "select",
    Form: "form",
    Label: "label",

    // Media elements
    Audio: "audio",
    Video: "video",
    Canvas: "canvas",
    Image: "img",
    Img: "img",

    // Table elements
    Table: "table",
    Caption: "caption",
    Tr: "tr",
    Th: "th",
    Td: "td",

    // Content elements
    Paragraph: "p",
    P: "p",
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",

    // Text elements
    Span: "span",
    Strong: "strong",
    Em: "em",
    A: "a",

    // List elements
    Ul: "ul",
    Ol: "ol",
    Li: "li",

    // Structure elements
    Div: "div",
    Body: "body",
    Html: "html",
    Head: "head",

    // Formatting elements
    Br: "br",
    Hr: "hr",
    Blockquote: "blockquote",

    // Meta elements
    Title: "title",
    Meta: "meta",
    Base: "base",

    // Text formatting
    B: "b",
    I: "i",
    Abbr: "abbr",
    Address: "address",
    Bdi: "bdi",
    Bdo: "bdo",
    Area: "area",
  };

  return semanticElements[name] || "div";
}

/**
 * Creates server component template with element-specific patterns
 */
export function createServerTemplate(name: string): string {
  const componentNameLower = name.toLowerCase();
  const componentElement = getSemanticElement(name);
  const elementConfig = getElementConfig(name);

  if (!elementConfig) {
    // Fallback to generic template for unknown elements
    return createGenericServerTemplate(name);
  }

  const { category, supportsVariants, supportsStates } = elementConfig;
  const propsInterface = generateElementProps(name, elementConfig);

  return `import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

import "./styles.css";

// Lazy load client components for code splitting
const ${name}Client = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.${name}Client };
});

const Memoized${name}Client = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.Memoized${name}Client };
});

export type ${name}Ref = React.ComponentRef<"${componentElement}">;

${propsInterface}

/**
 * Fire analytics tracking for ${componentNameLower} interactions
 */
function fire${name}Analytics(
  analyticsId: string,
  action: string
): void {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).gtag) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", action, {
        event_category: "${componentNameLower}",
        event_label: analyticsId,
      });
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("${name} analytics tracking failed:", error);
    }
  }
}

/**
 * Universal ${componentNameLower} component with analytics, accessibility, and ${category} features.
 * Supports server-side and client-side rendering with comprehensive functionality.
 */
const ${name}Component = React.forwardRef<${name}Ref, ${name}Props>(
  (props, ref) => {
    const {
      analyticsId,
      onAnalytics,
      ${supportsVariants ? 'variant = "default",' : ""}
      ${supportsStates ? "active = false," : ""}
      ${supportsStates ? "disabled = false," : ""}
      as: Component = "${componentElement}",
      isClient = false,
      isMemoized = false,
      children,
      className,
      style,
      onClick,
      onMouseEnter,
      onFocus,
      ...rest
    } = props;

    const componentRef = useRef<HTMLElement>(null);
    const asElement = typeof Component === "string" ? Component : "unknown";

    // Runtime validation for development
    useMemo(() => {
      validatePolymorphicProps(
        "${name}",
        asElement,
        props as Record<string, unknown>,
        ELEMENT_CONFIGS.${name.toUpperCase()} || {
          element: "${componentElement}",
          specificProps: [],
          description: "${name}-specific properties",
          category: "${category}",
        }
      );
    }, [asElement, props]);

    // Basic event handlers
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (analyticsId) {
          fire${name}Analytics(analyticsId, "click");
        }

        // Call custom analytics function if provided
        if (onAnalytics) {
          onAnalytics({
            event: "interact",
            category: "${componentNameLower}",
            action: "click",
            label: analyticsId || "${componentNameLower}-interaction",
          });
        }

        onClick?.(event);
      },
      [analyticsId, onAnalytics, onClick]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick(event as unknown as React.MouseEvent<HTMLElement>);
        }
      },
      [handleClick]
    );

    // Enhanced props with accessibility and ${category} features
    const enhancedProps = useMemo(
      () => ({
        ...rest,
        ref: ref || componentRef,
        className: [
          "${componentNameLower}",
          ${supportsVariants ? `variant && \`${componentNameLower}--\${variant}\`,` : ""}
          ${supportsStates ? `active && "${componentNameLower}--active",` : ""}
          ${supportsStates ? `disabled && "${componentNameLower}--disabled",` : ""}
          className,
        ]
          .filter(Boolean)
          .join(" "),
        style,
        ${supportsStates ? `"aria-disabled": disabled ? "true" : undefined,` : ""}
        ${supportsStates ? `tabIndex: disabled ? -1 : rest.tabIndex,` : ""}
        "data-analytics-id": analyticsId || undefined,
        ${supportsStates ? `"data-active": active ? "true" : undefined,` : ""}
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      }),
      [rest, ref, className, style, analyticsId, ${supportsVariants ? "variant," : ""} ${supportsStates ? "active, disabled," : ""} handleClick, handleKeyDown]
    );

    // Base component element
    const componentElement = <Component {...enhancedProps}>{children}</Component>;

    // Client-side rendering
    if (isClient) {
      const ClientComponent = isMemoized ? Memoized${name}Client : ${name}Client;

      return (
        <div className="${componentNameLower}-wrapper">
          <Suspense fallback={componentElement}>
            <ClientComponent
              {...props}
              ref={ref}
            >
              {children}
            </ClientComponent>
          </Suspense>
        </div>
      );
    }

    return componentElement;
  }
);

${name}Component.displayName = "${name}";

export const ${name} = ${name}Component;
export default ${name};
`;
}

/**
 * Generate fallback generic template for unknown elements
 */
function createGenericServerTemplate(name: string): string {
  const componentNameLower = name.toLowerCase();
  const componentElement = getSemanticElement(name);

  return `import React, {
  Suspense,
  useCallback,
  useMemo,
  useRef,
} from "react";

import {
  type CommonComponentProps,
  ELEMENT_CONFIGS,
  validatePolymorphicProps,
} from "../types";

import "./styles.css";

const ${name}Client = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.${name}Client };
});

const Memoized${name}Client = React.lazy(async () => {
  const module = await import("./index.client");
  return { default: module.Memoized${name}Client };
});

export type ${name}Ref = React.ComponentRef<"${componentElement}">;

export interface ${name}Props
  extends React.HTMLAttributes<HTMLElement>,
    CommonComponentProps {
  /** Analytics identifier for tracking */
  analyticsId?: string;
}

const ${name}Component = React.forwardRef<${name}Ref, ${name}Props>(
  (props, ref) => {
    const {
      analyticsId,
      as: Component = "${componentElement}",
      isClient = false,
      isMemoized = false,
      children,
      className,
      style,
      ...rest
    } = props;

    const componentRef = useRef<HTMLElement>(null);
    const asElement = typeof Component === "string" ? Component : "unknown";

    useMemo(() => {
      validatePolymorphicProps(
        "${name}",
        asElement,
        props as Record<string, unknown>,
        ELEMENT_CONFIGS.${name.toUpperCase()} || {
          element: "${componentElement}",
          specificProps: [],
          description: "${name}-specific properties",
          category: "structure",
        }
      );
    }, [asElement, props]);

    const enhancedProps = useMemo(
      () => ({
        ...rest,
        ref: ref || componentRef,
        className: [
          "${componentNameLower}",
          className,
        ]
          .filter(Boolean)
          .join(" "),
        style,
        "data-analytics-id": analyticsId || undefined,
      }),
      [rest, ref, className, style, analyticsId]
    );

    const componentElement = <Component {...enhancedProps}>{children}</Component>;

    if (isClient) {
      const ClientComponent = isMemoized ? Memoized${name}Client : ${name}Client;

      return (
        <div className="${componentNameLower}-wrapper">
          <Suspense fallback={componentElement}>
            <ClientComponent
              {...props}
              ref={ref}
            >
              {children}
            </ClientComponent>
          </Suspense>
        </div>
      );
    }

    return componentElement;
  }
);

${name}Component.displayName = "${name}";

export const ${name} = ${name}Component;
export default ${name};
`;
}

/**
 * Creates client component template with element-specific interactivity
 */
export function createClientTemplate(name: string): string {
  const componentNameLower = name.toLowerCase();

  return `"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import type { ${name}Props, ${name}Ref } from "./index";

export const ${name}Client = forwardRef<${name}Ref, ${name}Props>(
  (props, ref) => {
    const {
      analyticsId,
      onAnalytics,
      children,
      className,
      ...rest
    } = props;

    const internalRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const element = internalRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting && analyticsId && onAnalytics) {
            onAnalytics({
              event: "view",
              category: "${componentNameLower}",
              label: analyticsId,
              action: "visible",
            });
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, [analyticsId, onAnalytics]);

    return (
      <div
        {...rest}
        ref={ref || internalRef}
        className={\`${componentNameLower} ${componentNameLower}--client \${className || ""}\`}
        data-visible={isVisible}
        data-analytics-id={analyticsId}
      >
        {children}
      </div>
    );
  }
);

${name}Client.displayName = "${name}Client";

export const Memoized${name}Client = React.memo(${name}Client);

export default ${name}Client;
`;
}

/**
 * Creates BEM CSS styles template with element-specific styling
 */
export function createStylesTemplate(name: string): string {
  const componentNameLower = name.toLowerCase();

  return `/* ${name} Component Styles */
/* BEM Methodology: Block Element Modifier */

.${componentNameLower} {
  position: relative;
  box-sizing: border-box;
  
  font-family: var(--font-family-base, system-ui, -apple-system, sans-serif);
  font-size: var(--${componentNameLower}-font-size, 1rem);
  line-height: var(--${componentNameLower}-line-height, 1.5);
  
  color: var(--${componentNameLower}-color, #1f2937);
  background-color: var(--${componentNameLower}-background, transparent);
  
  border: var(--${componentNameLower}-border, none);
  border-radius: var(--${componentNameLower}-border-radius, 0);
  
  margin: var(--${componentNameLower}-margin, 0);
  padding: var(--${componentNameLower}-padding, 0);
  
  transition: var(--${componentNameLower}-transition, all 0.2s ease);
}

.${componentNameLower}--default {
  /* Default variant styling */
}

.${componentNameLower}--active {
  opacity: var(--${componentNameLower}-active-opacity, 1);
}

.${componentNameLower}--disabled {
  opacity: var(--${componentNameLower}-disabled-opacity, 0.6);
  pointer-events: none;
  cursor: not-allowed;
}

.${componentNameLower}--client {
  /* Client-side specific styling */
}

.${componentNameLower}:focus-visible {
  outline: 2px solid var(--${componentNameLower}-focus-color, #3b82f6);
  outline-offset: 2px;
}

@media (prefers-color-scheme: dark) {
  .${componentNameLower} {
    --${componentNameLower}-color: #f9fafb;
  }
}

@media (prefers-contrast: high) {
  .${componentNameLower} {
    --${componentNameLower}-border: 1px solid currentColor;
  }
}

@media (prefers-reduced-motion: reduce) {
  .${componentNameLower} {
    --${componentNameLower}-transition: none;
  }
}
`;
}

/**
 * Creates comprehensive README.md template with component documentation
 */
export function createReadmeTemplate(name: string): string {
  const componentNameLower = name.toLowerCase();
  const elementConfig = getElementConfig(name);

  return `<!-- markdownlint-disable line-length descriptive-link-text -->
# ${name} Component

An accessible ${componentNameLower} component with robust analytics tracking, polymorphic rendering capabilities, and comprehensive event handling. Designed for ${elementConfig?.description || "diverse use cases"}, prioritizing high performance and accessibility standards.

## 📋 Table of Contents

- [${name} Component](#${componentNameLower}-component)
  - [📋 Table of Contents](#-table-of-contents)
  - [📖 Overview](#-overview)
    - [Purpose](#purpose)
    - [Key Features](#key-features)
  - [🚀 Quick Start](#-quick-start)
    - [Installation](#installation)
    - [Basic Usage](#basic-usage)
  - [⚙️ Props](#️-props)
    - [Standard Props](#standard-props)
    - [Component-Specific Props](#component-specific-props)
  - [💡 Examples](#-examples)
    - [Basic Example](#basic-example)
    - [Variants Example](#variants-example)
    - [With Custom Styling](#with-custom-styling)
    - [With Analytics](#with-analytics)
    - [Polymorphic Rendering](#polymorphic-rendering)
    - [Client-Side Rendering](#client-side-rendering)
  - [♿ Accessibility](#-accessibility)
    - [Best Practices Followed](#best-practices-followed)
    - [ARIA Attributes](#aria-attributes)
  - [🎨 Styling](#-styling)
    - [BEM Methodology](#bem-methodology)
    - [Base Classes](#base-classes)
    - [Modifiers](#modifiers)
    - [Customization Options](#customization-options)
    - [CSS Variables](#css-variables)
  - [🧪 Testing](#-testing)
    - [Test Files](#test-files)
    - [Test Coverage](#test-coverage)
    - [Running Tests](#running-tests)
  - [⚡ Performance](#-performance)
    - [Optimization Techniques](#optimization-techniques)
  - [🌐 Browser Support](#-browser-support)
  - [📘 TypeScript](#-typescript)
  - [📚 Migration Guide](#-migration-guide)
    - [From Legacy Component](#from-legacy-component)
    - [Breaking Changes](#breaking-changes)
  - [🤝 Contributing](#-contributing)
    - [Contribution Guidelines](#contribution-guidelines)
  - [🔗 Related Components](#-related-components)

## 📖 Overview

### Purpose

The \`${name}\` component provides a flexible, accessible HTML ${componentNameLower} element. It supports a range of functionalities including built-in analytics tracking, polymorphic rendering, and comprehensive event handling. It is engineered to maintain high performance and adhere to strict accessibility standards.

### Key Features

- **Analytics Tracking**: Integrated support for tracking user interactions.
- **Polymorphic Rendering**: Ability to render as different HTML elements or custom components.
- **Comprehensive Event Handling**: Robust handling of various user events.
- **High Performance**: Optimized for fast rendering and efficient updates.
- **Accessibility Compliance**: Built with WCAG 2.1 AA standards in mind.

## 🚀 Quick Start

### Installation

To use the \`${name}\` component in your project, install the \`@guyromellemagayano/components\` package:

\`\`\`bash
pnpm add @guyromellemagayano/components
# or
npm install @guyromellemagayano/components
# or
yarn add @guyromellemagayano/components
\`\`\`

### Basic Usage

Import the \`${name}\` component and use it in your React application:

\`\`\`typescript
import { ${name} } from '@guyromellemagayano/components';

function MyComponent() {
  return (
    <${name}>
      Content here
    </${name}>
  );
}
\`\`\`

## ⚙️ Props

### Standard Props

These props are common across many components in the library.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`React.ReactNode\` | - | The content to render inside the component. |
| \`className\` | \`string\` | - | Additional CSS classes to apply to the component. |
| \`style\` | \`React.CSSProperties\` | - | Inline styles to apply to the component. |
| \`as\` | \`React.ElementType\` \\| \`string\` | \`"${componentNameLower}"\` | The HTML element or custom component to render as. Defaults to \`"${componentNameLower}"\`. |
| \`isClient\` | \`boolean\` | \`false\` | If \`true\`, the component will be rendered client-side, enabling client-only features. |
| \`isMemoized\` | \`boolean\` | \`false\` | If \`true\` and \`isClient\` is also \`true\`, the client component will be memoized for performance optimization. |
| \`analyticsId\` | \`string\` | - | A unique identifier for analytics tracking of component interactions. |
| \`onAnalytics\` | \`(data: { event: string; category: string; label: string; content: string; }) => void\` | - | A custom function to handle analytics events. If provided, it overrides the default analytics behavior. |
| \`[key: data-\${string}]\` | \`string \\| undefined\` | - | Supports arbitrary \`data-*\` attributes for testing and debugging purposes. |

### Component-Specific Props

These props are unique to the \`${name}\` component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`'default' \\| 'primary' \\| 'secondary' \\| 'unstyled'\` | \`'default'\` | The visual variant of the component, affecting its appearance. |
| \`active\` | \`boolean\` | \`false\` | If \`true\`, applies active styling and appropriate ARIA attributes. |
| \`disabled\` | \`boolean\` | \`false\` | If \`true\`, disables the component, making it non-interactive. |
| \`loading\` | \`boolean\` | \`false\` | If \`true\`, shows a loading state and disables interactions. |

## 💡 Examples

### Basic Example

Demonstrates the fundamental usage of the \`${name}\` component.

\`\`\`typescript
import { ${name} } from '@guyromellemagayano/components';

function Basic${name}Example() {
  return (
    <${name}>
      Basic ${componentNameLower} content
    </${name}>
  );
}
\`\`\`

### Variants Example

Shows the different visual variants of the \`${name}\` component.

\`\`\`typescript
import { ${name} } from '@guyromellemagayano/components';
import React from 'react';

function Variants${name}Example() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <${name} variant="default">Default</${name}>
      <${name} variant="primary">Primary</${name}>
      <${name} variant="secondary">Secondary</${name}>
      <${name} variant="unstyled">Unstyled</${name}>
    </div>
  );
}
\`\`\`

### With Custom Styling

Applies custom CSS classes and inline styles to the \`${name}\` component.

\`\`\`typescript
import { ${name} } from '@guyromellemagayano/components';

function Styled${name}Example() {
  return (
    <${name} 
      className="custom-class"
      style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}
    >
      Custom styled ${componentNameLower}
    </${name}>
  );
}
\`\`\`

### With Analytics

Integrates analytics tracking for interactions with the \`${name}\` component.

\`\`\`typescript
import { ${name} } from '@guyromellemagayano/components';

function Analytics${name}Example() {
  const handleAnalytics = (data) => {
    console.log('Analytics event recorded:', data);
    // Example: send to your analytics platform
    // trackEvent(data.event, data.category, data.label, data.content);
  };

  return (
    <${name} 
      analyticsId="${componentNameLower}-example"
      onAnalytics={handleAnalytics}
    >
      Tracked ${componentNameLower}
    </${name}>
  );
}
\`\`\`

### Polymorphic Rendering

Shows how to render the \`${name}\` component as a different HTML element or a custom React component.

\`\`\`typescript
import { ${name} } from '@guyromellemagayano/components';

function Polymorphic${name}Example() {
  const CustomComponent = React.forwardRef((props, ref) => (
    <section {...props} ref={ref} className="custom-section" />
  ));

  return (
    <${name} as={CustomComponent}>
      Custom component rendering
    </${name}>
  );
}
\`\`\`

### Client-Side Rendering

Demonstrates usage of \`${name}\` component with client-side rendering and memoization.

\`\`\`typescript
import { ${name} } from '@guyromellemagayano/components';

function Client${name}Example() {
  return (
    <${name} 
      isClient 
      isMemoized // Optional: for memoized client component
    >
      Client-side ${componentNameLower}
    </${name}>
  );
}
\`\`\`

## ♿ Accessibility

### Best Practices Followed

This component is built following key accessibility best practices:

- **Semantic HTML**: Utilizes the native \`<${componentNameLower}>\` element, ensuring inherent accessibility.
- **Keyboard Navigation**: Fully navigable via keyboard, supporting focus, activation, and tab order.
- **Screen Reader Support**: Provides appropriate labels and descriptions for screen reader users.
- **State Management**: Handles \`active\`, \`disabled\`, and \`loading\` states with correct ARIA attributes.
- **Focus Management**: Ensures logical focus order and visible focus indicators.
- **High Contrast**: Designed to be usable in high contrast mode preferences.
- **Reduced Motion**: Respects user's \`prefers-reduced-motion\` preferences to disable animations.

### ARIA Attributes

Relevant ARIA attributes are applied to enhance accessibility where needed:

- \`role\`: Set to an appropriate semantic role if the \`as\` prop changes the element type.
- \`aria-label\`: Can be used to provide an accessible name when needed.
- \`aria-disabled\`: Automatically set to \`true\` when \`disabled\` or \`loading\` props are true.
- \`aria-describedby\`: Links to descriptive text when additional context is needed.

## 🎨 Styling

### BEM Methodology

This component uses BEM (Block Element Modifier) methodology for its CSS classes, ensuring a clear and maintainable styling structure.

### Base Classes

- \`.${componentNameLower}\` : The base class for the \`${name}\` component, defining its fundamental styles.

### Modifiers

- \`.${componentNameLower}--[variant]\`: Applied for each variant (e.g., \`.${componentNameLower}--default\`, \`.${componentNameLower}--primary\`).
- \`.${componentNameLower}--active\`: Applied when the \`active\` prop is \`true\`.
- \`.${componentNameLower}--disabled\`: Applied when \`disabled\` or \`loading\` props are \`true\`.
- \`.${componentNameLower}--loading\`: Applied when the \`loading\` prop is \`true\`.
- \`.${componentNameLower}--client\`: Applied when rendered client-side.

### Customization Options

You can customize the component's appearance using various methods:

1. **CSS Classes**: Extend or override styles by passing your own classes via the \`className\` prop.
2. **Inline Styles**: Apply component-specific styling directly using the \`style\` prop.
3. **CSS Variables**: Override default values by defining CSS custom properties within your stylesheets.
4. **CSS Modules**: Integrate with CSS Modules for scoped and modular styling.

### CSS Variables

Example CSS variables available for customization:

\`\`\`css
.${componentNameLower} {
  --${componentNameLower}-color: #1f2937;
  --${componentNameLower}-background: transparent;
  --${componentNameLower}-border: none;
  --${componentNameLower}-border-radius: 0;
  --${componentNameLower}-margin: 0;
  --${componentNameLower}-padding: 0;
  --${componentNameLower}-font-size: 1rem;
  --${componentNameLower}-line-height: 1.5;
  --${componentNameLower}-transition: all 0.2s ease;
}
\`\`\`

## 🧪 Testing

### Test Files

Comprehensive test coverage is provided across these files:

- \`index.test.tsx\`: Contains main component tests, covering basic rendering, props, and interactions.

### Test Coverage

Tests cover a wide range of scenarios to ensure reliability:

- **Rendering**: Verifies basic rendering, prop application, and correct DOM output.
- **Interactions**: Tests user interactions and event handling.
- **Accessibility**: Ensures ARIA attributes, keyboard navigation, and screen reader compatibility.
- **Analytics**: Validates analytics tracking and custom analytics functions.
- **Polymorphic**: Confirms correct rendering when used with the \`as\` prop for different elements or custom components.
- **Edge Cases**: Covers error states, boundary conditions, and invalid inputs.

### Running Tests

To execute tests for the \`${name}\` component:

\`\`\`bash
# Run all tests for the ${name} component
pnpm test src/${componentNameLower}/index.test.tsx

# Run all tests in the project (from root directory)
pnpm test

# Run with coverage report
pnpm test --coverage
\`\`\`

## ⚡ Performance

### Optimization Techniques

This component is highly optimized for performance:

- **Memoization**: Utilizes \`React.memo\` for its client-side components (\`Memoized${name}Client\`) to prevent unnecessary re-renders.
- **Lazy Loading**: Client-side components are dynamically imported and lazy-loaded on demand, reducing initial bundle size.
- **Bundle Splitting**: Server-side and client-side code are naturally separated, further optimizing load times.
- **Tree Shaking**: Unused exports and code are automatically eliminated in production builds, ensuring minimal footprint.

## 🌐 Browser Support

- **Modern Browsers**: Fully supported on the latest two versions of Chrome, Firefox, Safari, and Edge.
- **Mobile Devices**: Optimized for iOS Safari and Chrome Mobile, providing a seamless experience.
- **Accessibility Tools**: Compatible with major screen readers and assistive technologies.

## 📘 TypeScript

Full TypeScript support is provided for enhanced type safety and developer experience:

\`\`\`typescript
import { ${name}, type ${name}Props, type ${name}Ref } from '@guyromellemagayano/components';
import React, { useRef } from 'react';

const MyComponent: React.FC = () => {
  const ref = useRef<${name}Ref>(null);
  
  return (
    <${name} ref={ref}>
      TypeScript example
    </${name}>
  );
};
\`\`\`

## 📚 Migration Guide

### From Legacy Component

If you are migrating from a legacy version of a similar component to this \`${name}\` component, please follow these steps:

1. **Import Changes**: Update your import statements to \`import { ${name} } from '@guyromellemagayano/components';\`.
2. **Prop Changes**: Review and update any prop names or types that may have changed to align with the new API.
3. **Styling**: Adjust your CSS class names to conform to the BEM format (\`.${componentNameLower}\`, \`.${componentNameLower}--modifier\`).
4. **Analytics**: Migrate to the new analytics integration pattern if you were using a custom tracking solution.

### Breaking Changes

(List any breaking changes from previous versions here)

## 🤝 Contributing

### Contribution Guidelines

When contributing to the \`${name}\` component or any other component in this library, please ensure you adhere to the following:

1. **Follow Standards**: Adhere to the comprehensive [Component Development Standards](docs/components/COMPONENT_STANDARDS.md) for consistent code quality.
2. **Add Comprehensive Tests**: Include full test coverage for all new features, bug fixes, and edge cases.
3. **Update Documentation**: Keep the component's \`README.md\` and JSDoc comments current and accurate.
4. **Ensure Accessibility**: Prioritize accessibility compliance in all development efforts.
5. **Consider Performance**: Optimize for performance implications and ensure minimal impact on bundle size.

## 🔗 Related Components

- [Button](../button/README.md)
- [Div](../div/README.md)
- [Span](../span/README.md)

`;
}

/**
 * Creates comprehensive test template with element-specific testing
 */
export function createTestTemplate(name: string): string {
  const componentNameLower = name.toLowerCase();

  return `import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { ${name} } from "./index";

const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

describe("${name} Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders correctly", () => {
      render(<${name}>Test content</${name}>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("applies correct CSS classes", () => {
      render(
        <${name} className="custom-class">
          Test content
        </${name}>
      );
      
      const element = screen.getByText("Test content");
      expect(element).toHaveClass("${componentNameLower}");
      expect(element).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLElement>();
      render(
        <${name} ref={ref}>
          Test content
        </${name}>
      );
      
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe("Analytics", () => {
    it("tracks interactions with analytics ID", () => {
      render(
        <${name} analyticsId="test-${componentNameLower}">
          Test content
        </${name}>
      );
      
      const element = screen.getByText("Test content");
      fireEvent.click(element);
      
      expect(mockGtag).toHaveBeenCalledWith("event", "click", {
        event_category: "${componentNameLower}",
        event_label: "test-${componentNameLower}",
      });
    });

    it("calls custom analytics function", () => {
      const mockAnalytics = vi.fn();
      render(
        <${name} onAnalytics={mockAnalytics}>
          Test content
        </${name}>
      );
      
      const element = screen.getByText("Test content");
      fireEvent.click(element);
      
      expect(mockAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "interact",
          category: "${componentNameLower}",
          action: "click",
        })
      );
    });
  });

  describe("Accessibility", () => {
    it("supports keyboard navigation", () => {
      const mockClick = vi.fn();
      render(
        <${name} onClick={mockClick}>
          Test content
        </${name}>
      );
      
      const element = screen.getByText("Test content");
      fireEvent.keyDown(element, { key: "Enter" });
      fireEvent.keyDown(element, { key: " " });
      
      expect(mockClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("Client-Side Rendering", () => {
    it("renders client component when isClient is true", async () => {
      render(
        <${name} isClient analyticsId="client-test">
          Test content
        </${name}>
      );
      
      await waitFor(() => {
        expect(screen.getByText("Test content")).toBeInTheDocument();
      });
    });
  });
});
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
    { file: "index.test.tsx", content: createTestTemplate(name) },
    { file: "README.md", content: createReadmeTemplate(name) },
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
  const validation = validateComponentName(name);

  if (!validation.isValid) {
    return {
      success: false,
      filesCreated: [],
      errors: [validation.error!],
    };
  }

  const componentDir = path.join(srcDir, name.toLowerCase());
  const filesCreated: string[] = [];
  const errors: string[] = [];

  try {
    // Check if component already exists
    try {
      await fs.access(componentDir);
      if (!overwrite) {
        return {
          success: false,
          filesCreated: [],
          errors: [
            `Component "${name}" already exists. Use --overwrite to replace it.`,
          ],
        };
      }
    } catch {
      // Directory doesn't exist, which is fine
    }

    // Create component directory
    await fs.mkdir(componentDir, { recursive: true });

    // Generate file templates
    const templates = generateFileTemplates(name);

    for (const template of templates) {
      const filePath = path.join(componentDir, template.file);
      await fs.writeFile(filePath, template.content);
      filesCreated.push(filePath);
    }

    return {
      success: true,
      filesCreated,
      errors: [],
    };
  } catch (error) {
    return {
      success: false,
      filesCreated,
      errors: [`Failed to scaffold component: ${(error as Error).message}`],
    };
  }
}

/**
 * Updates the main index.ts file to include exports for the new component
 */
export async function updateMainExports(
  name: string,
  srcDir: string
): Promise<void> {
  const fs = await import("fs");
  const indexPath = path.join(srcDir, "index.ts");

  if (!fs.existsSync(indexPath)) {
    console.warn("⚠️ Main index.ts file not found, skipping export updates");
    return;
  }

  let content = fs.readFileSync(indexPath, "utf-8");

  const componentExport = `
// ${name} Component
export { ${name} } from "./${name.toLowerCase()}";
export type { ${name}Props, ${name}Ref } from "./${name.toLowerCase()}";`;

  const clientExport = `
// ${name} Client Components
export { ${name}Client, Memoized${name}Client } from "./${name.toLowerCase()}/index.client";`;

  const clientExportsMarker =
    "// =============================================================================\n// CLIENT COMPONENT EXPORTS";
  const clientExportsIndex = content.indexOf(clientExportsMarker);

  if (clientExportsIndex !== -1) {
    content =
      content.slice(0, clientExportsIndex) +
      componentExport +
      "\n\n" +
      content.slice(clientExportsIndex);
  }

  const metadataMarker =
    "// =============================================================================\n// COMPONENT COUNT AND METADATA";
  const metadataIndex = content.indexOf(metadataMarker);

  if (metadataIndex !== -1) {
    const insertIndex = content.lastIndexOf("\n", metadataIndex - 1);
    content =
      content.slice(0, insertIndex) +
      clientExport +
      "\n" +
      content.slice(insertIndex);
  }

  const countRegex = /export const MIGRATED_COMPONENT_COUNT = (\d+);/;
  const countMatch = content.match(countRegex);
  if (countMatch && countMatch[1]) {
    const currentCount = parseInt(countMatch[1], 10);
    content = content.replace(
      countRegex,
      `export const MIGRATED_COMPONENT_COUNT = ${currentCount + 1};`
    );
  }

  const availableComponentsRegex =
    /export const AVAILABLE_COMPONENTS = \[([\s\S]*?)\] as const;/;
  const availableMatch = content.match(availableComponentsRegex);
  if (availableMatch && availableMatch[1]) {
    const componentsList = availableMatch[1];
    if (!componentsList.includes(`"${name}"`)) {
      const components = componentsList
        .split("\n")
        .map((line) => line.trim().replace(/[",]/g, ""))
        .filter((line) => line && !line.startsWith("//"))
        .filter(Boolean);

      components.push(name);
      components.sort();

      const formattedComponents = components
        .map((comp) => `  "${comp}",`)
        .join("\n");

      content = content.replace(
        availableComponentsRegex,
        `export const AVAILABLE_COMPONENTS = [\n${formattedComponents}\n] as const;`
      );
    }
  }

  fs.writeFileSync(indexPath, content);
  console.log(
    `✅ Updated exports in ${path.relative(process.cwd(), indexPath)}`
  );
}

/**
 * Builds the component library after scaffolding
 */
export async function buildAfterScaffold(
  componentName: string
): Promise<boolean> {
  try {
    const { spawn } = await import("child_process");

    console.log(`🔨 Building ${componentName} component...`);

    return new Promise((resolve) => {
      const buildProcess = spawn("pnpm", ["build"], {
        stdio: ["inherit", "pipe", "pipe"],
        shell: true,
      });

      let buildOutput = "";
      let buildError = "";

      buildProcess.stdout?.on("data", (data) => {
        buildOutput += data.toString();
      });

      buildProcess.stderr?.on("data", (data) => {
        buildError += data.toString();
      });

      buildProcess.on("close", (code) => {
        if (code === 0) {
          console.log(`✅ ${componentName} component built successfully!`);
          resolve(true);
        } else {
          console.warn(`⚠️ Build failed with code ${code}`);
          if (buildError) {
            console.warn(`Build error: ${buildError}`);
          }
          resolve(false);
        }
      });

      buildProcess.on("error", (error) => {
        console.warn(`⚠️ Build process error: ${error.message}`);
        resolve(false);
      });
    });
  } catch (error) {
    console.warn(
      `⚠️ Failed to start build process: ${(error as Error).message}`
    );
    return false;
  }
}

/**
 * Checks if development server is running
 */
export async function isDevServerRunning(): Promise<boolean> {
  try {
    const { exec } = await import("child_process");
    const { promisify } = await import("util");
    const execAsync = promisify(exec);

    const { stdout } = await execAsync("pgrep -f 'bunchee.*watch' || echo ''");
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

// =============================================================================
// CLI INTERFACE
// =============================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

const SRC_DIR = path.join(__dirname, "..", "src");

async function main(): Promise<void> {
  try {
    logInfo("🎯 React Component Scaffolder");
    logInfo("==============================");

    // Check for command line argument first
    let name = process.argv[2];
    const shouldSkipBuild = process.argv.includes("--no-build");

    // If no argument provided, prompt for input
    if (!name) {
      name = await ask("Enter component name (PascalCase): ");
    }

    if (!name) {
      logError("❌ Component name is required");
      process.exit(1);
    }

    logInfo(`📝 Creating component: ${name}`);

    // Validate component name
    const validation = validateComponentName(name);
    if (!validation.isValid) {
      logError(`❌ Invalid component name: ${validation.error}`);
      process.exit(1);
    }

    // Check if component already exists
    const componentDir = path.join(SRC_DIR, name.toLowerCase());

    try {
      await fs.access(componentDir);
      const overwrite = await ask(
        `Component '${name}' already exists. Overwrite? (y/N): `
      );

      if (
        overwrite.toLowerCase() !== "y" &&
        overwrite.toLowerCase() !== "yes"
      ) {
        logInfo("❌ Scaffolding cancelled");
        process.exit(0);
      }
    } catch {
      // Directory doesn't exist, which is fine
    }

    // Scaffold the component
    const result = await scaffoldComponent({ name, overwrite: true }, SRC_DIR);

    if (result.success) {
      // Update main exports
      try {
        await updateMainExports(name, SRC_DIR);
      } catch (error) {
        logError(`⚠️ Failed to update exports: ${(error as Error).message}`);
      }

      logInfo("🎉 Component scaffolded successfully!");
      logInfo(`📁 Location: ${componentDir}`);
      logInfo(`📄 Files created: ${result.filesCreated.length}`);

      result.filesCreated.forEach((file) => {
        logInfo(`  ✅ ${path.relative(process.cwd(), file)}`);
      });

      // Auto-build in development unless explicitly skipped
      if (!shouldSkipBuild) {
        const devServerRunning = await isDevServerRunning();

        if (devServerRunning) {
          logInfo(
            "🔄 Development server is running - component will be built automatically"
          );
          logInfo("📦 Component will be available for import shortly!");
        } else {
          logInfo("🔨 Building component for immediate use...");
          const buildSuccess = await buildAfterScaffold(name);

          if (!buildSuccess) {
            logInfo(
              "💡 Run 'pnpm dev' for automatic rebuilding during development"
            );
          }
        }
      } else {
        logInfo("⏭️ Skipped building (--no-build flag provided)");
        logInfo(
          "💡 Run 'pnpm build' to make the component available for import"
        );
      }

      logInfo("🚀 Ready to use your new component!");
    } else {
      logError("❌ Scaffolding failed:");
      result.errors.forEach((error) => {
        logError(`  ❌ ${error}`);
      });
      process.exit(1);
    }
  } catch (error) {
    logError("❌ Unexpected error:", error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logError("❌ Fatal error:", error);
    process.exit(1);
  });
}
