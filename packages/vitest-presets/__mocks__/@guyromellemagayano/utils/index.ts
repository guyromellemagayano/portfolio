/**
 * @file packages/vitest-presets/__mocks__/@guyromellemagayano/utils/index.ts
 * @author Guy Romelle Magayano
 * @description Centralized Vitest utility mocks for shared component, content, link, and date helpers.
 */

import { vi } from "vitest";

// ============================================================================
// CENTRALIZED UTILITY MOCKS
// ============================================================================

/** Mock `useComponentId` hook with consistent behavior */
export const useComponentId = vi.fn((options = {}) => ({
  componentId: options.debugId || "test-id",
  isDebugMode: options.debugMode || false,
  id: options.debugId || "test-id", // For backward compatibility
}));

/** Mock `setDisplayName` utility */
export const setDisplayName = vi.fn((component, displayName) => {
  if (component) {
    component.displayName = displayName;
  }
  return component;
});

/** Mock `createComponentProps` utility */
export const createComponentProps = vi.fn(
  (id, componentType, debugMode, additionalProps = {}) => ({
    [`data-${componentType}-id`]: `${id}-${componentType}`,
    "data-debug-mode": debugMode ? "true" : undefined,
    "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
    ...additionalProps,
  })
);

/** Mock `hasAnyRenderableContent` utility */
export const hasAnyRenderableContent = vi.fn((children) => {
  if (children === false || children === null || children === undefined) {
    return false;
  }
  if (typeof children === "string" && children.length === 0) {
    return false;
  }
  return true;
});

/** Mock `hasMeaningfulText` utility */
export const hasMeaningfulText = vi.fn(
  (content) => content != null && content !== ""
);

/** Mock `hasValidContent` utility */
export const hasValidContent = vi.fn(
  (content) => content != null && content !== ""
);

/** Mock `formatDateSafely` utility */
export const formatDateSafely = vi.fn((date, options) => {
  if (options?.year === "numeric") {
    return new Date(date).getFullYear().toString();
  }
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString();
  }
  return date.toLocaleDateString();
});

/** Mock `isValidLink` utility */
export const isValidLink = vi.fn((href) => href && href !== "" && href !== "#");

/** Mock `getLinkTargetProps` utility */
export const getLinkTargetProps = vi.fn((href, target) => ({
  target: target || "_self",
  rel: target === "_blank" ? "noopener noreferrer" : undefined,
}));

/** Mock `hasValidNavigationLinks` utility */
export const hasValidNavigationLinks = vi.fn((links) => {
  if (links === null || links === undefined) return false;
  if (!Array.isArray(links)) return false;
  return links.length > 0;
});

/** Mock `filterValidNavigationLinks` utility */
export const filterValidNavigationLinks = vi.fn((links) => {
  if (!links || !Array.isArray(links)) return [];
  return links.filter((link) => {
    return (
      link &&
      typeof link.label === "string" &&
      link.label.length > 0 &&
      link.href !== null &&
      link.href !== undefined
    );
  });
});

/** Mock `isValidImageSrc` utility */
export const isValidImageSrc = vi.fn(
  (src) => src && typeof src === "string" && src.length > 0
);

/** Mock `cn` utility (className composition) */
export const cn = vi.fn((...classes) => classes.filter(Boolean).join(" "));

/** Mock `formatDate` utility */
export const formatDate = vi.fn((date) => {
  if (typeof date === "string") {
    return new Date(date).toLocaleDateString();
  }
  return date.toLocaleDateString();
});
