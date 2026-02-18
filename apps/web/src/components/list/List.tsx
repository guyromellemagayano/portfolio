/**
 * @file List.tsx
 * @author Guy Romelle Magayano
 * @description List component for the web application.
 */

"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  useMemo,
} from "react";

import { useTranslations } from "next-intl";

import { cn } from "@web/utils/helpers";

// ============================================================================
// COMMON LIST COMPONENT TYPES
// ============================================================================

export type ListElementType = "ul" | "ol";
export type ListProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<ListElementType>,
  "as"
> &
  P & {
    as?: ListElementType;
  };

// ============================================================================
// ARTICLE LIST ITEM COMPONENT
// ============================================================================

export type ArticleListProps<P extends Record<string, unknown> = {}> =
  ListProps<P> & P & {};

export function ArticleList<P extends Record<string, unknown> = {}>(
  props: ArticleListProps<P>
) {
  const {
    as: Component = "ul",
    role = "region",
    children,
    className,
    ...rest
  } = props;

  // Internationalization
  const articleListI18n = useTranslations("components.list.labels");

  // Article list ARIA
  const LIST_I18N = useMemo(
    () => ({
      articleList: articleListI18n("articleList"),
      articles: articleListI18n("articles"),
    }),
    [articleListI18n]
  );

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListElementType>)}
      role={role}
      className={cn(
        "md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40",
        className
      )}
      aria-label={LIST_I18N.articleList}
    >
      <h2 className="sr-only">{LIST_I18N.articleList}</h2>
      <div className="flex w-full max-w-3xl flex-col space-y-16">
        {children}
      </div>
    </Component>
  );
}

ArticleList.displayName = "ArticleList";

// ============================================================================
// SOCIAL LIST ITEM COMPONENT
// ============================================================================

export type SocialListProps<P extends Record<string, unknown> = {}> =
  ListProps<P> & P & {};

export function SocialList<P extends Record<string, unknown> = {}>(
  props: SocialListProps<P>
) {
  const { as: Component = "ul", role = "region", children, ...rest } = props;

  // Internationalization
  const socialListI18n = useTranslations("components.list.labels");

  // Social list ARIA
  const LIST_I18N = useMemo(
    () => ({
      socialList: socialListI18n("socialList"),
    }),
    [socialListI18n]
  );

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListElementType>)}
      role={role}
      aria-label={LIST_I18N.socialList}
    >
      {children}
    </Component>
  );
}

SocialList.displayName = "SocialList";

// ============================================================================
// TOOLS LIST ITEM COMPONENT
// ============================================================================

export function ToolsList<P extends Record<string, unknown> = {}>(
  props: ListProps<P>
) {
  const {
    as: Component = "ul",
    role = "region",
    children,
    className,
    ...rest
  } = props;

  // Internationalization
  const toolsListI18n = useTranslations("components.list.labels");

  // Tools list ARIA
  const LIST_I18N = useMemo(
    () => ({
      toolsList: toolsListI18n("toolsList"),
    }),
    [toolsListI18n]
  );

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListElementType>)}
      role={role}
      className={cn("space-y-16", className)}
      aria-label={LIST_I18N.toolsList}
    >
      {children}
    </Component>
  );
}

ToolsList.displayName = "ToolsList";

// ============================================================================
// MAIN LIST COMPONENT
// ============================================================================

export function List<P extends Record<string, unknown> = {}>(
  props: ListProps<P>
) {
  const { as: Component = "ul", children, role = "list", ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListElementType>)}
      role={role}
    >
      {children}
    </Component>
  );
}

List.displayName = "List";
