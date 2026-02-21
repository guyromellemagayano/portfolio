import React, { type ComponentPropsWithoutRef, type ElementType } from "react";

import type { UseComponentIdOptions } from "@portfolio/hooks";
import { logWarn } from "@portfolio/logger";

/** Common props shared by all components in the library */
export interface CommonComponentProps extends UseComponentIdOptions {
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
  TElementSpecificProps = unknown,
  TDefaultElement extends ElementType = TElement,
> = {
  as?: TElement;
} & ComponentPropsWithoutRef<TElement> &
  CommonComponentProps &
  (TElement extends TDefaultElement ? TElementSpecificProps : {});

/** Polymorphic component ref type */
export type PolymorphicRef<TElement extends ElementType> =
  React.ComponentRef<TElement>;

/** Element-specific prop validation configuration */
export interface ElementSpecificPropsConfig {
  /** Element type this config applies to */
  element: string;
  /** Props that are only valid for this element */
  specificProps: string[];
  /** Human-readable description for warnings */
  description: string;
  /** Template category for scaffolding */
  category: ElementCategory;
  /** Common interface props for this element type */
  commonProps?: string[];
  /** Whether this element supports variants */
  supportsVariants?: boolean;
  /** Whether this element supports active/disabled states */
  supportsStates?: boolean;
  /** Default variant options */
  defaultVariants?: string[];
}

/** Element categories for template generation */
export type ElementCategory =
  | "interactive" // button, a, input, select, textarea
  | "media" // audio, video, img, canvas, svg
  | "form" // form, fieldset, legend, label, input, select, textarea
  | "content" // p, h1-h6, article, section, aside, header, footer, main, nav
  | "text" // span, strong, em, mark, del, ins, sub, sup, small, cite, code, kbd, samp, var, time
  | "list" // ul, ol, li, dl, dt, dd
  | "table" // table, caption, thead, tbody, tfoot, tr, th, td, colgroup, col
  | "meta" // head, title, meta, link, style, script, noscript, base
  | "structure" // html, body, div, span (generic containers)
  | "embed" // iframe, embed, object, param, source, track, area, map
  | "formatting"; // br, hr, pre, blockquote, address, figure, figcaption

/** Development warning utility for polymorphic components */
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
      logWarn(
        `${componentName}: The following props are only valid for <${validElement}> elements: ${invalidProps.join(", ")}.\n` +
          `You're rendering as <${asElement}>. ${description}\n` +
          `Consider using a semantic <${validElement}> element or removing these props.`
      );
    }
  }
};

/** Filter out element-specific props when rendering as different element */
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

/** Utility to create element-specific prop configurations */
export const createElementConfig = (
  element: string,
  specificProps: string[],
  description: string,
  category: ElementCategory,
  options: {
    commonProps?: string[];
    supportsVariants?: boolean;
    supportsStates?: boolean;
    defaultVariants?: string[];
  } = {}
): ElementSpecificPropsConfig => ({
  element,
  specificProps,
  description,
  category,
  commonProps: options.commonProps || [],
  supportsVariants: options.supportsVariants ?? true,
  supportsStates: options.supportsStates ?? true,
  defaultVariants: options.defaultVariants || ["default"],
});

