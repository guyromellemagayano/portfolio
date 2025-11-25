// ============================================================================
// REACT FRAMEWORK COMPONENT INFORMATION
// ============================================================================

import React from "react";

import logger from "@guyromellemagayano/logger";

/**
 * Safely trims whitespace from string content.
 *
 * Handles various input types and provides a consistent string output for
 * content processing and validation.
 */
export function trimStringContent(content: unknown): string {
  if (typeof content === "string") {
    return content.trim();
  }
  return String(content || "");
}

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
    // Attempt to resolve the component name through various properties:
    // 1. `component.displayName` (explicitly set)
    // 2. `component.name` (standard function name)
    // 3. `component.type.displayName` or `component.type.name` (React.memo, ForwardRef wrapper)
    // 4. `component.render.displayName` or `component.render.name` (React.forwardRef)
    // 5. Fallback to "Component"

    const anyComponent = component as any;
    displayName =
      anyComponent.displayName ||
      anyComponent.name ||
      anyComponent.type?.displayName ||
      anyComponent.type?.name ||
      anyComponent.render?.displayName ||
      anyComponent.render?.name ||
      "Component";
  }

  if (!component.displayName) {
    component.displayName = displayName;
  }

  return component;
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
    attributes["data-testid"] = `${sanitizedId}-${sanitizedSuffix}-root`;
  } else {
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

      logger.warn(
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
 * Creates `aria-labelledby` attribute based on title and ID.
 *
 * @param title - The title text
 * @param id - The component ID
 * @returns `aria-labelledby` value or undefined
 */
export function createAriaLabelledBy(
  title: string,
  id: string
): string | undefined {
  if (!title || !id) {
    return undefined;
  }

  return `${id}-${trimStringContent(title)}`;
}

/**
 * Creates consistent component props with data attributes and optional `aria-labelledby`.
 *
 * @param id - The component ID
 * @param suffix - Optional suffix for the component type
 * @param debugMode - Whether debug mode is enabled
 * @param additionalProps - Additional props to merge
 * @param title - Optional title for generating `aria-labelledby`
 * @returns Combined props object
 */
export function createComponentProps(
  id?: string,
  suffix?: string,
  debugMode?: boolean,
  title?: string,
  additionalProps?: Record<string, unknown>
) {
  const dataAttributes = createComponentDataAttributes(id, suffix, debugMode);
  const ariaLabelledBy =
    title && id ? { "aria-labelledby": createAriaLabelledBy(title, id) } : {};

  return {
    ...dataAttributes,
    ...ariaLabelledBy,
    ...additionalProps,
  };
}
