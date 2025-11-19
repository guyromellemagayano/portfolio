import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { LIST_I18N } from "./List.i18n";

// ============================================================================
// MAIN LIST COMPONENT
// ============================================================================

type ListElementType = "ul" | "ol";
type ListVariant = "default" | "article" | "social" | "tools";

export type ListProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "ul" or "ol" are allowed */
    as?: T;
    /** The variant of the list */
    variant?: ListVariant;
  };

export const List = setDisplayName(function List<T extends ListElementType>(
  props: ListProps<T>
) {
  const {
    as: Component = "ul",
    variant = "default",
    role,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // List component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  // Define a mapping of variants to components
  const variantComponentMap: Record<ListVariant, React.ElementType> = {
    default: Component,
    article: ArticleList,
    social: SocialList,
    tools: ToolsList,
  };

  // Choose the component based on variant
  const VariantComponent = variantComponentMap[variant] || Component;

  // For default variant, use string element directly
  // Respect the `as` prop if provided, otherwise use "ul" from variant map
  if (variant === "default") {
    const defaultRole = role !== undefined ? role : "list";
    const Element = (
      Component !== "ul" ? Component : VariantComponent
    ) as React.ElementType;
    return (
      <Element
        {...rest}
        role={defaultRole}
        {...createComponentProps(componentId, `list-${variant}`, isDebugMode)}
      >
        {children}
      </Element>
    );
  }

  const variantProps = {
    ...rest,
    as: Component,
    variant,
    role,
    debugId,
    debugMode,
    ...createComponentProps(
      componentId,
      variant === "social"
        ? "social-list"
        : variant === "tools"
          ? "tools-list"
          : `list-${variant}`,
      isDebugMode
    ),
  };

  return <VariantComponent {...variantProps}>{children}</VariantComponent>;
});

// ============================================================================
// MEMOIZED LIST COMPONENT
// ============================================================================

export const MemoizedList = React.memo(List);

// ============================================================================
// MAIN ARTICLE LIST COMPONENT
// ============================================================================

const ArticleList = setDisplayName(function ArticleList(
  props: ListProps<ListElementType>
) {
  const {
    as: Component = "ul",
    role = "region",
    className,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // List component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role={role}
      className={cn(
        "md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40",
        className
      )}
      aria-label={LIST_I18N.articleList}
    >
      <h2
        className="sr-only"
        aria-hidden="true"
        {...createComponentProps(
          componentId,
          "article-list-heading",
          isDebugMode
        )}
      >
        {LIST_I18N.articleList}
      </h2>
      <div
        role="list"
        className="flex w-full max-w-3xl flex-col space-y-16"
        aria-label={LIST_I18N.articles}
        {...createComponentProps(
          componentId,
          "article-list-children",
          isDebugMode
        )}
      >
        {children}
      </div>
    </Component>
  );
});

// ============================================================================
// MAIN SOCIAL LIST COMPONENT
// ============================================================================

const SocialList = setDisplayName(function SocialList(
  props: ListProps<ListElementType>
) {
  const { as: Component = "ul", children, ...rest } = props;

  if (!children) return null;

  return (
    <Component {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}>
      {children}
    </Component>
  );
});

// ============================================================================
// MAIN TOOLS LIST COMPONENT
// ============================================================================

const ToolsList = setDisplayName(function ToolsList(
  props: ListProps<ListElementType>
) {
  const { as: Component = "ul", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn("space-y-16", className)}
    >
      {children}
    </Component>
  );
});
