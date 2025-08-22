import React from "react";

/** Determines if children are renderable (avoiding boolean/empty-string quirks). */
export function isRenderableContent(children: unknown): boolean {
  // Explicitly false values that should not render
  if (children === null || children === undefined || children === false) {
    return false;
  }

  // Empty string should not render
  if (children === "") {
    return false;
  }

  // Everything else should render (including 0, true, arrays, elements, etc.)
  return true;
}

/** Safely trims whitespace from string content. */
export function trimStringContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }
  return String(content || "");
}

/** Checks if string content has meaningful text (not just whitespace). */
export function hasMeaningfulText(content: unknown): boolean {
  if (typeof content !== "string") {
    return false;
  }
  return content.trim().length > 0;
}

/** Validates if a URL is valid and not a placeholder. */
export function isValidLink(href?: string): boolean {
  if (!href) return false;
  if (href === "#" || href === "") return false;
  return true;
}

/** Gets safe link target attributes for external links. */
export function getLinkTargetProps(
  href?: string,
  target?: string
): {
  target: string;
  rel?: string;
} {
  if (!isValidLink(href)) {
    return { target: "_self" };
  }

  const isExternal = href?.startsWith("http");
  const shouldOpenNewTab =
    target === "_blank" || (isExternal && target !== "_self");

  return {
    target: shouldOpenNewTab ? "_blank" : "_self",
    rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
  };
}

/** Creates conditional CSS class names with proper fallbacks. */
export function createConditionalClasses(
  baseClass: string,
  conditionalClasses: Record<string, boolean>,
  additionalClass?: string
): string {
  const classes = [baseClass];

  // Add conditional classes
  Object.entries(conditionalClasses).forEach(([className, condition]) => {
    if (condition) {
      classes.push(className);
    }
  });

  // Add additional class if provided
  if (additionalClass) {
    classes.push(additionalClass);
  }

  return classes.filter(Boolean).join(" ");
}

/** Validates and provides default values for common link props. */
export function getDefaultLinkProps(props: {
  href?: string;
  target?: string;
  title?: string;
}): {
  href: string;
  target: string;
  title: string;
} {
  return {
    href: props.href || "#",
    target: props.target || "_self",
    title: props.title || "",
  };
}

/** Validates if context value exists and is meaningful. */
export function isValidContextValue<T>(
  value: T | null | undefined
): value is T {
  return value !== null && value !== undefined;
}

/** Checks if any of the provided values are renderable content. */
export function hasAnyRenderableContent(...values: React.ReactNode[]): boolean {
  return values.some((value) => isRenderableContent(value));
}

/** Safely formats a date string with fallback handling. */
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
