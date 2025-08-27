import React from "react";

// ============================================================================
// COMPONENT UTILITIES
// ============================================================================

/** Sets `displayName` for React components with improved type safety */
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

/** Input props that users provide to components */
export interface ComponentProps {
  /** Custom component ID for tracking */
  internalId?: string;
  /** Enable debug mode */
  debugMode?: boolean;
}

// ============================================================================
// CONTENT UTILITIES
// ============================================================================

/** Checks if children are renderable */
export function isRenderableContent(children: unknown): boolean {
  // Strict conditional rendering to prevent broken UI
  // Only filter out false values - allow null, undefined, and empty strings
  // This prevents components from rendering when they have no meaningful content
  if (children === false) {
    return false;
  }

  return true;
}

/** Checks if any of the provided values are renderable content */
export function hasAnyRenderableContent(...values: React.ReactNode[]): boolean {
  return values.some((value) => {
    // Only filter out false values - allow null, undefined, and empty strings
    if (value === false) {
      return false;
    }
    return true;
  });
}

/** Safely trims whitespace from string content */
export function trimStringContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }
  return String(content || "");
}

/** Checks if string content has meaningful text */
export function hasMeaningfulText(content: unknown): boolean {
  if (typeof content !== "string") {
    return false;
  }
  return content.trim().length > 0;
}

/** Checks if content should render based on component type and UX considerations */
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

/** Validates if a URL is valid and not a placeholder */
export function isValidLink(href?: string | { toString(): string }): boolean {
  if (!href) return false;

  // Convert to string for validation
  const hrefString = typeof href === "string" ? href : href?.toString() || "";

  if (hrefString === "#" || hrefString === "") return false;
  return true;
}

/** Gets safe link target attributes for external links */
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

/** Validates and provides default values for common link props */
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

/** Creates conditional CSS class names with proper fallbacks */
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

/** Safely formats a date string with fallback handling */
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
