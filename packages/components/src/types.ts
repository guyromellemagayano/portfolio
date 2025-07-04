import type { ComponentPropsWithoutRef, ElementType } from "react";

/**
 * Common props shared by all components in the library
 */
export interface CommonComponentProps {
  /** Render component as a different element or custom component */
  as?: ElementType;
  /** Enable client-side rendering */
  isClient?: boolean;
  /** Use memoized version of client component */
  isMemoized?: boolean;
}

/**
 * Polymorphic component props with conditional element-specific properties
 * This ensures type safety by only allowing element-specific props when appropriate
 */
export type PolymorphicComponentProps<
  TElement extends ElementType,
  TElementSpecificProps = {},
  TDefaultElement extends ElementType = TElement,
> = {
  as?: TElement;
} & ComponentPropsWithoutRef<TElement> &
  CommonComponentProps &
  (TElement extends TDefaultElement ? TElementSpecificProps : {});

/**
 * Polymorphic component ref type
 */
export type PolymorphicRef<TElement extends ElementType> =
  React.ComponentRef<TElement>;

/**
 * Element-specific prop validation configuration
 */
export interface ElementSpecificPropsConfig {
  /** Element type this config applies to */
  element: string;
  /** Props that are only valid for this element */
  specificProps: string[];
  /** Human-readable description for warnings */
  description: string;
}

/**
 * Development warning utility for polymorphic components
 */
export const validatePolymorphicProps = (
  componentName: string,
  asElement: string,
  props: Record<string, unknown>,
  elementConfig: ElementSpecificPropsConfig
): void => {
  if (process.env.NODE_ENV !== "development") return;

  const { element: validElement, specificProps, description } = elementConfig;

  // Only warn if using element-specific props with different element
  if (asElement !== validElement) {
    const invalidProps = specificProps.filter(
      (prop) => props[prop] !== undefined && props[prop] !== null
    );

    if (invalidProps.length > 0) {
      console.warn(
        `${componentName}: The following props are only valid for <${validElement}> elements: ${invalidProps.join(", ")}.\n` +
          `You're rendering as <${asElement}>. ${description}\n` +
          `Consider using a semantic <${validElement}> element or removing these props.`
      );
    }
  }
};

/**
 * Filter out element-specific props when rendering as different element
 */
export const filterElementSpecificProps = <T extends Record<string, unknown>>(
  props: T,
  asElement: string,
  elementConfig: ElementSpecificPropsConfig
): T => {
  const { element: validElement, specificProps } = elementConfig;

  // If rendering as the correct element, return all props
  if (asElement === validElement) return props;

  // Otherwise, filter out element-specific props
  const filtered = { ...props };
  specificProps.forEach((prop) => {
    delete filtered[prop];
  });

  return filtered;
};

/**
 * Utility to create element-specific prop configurations
 */
export const createElementConfig = (
  element: string,
  specificProps: string[],
  description: string
): ElementSpecificPropsConfig => ({
  element,
  specificProps,
  description,
});

// Pre-defined element configurations for common components
export const ELEMENT_CONFIGS = {
  BASE: createElementConfig(
    "base",
    ["href", "target"],
    "These props set document-wide defaults and don't apply to other elements."
  ),
  AREA: createElementConfig(
    "area",
    ["coords", "shape", "alt", "href", "target"],
    "These props define clickable regions in image maps and are meaningless on other elements."
  ),
  AUDIO: createElementConfig(
    "audio",
    ["controls", "autoPlay", "loop", "muted", "preload", "src", "crossOrigin"],
    "These props control audio playback and have no effect on non-media elements."
  ),
  A: createElementConfig(
    "a",
    ["href", "target", "download", "hrefLang", "ping", "rel", "referrerPolicy"],
    "These props define link behavior and are primarily meaningful for anchor elements."
  ),
  ABBR: createElementConfig(
    "abbr",
    ["title"],
    "The title attribute provides the expansion of the abbreviation."
  ),
  BLOCKQUOTE: createElementConfig(
    "blockquote",
    ["cite"],
    "The cite attribute specifies the source URL of the quotation and is only meaningful for blockquote elements."
  ),
  BODY: createElementConfig(
    "body",
    ["scrollable", "hasBackground"],
    "These props control body-specific behavior like scrolling and background display."
  ),
} as const;

export type ElementConfigKey = keyof typeof ELEMENT_CONFIGS;