// Pre-defined element configurations for all major HTML elements
export const ELEMENT_CONFIGS = {
  // Interactive elements
  A: createElementConfig(
    "a",
    ["href", "target", "download", "hrefLang", "ping", "rel", "referrerPolicy"],
    "These props define link behavior and are primarily meaningful for anchor elements.",
    "interactive",
    {
      commonProps: [
        "variant",
        "active",
        "disabled",
        "loading",
        "icon",
        "iconPosition",
        "tooltip",
        "confirm",
        "prefetch",
      ],
      defaultVariants: ["default", "primary", "secondary", "unstyled"],
    }
  ),
  BUTTON: createElementConfig(
    "button",
    [
      "type",
      "form",
      "formAction",
      "formEncType",
      "formMethod",
      "formNoValidate",
      "formTarget",
    ],
    "These props control button behavior and form submission.",
    "interactive",
    {
      commonProps: [
        "variant",
        "size",
        "disabled",
        "loading",
        "icon",
        "iconPosition",
        "fullWidth",
      ],
      defaultVariants: [
        "default",
        "primary",
        "secondary",
        "danger",
        "ghost",
        "link",
      ],
    }
  ),

  // Form elements
  INPUT: createElementConfig(
    "input",
    [
      "type",
      "value",
      "defaultValue",
      "placeholder",
      "required",
      "disabled",
      "readOnly",
      "min",
      "max",
      "step",
      "pattern",
      "minLength",
      "maxLength",
      "accept",
      "multiple",
      "capture",
      "size",
      "list",
      "autoComplete",
      "autoFocus",
    ],
    "These props control input behavior and validation.",
    "form",
    {
      commonProps: [
        "variant",
        "size",
        "error",
        "helperText",
        "label",
        "required",
        "disabled",
        "fullWidth",
      ],
      defaultVariants: ["default", "outlined", "filled", "underlined"],
    }
  ),
  SELECT: createElementConfig(
    "select",
    [
      "multiple",
      "size",
      "required",
      "disabled",
      "autoFocus",
      "form",
      "value",
      "defaultValue",
    ],
    "These props control select dropdown behavior.",
    "form",
    {
      commonProps: [
        "variant",
        "size",
        "error",
        "helperText",
        "label",
        "required",
        "disabled",
        "fullWidth",
        "placeholder",
      ],
      defaultVariants: ["default", "outlined", "filled"],
    }
  ),
  TEXTAREA: createElementConfig(
    "textarea",
    [
      "rows",
      "cols",
      "value",
      "defaultValue",
      "placeholder",
      "required",
      "disabled",
      "readOnly",
      "minLength",
      "maxLength",
      "wrap",
      "autoFocus",
      "form",
    ],
    "These props control textarea behavior and sizing.",
    "form",
    {
      commonProps: [
        "variant",
        "size",
        "error",
        "helperText",
        "label",
        "required",
        "disabled",
        "fullWidth",
        "resize",
      ],
      defaultVariants: ["default", "outlined", "filled"],
    }
  ),
  FORM: createElementConfig(
    "form",
    [
      "action",
      "method",
      "encType",
      "target",
      "noValidate",
      "autoComplete",
      "acceptCharset",
    ],
    "These props control form submission and validation.",
    "form",
    {
      commonProps: ["variant", "loading", "disabled", "onSubmit", "onReset"],
      supportsVariants: false,
    }
  ),

  // Media elements
  AUDIO: createElementConfig(
    "audio",
    ["src", "controls", "autoPlay", "loop", "muted", "preload", "crossOrigin"],
    "These props control audio playback and have no effect on non-media elements.",
    "media",
    {
      commonProps: [
        "customControls",
        "showPlayButton",
        "showVolumeControl",
        "showTimeDisplay",
        "showProgressBar",
        "defaultVolume",
        "playbackRate",
        "defaultMuted",
        "loadingContent",
        "errorContent",
        "onPlayStart",
        "onPlayPause",
        "onPlayEnd",
        "onVolumeChangeCallback",
      ],
      supportsVariants: false,
    }
  ),
  VIDEO: createElementConfig(
    "video",
    [
      "src",
      "controls",
      "autoPlay",
      "loop",
      "muted",
      "preload",
      "crossOrigin",
      "poster",
      "width",
      "height",
      "playsInline",
    ],
    "These props control video playback and display.",
    "media",
    {
      commonProps: [
        "customControls",
        "showPlayButton",
        "showVolumeControl",
        "showTimeDisplay",
        "showProgressBar",
        "showFullscreenButton",
        "defaultVolume",
        "playbackRate",
        "defaultMuted",
        "loadingContent",
        "errorContent",
        "onPlayStart",
        "onPlayPause",
        "onPlayEnd",
        "onVolumeChangeCallback",
      ],
      supportsVariants: false,
    }
  ),
  IMG: createElementConfig(
    "img",
    [
      "src",
      "alt",
      "width",
      "height",
      "loading",
      "decoding",
      "referrerPolicy",
      "sizes",
      "srcSet",
      "useMap",
      "isMap",
      "crossOrigin",
    ],
    "These props control image display and loading behavior.",
    "media",
    {
      commonProps: [
        "variant",
        "loading",
        "error",
        "placeholder",
        "lazy",
        "aspectRatio",
        "objectFit",
        "onLoad",
        "onError",
      ],
      defaultVariants: ["default", "rounded", "circle", "thumbnail"],
    }
  ),
  CANVAS: createElementConfig(
    "canvas",
    ["width", "height"],
    "These props control canvas dimensions for graphics rendering and have no effect on non-canvas elements.",
    "media",
    {
      commonProps: [
        "dimensions",
        "variant",
        "contextType",
        "active",
        "loading",
        "disabled",
        "enableHighDPI",
        "preserveDrawingBuffer",
        "alpha",
        "antialias",
        "debug",
        "autoResize",
        "maxWidth",
        "maxHeight",
        "onDrawStart",
        "onDrawing",
        "onDrawEnd",
        "onContextReady",
        "onResize",
      ],
      defaultVariants: ["default", "responsive", "fullscreen", "thumbnail"],
    }
  ),

  // Content elements
  P: createElementConfig(
    "p",
    [],
    "Paragraph elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color", "align", "truncate", "noWrap"],
      defaultVariants: ["default", "lead", "body", "small", "caption"],
    }
  ),
  H1: createElementConfig(
    "h1",
    [],
    "Heading elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color", "align", "truncate", "noWrap"],
      defaultVariants: ["default", "display", "title", "subtitle"],
    }
  ),
  H2: createElementConfig(
    "h2",
    [],
    "Heading elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color", "align", "truncate", "noWrap"],
      defaultVariants: ["default", "display", "title", "subtitle"],
    }
  ),
  H3: createElementConfig(
    "h3",
    [],
    "Heading elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color", "align", "truncate", "noWrap"],
      defaultVariants: ["default", "display", "title", "subtitle"],
    }
  ),
  H4: createElementConfig(
    "h4",
    [],
    "Heading elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color", "align", "truncate", "noWrap"],
      defaultVariants: ["default", "display", "title", "subtitle"],
    }
  ),
  H5: createElementConfig(
    "h5",
    [],
    "Heading elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color", "align", "truncate", "noWrap"],
      defaultVariants: ["default", "display", "title", "subtitle"],
    }
  ),
  H6: createElementConfig(
    "h6",
    [],
    "Heading elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color", "align", "truncate", "noWrap"],
      defaultVariants: ["default", "display", "title", "subtitle"],
    }
  ),

  // Text elements
  SPAN: createElementConfig(
    "span",
    [],
    "Span elements have no specific props beyond standard HTML attributes.",
    "text",
    {
      commonProps: [
        "variant",
        "size",
        "color",
        "weight",
        "italic",
        "underline",
        "strikethrough",
      ],
      defaultVariants: ["default", "highlight", "muted", "accent"],
    }
  ),
  STRONG: createElementConfig(
    "strong",
    [],
    "Strong elements have no specific props beyond standard HTML attributes.",
    "text",
    {
      commonProps: ["variant", "color"],
      defaultVariants: ["default", "accent", "muted"],
    }
  ),
  EM: createElementConfig(
    "em",
    [],
    "Emphasis elements have no specific props beyond standard HTML attributes.",
    "text",
    {
      commonProps: ["variant", "color"],
      defaultVariants: ["default", "accent", "muted"],
    }
  ),

  // List elements
  UL: createElementConfig(
    "ul",
    [],
    "Unordered list elements have no specific props beyond standard HTML attributes.",
    "list",
    {
      commonProps: ["variant", "spacing", "marker", "nested", "horizontal"],
      defaultVariants: ["default", "bulleted", "dashed", "checkmark"],
    }
  ),
  OL: createElementConfig(
    "ol",
    ["start", "reversed", "type"],
    "These props control ordered list numbering and display.",
    "list",
    {
      commonProps: ["variant", "spacing", "marker", "nested", "horizontal"],
      defaultVariants: ["default", "numbered", "lettered", "roman"],
    }
  ),
  LI: createElementConfig(
    "li",
    ["value"],
    "The value prop sets the ordinal value of a list item.",
    "list",
    {
      commonProps: ["variant", "active", "disabled", "interactive"],
      defaultVariants: ["default", "active", "disabled"],
    }
  ),

  // Table elements
  TABLE: createElementConfig(
    "table",
    [],
    "Table elements have no specific props beyond standard HTML attributes.",
    "table",
    {
      commonProps: [
        "variant",
        "striped",
        "bordered",
        "hover",
        "compact",
        "responsive",
        "sortable",
      ],
      defaultVariants: ["default", "striped", "bordered", "minimal"],
    }
  ),
  CAPTION: createElementConfig(
    "caption",
    [],
    "Caption elements have no specific props beyond standard HTML attributes.",
    "table",
    {
      commonProps: ["variant", "position"],
      defaultVariants: ["default", "top", "bottom"],
    }
  ),
  TH: createElementConfig(
    "th",
    ["scope", "colSpan", "rowSpan", "headers", "abbr", "sorted"],
    "These props control table header cell behavior and accessibility.",
    "table",
    {
      commonProps: [
        "variant",
        "sortable",
        "sortDirection",
        "align",
        "width",
        "sticky",
      ],
      defaultVariants: ["default", "sortable", "sticky"],
    }
  ),
  TD: createElementConfig(
    "td",
    ["colSpan", "rowSpan", "headers"],
    "These props control table data cell behavior and accessibility.",
    "table",
    {
      commonProps: ["variant", "align", "width", "truncate", "nowrap"],
      defaultVariants: ["default", "numeric", "truncated"],
    }
  ),

  // Structure elements
  DIV: createElementConfig(
    "div",
    [],
    "Div elements have no specific props beyond standard HTML attributes.",
    "structure",
    {
      commonProps: [
        "variant",
        "padding",
        "margin",
        "border",
        "shadow",
        "rounded",
      ],
      defaultVariants: ["default", "container", "card", "box"],
    }
  ),

  // Formatting elements
  BR: createElementConfig(
    "br",
    [],
    "The br element has no specific props beyond standard HTML attributes.",
    "formatting",
    {
      supportsVariants: false,
      supportsStates: false,
    }
  ),
  HR: createElementConfig(
    "hr",
    [],
    "The hr element has no specific props beyond standard HTML attributes.",
    "formatting",
    {
      commonProps: ["variant", "size", "color", "spacing"],
      defaultVariants: ["default", "dashed", "dotted", "thick"],
    }
  ),
  BLOCKQUOTE: createElementConfig(
    "blockquote",
    ["cite"],
    "The cite attribute specifies the source URL of the quotation and is only meaningful for blockquote elements.",
    "content",
    {
      commonProps: ["variant", "size", "color", "border", "author", "source"],
      defaultVariants: ["default", "bordered", "highlighted", "minimal"],
    }
  ),

  // Legacy elements (maintain backward compatibility)
  BASE: createElementConfig(
    "base",
    ["href", "target"],
    "These props set document-wide defaults and don't apply to other elements.",
    "meta",
    {
      supportsVariants: false,
      supportsStates: false,
    }
  ),
  AREA: createElementConfig(
    "area",
    ["coords", "shape", "alt", "href", "target"],
    "These props define clickable regions in image maps and are meaningless on other elements.",
    "embed",
    {
      commonProps: ["variant", "active", "disabled", "tooltip"],
      defaultVariants: ["default", "highlighted"],
    }
  ),
  ABBR: createElementConfig(
    "abbr",
    ["title"],
    "The title attribute provides the expansion of the abbreviation.",
    "text",
    {
      commonProps: ["variant", "underline", "tooltip"],
      defaultVariants: ["default", "underlined", "dotted"],
    }
  ),
  ADDRESS: createElementConfig(
    "address",
    [],
    "Address elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "size", "color"],
      defaultVariants: ["default", "compact", "detailed"],
    }
  ),
  ARTICLE: createElementConfig(
    "article",
    [],
    "Article elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "spacing", "border", "shadow", "readingTime"],
      defaultVariants: ["default", "card", "minimal", "featured"],
    }
  ),
  ASIDE: createElementConfig(
    "aside",
    [],
    "Aside elements have no specific props beyond standard HTML attributes.",
    "content",
    {
      commonProps: ["variant", "position", "sticky", "collapsible"],
      defaultVariants: ["default", "sidebar", "callout", "note"],
    }
  ),
  B: createElementConfig(
    "b",
    [],
    "Bold elements have no specific props beyond standard HTML attributes.",
    "text",
    {
      commonProps: ["variant", "color"],
      defaultVariants: ["default", "accent", "muted"],
    }
  ),
  BDI: createElementConfig(
    "bdi",
    [],
    "BDI elements have no specific props beyond standard HTML attributes.",
    "text",
    {
      commonProps: ["variant", "dir"],
      defaultVariants: ["default", "isolated"],
    }
  ),
  BDO: createElementConfig(
    "bdo",
    ["dir"],
    "The dir attribute specifies the text direction for bidirectional override.",
    "text",
    {
      commonProps: ["variant"],
      defaultVariants: ["default", "rtl", "ltr"],
    }
  ),
  BODY: createElementConfig(
    "body",
    [],
    "Body elements have no specific props beyond standard HTML attributes.",
    "structure",
    {
      commonProps: ["variant", "theme", "scrollable", "hasBackground"],
      defaultVariants: ["default", "dark", "light", "auto"],
    }
  ),
} as const;

