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

export type ListProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as */
    as?: T;
    /** The variant of the list */
    variant?: "default" | "article" | "social" | "tools";
  };

export const List = setDisplayName(function List<
  T extends React.ElementType = "ul",
>(props: ListProps<T>) {
  const {
    as: Component = "ul" as unknown as T,
    variant = "default",
    role = "list",
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
  const variantComponentMap: Record<string, React.ElementType> = {
    default: "ul",
    article: ArticleList,
    social: SocialList,
    tools: ToolsList,
  };

  // Choose the component based on variant
  const VariantComponent = variantComponentMap[variant] || Component;

  return (
    <VariantComponent
      {...(rest as any)}
      role={role}
      variant={variant}
      {...createComponentProps(componentId, `list-${variant}`, isDebugMode)}
    >
      {children}
    </VariantComponent>
  );
});

// ============================================================================
// MEMOIZED LIST COMPONENT
// ============================================================================

export const MemoizedList = React.memo(List);

// ============================================================================
// MAIN ARTICLE LIST COMPONENT
// ============================================================================

type ArticleListProps = ListProps<"div">;

const ArticleList = setDisplayName(function ArticleList(
  props: ArticleListProps
) {
  const {
    as: Component = "div",
    role = "region",
    className,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as any)}
      role={role}
      className={cn(
        "md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40",
        className
      )}
      aria-label={LIST_I18N.articleList}
      {...createComponentProps(componentId, "article-list", isDebugMode)}
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

const SocialList = setDisplayName(function SocialList<
  T extends React.ElementType = "ul",
>(props: ListProps<T>) {
  const {
    as: Component = "ul" as unknown as T,
    debugId,
    debugMode,
    children,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  const element = (
    <Component
      {...(rest as any)}
      {...createComponentProps(componentId, "social-list", isDebugMode)}
    >
      {children}
    </Component>
  );

  return element;
});

// ============================================================================
// MAIN TOOLS LIST COMPONENT
// ============================================================================

const ToolsList = setDisplayName(function ToolsList<
  T extends React.ElementType = "ul",
>(props: ListProps<T>) {
  const {
    as: Component = "ul" as unknown as T,
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  const element = (
    <Component
      {...(rest as any)}
      className={cn("space-y-16", className)}
      {...createComponentProps(componentId, "tools-list", isDebugMode)}
    >
      {children}
    </Component>
  );

  return element;
});
