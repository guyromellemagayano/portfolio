/**
 * @file ListItem.tsx
 * @author Guy Romelle Magayano
 * @description List item component for the web application.
 */

"use client";

// eslint-disable-next-line simple-import-sort/imports
import React from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import {
  formatDateSafely,
  getLinkTargetProps,
  isValidLink,
} from "@guyromellemagayano/utils";

import { type ArticleWithSlug } from "@web/utils/articles";
import { cn } from "@web/utils/helpers";

import { Card } from "../../card";

// ============================================================================
// COMMON LIST COMPONENT TYPES
// ============================================================================

type ListItemElementType = "li" | typeof Card;

export type ListItemProps<
  T extends ListItemElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
    href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
    target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
    title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
  };

// ============================================================================
// ARTICLE LIST ITEM COMPONENT
// ============================================================================

type ArticleListItemProps<P extends Record<string, unknown> = {}> =
  ListItemProps<typeof Card, P> &
    P & {
      as?: typeof Card;
      article: ArticleWithSlug;
      isFrontPage?: boolean;
    };

function ArticleListItem<P extends Record<string, unknown> = {}>(
  props: ArticleListItemProps<P>
) {
  const {
    as: Component = Card,
    article,
    isFrontPage = false,
    className,
    ...rest
  } = props;

  // Internationalization
  const tAria = useTranslations("list.ariaLabels");

  // Article list ARIA
  const ARTICLE_LIST_ITEM_I18N = React.useMemo(
    () => ({
      articleDate: tAria("articleDate"),
      cta: tAria("cta"),
    }),
    [tAria]
  );

  // Article data
  const articleData = {
    id: article.slug?.trim(),
    title: article.title?.trim(),
    slug: encodeURIComponent(`/articles/${article.slug?.trim()}`),
    date: article.date?.trim(),
    description: article.description?.trim(),
  };

  // Pre-compute all conditions
  const hasTitle = articleData?.title?.trim()?.length > 0;
  const hasDate = !isNaN(
    new Date(
      articleData?.date?.trim()?.length > 0 ? articleData?.date?.trim() : ""
    )?.getTime()
  );
  const hasDescription = articleData?.description?.trim()?.length > 0;
  const hasArticle = hasTitle && hasDate && hasDescription;

  if (!hasArticle) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      as="article"
      className={cn(
        !isFrontPage ? "md:col-span-3" : undefined,
        className as string
      )}
      id={articleData.id}
      aria-label={articleData.title || undefined}
      aria-describedby={articleData.description || undefined}
    >
      <Card.Title href={articleData.slug} aria-level={1}>
        {articleData.title || undefined}
      </Card.Title>
      <Card.Eyebrow
        as="time"
        dateTime={articleData.date}
        aria-label={`${ARTICLE_LIST_ITEM_I18N.articleDate} ${formatDateSafely(articleData.date)}`}
        decorate
      >
        {formatDateSafely(articleData.date)}
      </Card.Eyebrow>
      <Card.Description>{articleData.description}</Card.Description>
      <Card.Cta
        role="button"
        aria-label={`${ARTICLE_LIST_ITEM_I18N.cta}: ${articleData.title || ARTICLE_LIST_ITEM_I18N.cta}`}
      >
        {ARTICLE_LIST_ITEM_I18N.cta}
      </Card.Cta>
    </Component>
  );
}

ArticleListItem.displayName = "ArticleListItem";

// ============================================================================
// SOCIAL LIST ITEM COMPONENT
// ============================================================================

function SocialListItem<P extends Record<string, unknown> = {}>(
  props: ListItemProps<"li", P>
) {
  const { as: Component = "li", children, role = "listitem", ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role={role}
    >
      {children}
    </Component>
  );
}

SocialListItem.displayName = "SocialListItem";

// ============================================================================
// TOOLS LIST ITEM COMPONENT
// ============================================================================

type ToolsListItemProps<P extends Record<string, unknown> = {}> = ListItemProps<
  typeof Card,
  P
> &
  P & {
    as?: typeof Card;
  };

function ToolsListItem<P extends Record<string, unknown> = {}>(
  props: ToolsListItemProps<P>
) {
  const {
    as: Component = Card,
    children,
    href,
    target,
    title,
    ...rest
  } = props;

  if (!children || !title) return null;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      as="article"
    >
      <Card.Title
        as="h3"
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
      >
        {title}
      </Card.Title>
      {/* <Card.Description>{children}</Card.Description> */}
    </Component>
  );
}

ToolsListItem.displayName = "ToolsListItem";

// ============================================================================
// MAIN LIST ITEM COMPONENT
// ============================================================================

export function ListItem<P extends Record<string, unknown> = {}>(
  props: ListItemProps<"li", P>
) {
  const { as: Component = "li", children, role = "listitem", ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role={role}
    >
      {children}
    </Component>
  );
}

ListItem.displayName = "ListItem";

// ============================================================================
// LIST ITEM COMPOUND COMPONENTS
// ============================================================================

ListItem.Article = ArticleListItem;
ListItem.Social = SocialListItem;
ListItem.Tools = ToolsListItem;
