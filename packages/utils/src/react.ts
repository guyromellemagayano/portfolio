import React from "react";

/** Determines if children are renderable (avoiding boolean/empty-string quirks). */
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
