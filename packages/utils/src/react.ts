import React from "react";

// ============================================================================
// COMPONENT UTILITIES
// ============================================================================

/**
 * Sets `displayName` for React components with improved type safety.
 *
 * This utility ensures React DevTools displays meaningful component names
 * for debugging and development purposes. It preserves existing `displayName`
 * values and provides fallback naming.
 *
 * @param component - The React component to set `displayName` for
 * @param displayName - Optional custom display name (defaults to component name)
 * @returns The component with `displayName` set
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
 * Creates consistent data attributes for components
 *
 * @param id - The component ID
 * @param debugMode - Whether debug mode is enabled
 * @param suffix - Optional suffix for the component type (e.g., 'section', 'card')
 * @returns Object with data attributes
 */
export function createComponentDataAttributes(
  id?: string,
  suffix?: string,
  debugMode?: boolean
) {
  /* eslint-disable no-undef */
  const attributes: Record<string, string> = {};

  // Validate and sanitize inputs
  const sanitizedId = id ? trimStringContent(id) : "";
  const sanitizedSuffix = suffix ? trimStringContent(suffix) : "";

  // Safe pattern: alphanumeric, hyphen, underscore only
  const safePattern = /^[a-zA-Z0-9_-]+$/;

  const isValidId = sanitizedId.length > 0 && safePattern.test(sanitizedId);
  const isValidSuffix =
    sanitizedSuffix.length > 0 && safePattern.test(sanitizedSuffix);

  // Only add data attributes when both id and suffix are valid
  if (isValidId && isValidSuffix) {
    attributes[`data-${sanitizedSuffix}-id`] =
      `${sanitizedId}-${sanitizedSuffix}`;
    attributes["data-testid"] = `${sanitizedId}-${sanitizedSuffix}-root`;
  } else {
    // Emit debug warning for invalid inputs (non-throwing for backward compatibility)
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      const issues = [];
      if (!isValidId) {
        issues.push(`invalid id: "${id}" (sanitized: "${sanitizedId}")`);
      }
      if (!isValidSuffix) {
        issues.push(
          `invalid suffix: "${suffix}" (sanitized: "${sanitizedSuffix}")`
        );
      }
      // Use console.warn as fallback for development debugging
      console.warn(
        `createComponentDataAttributes: Skipping data attributes due to ${issues.join(", ")}`
      );
    }
  }

  // Only include data-debug-mode when debugMode is strictly true
  if (debugMode === true) {
    attributes["data-debug-mode"] = "true";
  }

  return attributes;
  /* eslint-enable no-undef */
}

/**
 * Creates `aria-labelledby` attribute based on title and ID
 *
 * @param title - The title text
 * @param id - The component ID
 * @returns `aria-labelledby` value or undefined
 */
export function createAriaLabelledBy(
  title?: string,
  id?: string
): string | undefined {
  return title && hasMeaningfulText(title) && id ? id : undefined;
}

/**
 * Creates consistent component props with data attributes
 *
 * @param id - The component ID
 * @param suffix - Optional suffix for the component type
 * @param debugMode - Whether debug mode is enabled
 * @param additionalProps - Additional props to merge
 * @returns Combined props object
 */
export function createComponentProps(
  id?: string,
  suffix?: string,
  debugMode?: boolean,
  additionalProps?: Record<string, unknown>
) {
  const dataAttributes = createComponentDataAttributes(id, suffix, debugMode);
  return {
    ...dataAttributes,
    ...additionalProps,
  };
}

// ============================================================================
// CONTENT UTILITIES
// ============================================================================

/**
 * Checks if children are renderable in React components.
 *
 * Provides strict conditional rendering to prevent broken UI. Only filters
 * out false values while allowing `null`, `undefined`, and empty strings to
 * render normally.
 *
 * @param children - The children content to validate
 * @returns `true` if children should render, `false` otherwise
 */
export function isRenderableContent(children: unknown): boolean {
  // Strict conditional rendering to prevent broken UI
  // Filter out falsy values that shouldn't render: null, undefined, false, empty strings
  // This prevents components from rendering when they have no meaningful content
  if (children === false || children === null || children === undefined) {
    return false;
  }

  // Empty strings should not render
  if (typeof children === "string" && children === "") {
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

/**
 * Enhanced content validation that checks multiple content types
 *
 * @param content - Variable number of content items to validate
 * @returns true if any content is valid and meaningful
 */
export function hasValidContent(...content: unknown[]): boolean {
  return content.some((item) => {
    if (item == null || item === false) return false;
    if (typeof item === "string") return hasMeaningfulText(item);
    if (React.isValidElement(item)) return true;
    if (Array.isArray(item)) return item.length > 0;
    return isRenderableContent(item);
  });
}

/**
 * Creates conditional rendering with fallback support
 *
 * @param condition - The condition to check
 * @param component - The component to render if condition is `true`
 * @param fallback - Optional fallback component to render if condition is `false`
 * @returns The appropriate component or null
 */
export function renderConditionally<T extends React.ReactElement>(
  condition: boolean,
  component: T,
  fallback?: React.ReactElement
): T | React.ReactElement | null {
  return condition ? component : fallback || null;
}

/**
 * Validates if component should render based on content
 *
 * @param title - Optional title content
 * @param children - Optional children content
 * @returns true if component should render
 */
export function shouldRenderComponentContent(
  title?: string,
  children?: React.ReactNode
): boolean {
  return hasValidContent(title, children);
}

// ============================================================================
// IMAGE UTILITIES
// ============================================================================

/**
 * Validates if an image source is valid and usable.
 *
 * Handles both string URLs and StaticImageData objects (imported images).
 * Useful for preventing broken images and ensuring proper image rendering.
 *
 * @param src - The image source to validate
 * @returns `true` if src is valid, `false` otherwise
 */
export function isValidImageSrc(
  src?: string | { src: string } | { default: { src: string } }
): boolean {
  if (!src) return false;

  // Handle StaticImageData (imported images) with src property
  if (typeof src === "object" && "src" in src) {
    const srcValue = src.src;
    if (typeof srcValue !== "string") return false;
    const trimmedSrc = srcValue.trim();
    return trimmedSrc.length > 0;
  }

  // Handle StaticImageData with default property (Next.js style)
  if (
    typeof src === "object" &&
    "default" in src &&
    src.default &&
    "src" in src.default
  ) {
    const srcValue = src.default.src;
    if (typeof srcValue !== "string") return false;
    const trimmedSrc = srcValue.trim();
    return trimmedSrc.length > 0;
  }

  // Handle string URLs
  if (typeof src === "string") {
    const trimmedSrc = src.trim();

    // Reject empty strings, "#", or only-fragment values
    if (
      trimmedSrc.length === 0 ||
      trimmedSrc === "#" ||
      trimmedSrc.startsWith("#")
    ) {
      return false;
    }

    // Allow data URLs
    if (trimmedSrc.startsWith("data:")) {
      return true;
    }

    // Validate as well-formed URL
    try {
      new URL(trimmedSrc);
      return true;
    } catch {
      return false;
    }
  }

  return false;
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
 * Automatically determines appropriate `target` and `rel` attributes based on
 * link type and user preferences. Ensures security best practices for
 * external links.
 *
 * @param href - The URL to analyze
 * @param target - Optional user-specified target
 * @returns Object with `target` and `rel` attributes
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
 * `href`, `target`, and `title` attributes.
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
 * @param date - The date to format (`string`, `Date` object, or `null`/`undefined`)
 * @param options - Optional `Intl.DateTimeFormatOptions` for customization
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