export type ElementConfigKey = keyof typeof ELEMENT_CONFIGS;

/** Get element configuration by name */
export function getElementConfig(
  elementName: string
): ElementSpecificPropsConfig | null {
  const key = elementName.toUpperCase() as ElementConfigKey;
  return ELEMENT_CONFIGS[key] || null;
}

/** Get all elements by category */
export function getElementsByCategory(
  category: ElementCategory
): ElementSpecificPropsConfig[] {
  return Object.values(ELEMENT_CONFIGS).filter(
    (config) => config.category === category
  );
}

/** Check if element supports specific features */
export function elementSupportsFeature(
  elementName: string,
  feature: "variants" | "states"
): boolean {
  const config = getElementConfig(elementName);
  if (!config) return false;

  return feature === "variants"
    ? (config.supportsVariants ?? true)
    : (config.supportsStates ?? true);
}

/** Analytics event type for tracking user interactions */
export type AnalyticsEventType =
  | "click"
  | "view"
  | "submit"
  | "focus"
  | "blur"
  | "scroll"
  | "resize"
  | "load"
  | "error"
  | "custom";

/** Analytics event interface for tracking user interactions */
export interface AnalyticsEvent {
  /** Type of analytics event */
  type: AnalyticsEventType;
  /** Name/identifier for the event */
  name: string;
  /** Additional properties for the event */
  properties?: Record<string, unknown>;
  /** Timestamp when the event occurred */
  timestamp?: number;
  /** User identifier if available */
  userId?: string;
  /** Session identifier if available */
  sessionId?: string;
}
