import React from "react";

import type { CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMPONENT UTILITIES
// ============================================================================

/**
 * Sets `displayName` for React components with improved type safety.
 *
 * This utility ensures React DevTools displays meaningful component names
 * for debugging and development purposes. It preserves existing displayName
 * values and provides fallback naming.
 *
 * @param component - The React component to set displayName for
 * @param displayName - Optional custom display name (defaults to component name)
 * @returns The component with displayName set
 */
export function setDisplayName<T extends React.ComponentType<any>>(
  component: T,
  displayName?: string
): T {
  if (!displayName) {
    const componentName =
      component.name || component.displayName || "Component";
    displayName = componentName;
  }

  if (!component.displayName) {
    component.displayName = displayName;
  }

  return component;
}

// ============================================================================
// COMPONENT FACTORY UTILITIES
// ============================================================================

/** Standard props interface for all components in the design system */
export interface ComponentProps
  extends Pick<
    CommonComponentProps,
    | "isClient"
    | "isMemoized"
    | "internalId"
    | "debugMode"
    | "_internalId"
    | "_debugMode"
  > {}

// ============================================================================
// CONTENT UTILITIES
// ============================================================================

/**
 * Checks if children are renderable in React components.
 *
 * Provides strict conditional rendering to prevent broken UI. Only filters
 * out false values while allowing null, undefined, and empty strings to
 * render normally.
 *
 * @param children - The children content to validate
 * @returns `true` if children should render, `false` otherwise
 */
export function isRenderableContent(children: unknown): boolean {
  // Strict conditional rendering to prevent broken UI
  // Only filter out false values - allow null, undefined, and empty strings
  // This prevents components from rendering when they have no meaningful content
  if (children === false) {
    return false;
  }

  return true;
}

/**
 * Checks if any of the provided values are renderable content.
 *
 * Useful for components that accept multiple content sources and need
 * to determine if any should be rendered.
 *
 * @param values - Array of React nodes to check
 * @returns `true` if any value is renderable, `false` otherwise
 */
export function hasAnyRenderableContent(...values: React.ReactNode[]): boolean {
  return values.some((value) => {
    // Only filter out false values - allow null, undefined, and empty strings
    if (value === false) {
      return false;
    }
    return true;
  });
}

/**
 * Safely trims whitespace from string content.
 *
 * Handles various input types and provides consistent string output
 * for content processing and validation.
 *
 * @param content - The content to trim
 * @returns Trimmed string content
 */
export function trimStringContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }
  return String(content || "");
}

/**
 * Checks if string content has meaningful text after trimming.
 *
 * Validates that string content contains non-whitespace characters,
 * useful for determining if text-based components should render.
 *
 * @param content - The content to validate
 * @returns `true` if content has meaningful text, `false` otherwise
 */
export function hasMeaningfulText(content: unknown): boolean {
  if (typeof content !== "string") {
    return false;
  }
  return content.trim().length > 0;
}

/**
 * Checks if content should render based on component type and UX considerations.
 *
 * Provides intelligent rendering decisions based on component semantics.
 * Different component types have different rendering rules to ensure
 * optimal user experience.
 *
 * @param children - The children content to validate
 * @param componentType - The type of component for rendering rules
 * @returns `true` if component should render, `false` otherwise
 */
export function shouldRenderComponent(
  children: unknown,
  componentType:
    | "semantic"
    | "structural"
    | "interactive"
    | "decorative" = "semantic"
): boolean {
  // For interactive components (buttons, links), be more strict to prevent broken UX
  if (componentType === "interactive") {
    return isRenderableContent(children) && hasMeaningfulText(children);
  }

  // For decorative components, be very strict to avoid visual artifacts
  if (componentType === "decorative") {
    return isRenderableContent(children) && hasMeaningfulText(children);
  }

  // For structural components (div, section), allow empty but be cautious
  if (componentType === "structural") {
    return isRenderableContent(children);
  }

  // For semantic components (p, span, etc.), allow empty strings
  return isRenderableContent(children);
}

// ============================================================================
// LINK UTILITIES
// ============================================================================

/**
 * Validates if a URL is valid and not a placeholder.
 *
 * Checks that href is provided and not an empty string or placeholder value.
 * Useful for preventing broken links and ensuring proper link behavior.
 *
 * @param href - The URL to validate
 * @returns `true` if href is valid, `false` otherwise
 */
export function isValidLink(href?: string | { toString(): string }): boolean {
  if (!href) return false;

  // Convert to string for validation
  const hrefString = typeof href === "string" ? href : href?.toString() || "";

  if (hrefString === "#" || hrefString === "") return false;
  return true;
}

/**
 * Gets safe link target attributes for external links.
 *
 * Automatically determines appropriate target and rel attributes based on
 * link type and user preferences. Ensures security best practices for
 * external links.
 *
 * @param href - The URL to analyze
 * @param target - Optional user-specified target
 * @returns Object with target and rel attributes
 */
export function getLinkTargetProps(
  href?: string | { toString(): string },
  target?: string
): {
  target: string;
  rel?: string;
} {
  if (!isValidLink(href)) {
    return { target: "_self" };
  }

  // Convert to string for validation
  const hrefString = typeof href === "string" ? href : href?.toString() || "";

  const isExternal = hrefString?.startsWith("http");
  const shouldOpenNewTab =
    target === "_blank" || (isExternal && target !== "_self");

  return {
    target: shouldOpenNewTab ? "_blank" : "_self",
    rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
  };
}

/**
 * Validates and provides default values for common link props.
 *
 * Ensures link components have consistent, safe default values for
 * href, target, and title attributes.
 *
 * @param props - The link props to validate
 * @returns Object with validated link props
 */
export function getDefaultLinkProps(props: {
  href?: string | { toString(): string };
  target?: string;
  title?: string;
}): {
  href: string;
  target: string;
  title: string;
} {
  const hrefString =
    typeof props.href === "string" ? props.href : props.href?.toString() || "";

  return {
    href: hrefString || "#",
    target: props.target || "_self",
    title: props.title || "",
  };
}

// ============================================================================
// STYLING UTILITIES
// ============================================================================

/**
 * Creates conditional CSS class names with proper fallbacks.
 *
 * Builds className strings by combining a base class with conditional
 * classes based on boolean values. Filters out falsy values automatically.
 *
 * @param baseClass - The base CSS class to always include
 * @param conditionalClasses - Object mapping class names to boolean conditions
 * @param additionalClass - Optional additional class to append
 * @returns Combined className string
 */
export function createConditionalClasses(
  baseClass: string,
  conditionalClasses: Record<string, boolean>,
  additionalClass?: string
): string {
  const classes = [baseClass];

  Object.entries(conditionalClasses).forEach(([className, condition]) => {
    if (condition) {
      classes.push(className);
    }
  });

  if (additionalClass) {
    classes.push(additionalClass);
  }

  return classes.filter(Boolean).join(" ");
}

/**
 * Safely formats a date string with fallback handling.
 *
 * Converts various date inputs to localized date strings with error
 * handling for invalid dates and edge cases.
 *
 * @param date - The date to format (string, Date object, or null/undefined)
 * @param options - Optional Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string or empty string if invalid
 */
export function formatDateSafely(
  date: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...options,
    });
  } catch {
    return "";
  }
}
