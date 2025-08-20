import React from "react";

/**
 * Determines if children are renderable (avoiding boolean/empty-string quirks).
 *
 * @param children - React children to check
 * @returns true if children should be rendered, false otherwise
 *
 * @example
 * ```tsx
 * const shouldRender = isRenderableContent(children);
 * if (!shouldRender) return null;
 * ```
 */
export function isRenderableContent(children: React.ReactNode): boolean {
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

/**
 * Safely trims whitespace from string content.
 *
 * @param content - String content to trim
 * @returns Trimmed string or original if not a string
 *
 * @example
 * ```tsx
 * const trimmed = trimStringContent(title);
 * if (trimmed) {
 *   return <h1>{title}</h1>;
 * }
 * ```
 */
export function trimStringContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }
  return String(content || "");
}

/**
 * Checks if string content has meaningful text (not just whitespace).
 *
 * @param content - String content to check
 * @returns true if content has meaningful text
 *
 * @example
 * ```tsx
 * const hasText = hasMeaningfulText(title);
 * if (hasText) {
 *   return <h1>{title}</h1>;
 * }
 * ```
 */
export function hasMeaningfulText(content: unknown): boolean {
  if (typeof content !== "string") {
    return false;
  }
  return content.trim().length > 0;
}
