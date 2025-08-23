import React from "react";

// ============================================================================
// COMPONENT UTILITIES
// ============================================================================

/** Sets displayName for React components */
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

export interface CommonComponentProps {
  _internalId?: string;
  _debugMode?: boolean;
  ref?: React.Ref<any>;
}

export interface InternalComponentProps extends CommonComponentProps {
  componentId?: string;
  isDebugMode?: boolean;
}

export interface UseComponentIdOptions {
  internalId?: string;
  debugMode?: boolean;
}

export interface UseComponentIdReturn {
  id: string;
  isDebugMode: boolean;
}

export type UseComponentIdHook = (
  options?: UseComponentIdOptions
) => UseComponentIdReturn;

// ============================================================================
// WEB APP SPECIFIC TYPES
// ============================================================================

export interface CommonWebAppComponentProps
  extends CommonComponentProps,
    Pick<InternalComponentProps, "componentId" | "isDebugMode"> {}

/** Creates Internal/External component pairs with useComponentId integration */
export function createComponentPair<
  TProps extends CommonComponentProps,
  TRef = any,
>(
  componentName: string,
  internalComponent: React.ComponentType<
    TProps & InternalComponentProps & { ref?: React.Ref<TRef> }
  >,
  useComponentIdHook: UseComponentIdHook,
  options: {
    memoized?: boolean;
    hookOptions?: {
      defaultDebugMode?: boolean;
    };
  } = {}
): React.ComponentType<TProps & { ref?: React.Ref<TRef> }> {
  const { memoized = true, hookOptions = {} } = options;

  function Component(props: TProps & { ref?: React.Ref<TRef> }) {
    const { _internalId, _debugMode, ref, ...rest } = props;

    const { id, isDebugMode } = useComponentIdHook({
      internalId: _internalId,
      debugMode: _debugMode ?? hookOptions.defaultDebugMode,
    });

    const element = React.createElement(internalComponent, {
      ...rest,
      ref,
      componentId: id,
      isDebugMode,
    } as TProps & InternalComponentProps & { ref?: React.Ref<TRef> });

    return element;
  }

  const WrappedComponent = memoized ? React.memo(Component) : Component;

  return setDisplayName(WrappedComponent, componentName);
}

/** Creates compound components with subcomponents */
export function createCompoundComponent<
  TProps extends CommonComponentProps,
  TRef = any,
  TSubcomponents extends Record<string, React.ComponentType<any>> = {},
>(
  componentName: string,
  internalComponent: React.ComponentType<
    TProps & InternalComponentProps & { ref?: React.Ref<TRef> }
  >,
  useComponentIdHook: UseComponentIdHook,
  subcomponents: TSubcomponents,
  options: {
    memoized?: boolean;
    hookOptions?: {
      defaultDebugMode?: boolean;
    };
  } = {}
): React.ComponentType<TProps & { ref?: React.Ref<TRef> }> & TSubcomponents {
  const MainComponent = createComponentPair(
    componentName,
    internalComponent,
    useComponentIdHook,
    options
  );

  Object.entries(subcomponents).forEach(([key, SubComponent]) => {
    (MainComponent as any)[key] = SubComponent;
  });

  return MainComponent as React.ComponentType<
    TProps & { ref?: React.Ref<TRef> }
  > &
    TSubcomponents;
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
  componentType: "semantic" | "structural" | "interactive" | "decorative" = "semantic"
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
export function isValidLink(href?: string): boolean {
  if (!href) return false;
  if (href === "#" || href === "") return false;
  return true;
}

/** Gets safe link target attributes for external links */
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

/** Validates and provides default values for common link props */
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
