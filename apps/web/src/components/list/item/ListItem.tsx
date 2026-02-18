/* eslint-disable simple-import-sort/imports */

/**
 * @file ListItem.tsx
 * @author Guy Romelle Magayano
 * @description List item component for the web application.
 */

"use client";

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  useMemo,
} from "react";

import { useTranslations } from "next-intl";
import { type LinkProps } from "next/link";

import { getLinkTargetProps, isValidLink } from "@portfolio/utils";

import { type ArticleWithSlug } from "@web/utils/articles";
import { setCustomDateFormat } from "@web/utils/datetime";
import { cn } from "@web/utils/helpers";

import { Card } from "../../card";

// ============================================================================
// COMMON LIST COMPONENT TYPES
// ============================================================================

export type ListItemElementType = "li" | typeof Card;
export type ListItemProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<ListItemElementType>,
  "as"
> &
  P & {
    as?: ListItemElementType;
    href?: LinkProps["href"];
    target?: string;
    title?: string;
  };

// ============================================================================
// ARTICLE LIST ITEM COMPONENT
// ============================================================================

export type ArticleListItemProps<P extends Record<string, unknown> = {}> =
  ListItemProps<P> &
    P & {
      article: ArticleWithSlug;
      isFrontPage?: boolean;
    };

export function ArticleListItem<P extends Record<string, unknown> = {}>(
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
  const articleListItemI18n = useTranslations("components.listItem.labels");

  // Article list ARIA
  const ARTICLE_LIST_ITEM_I18N = useMemo(
    () => ({
      articleDate: articleListItemI18n("articleDate"),
      cta: articleListItemI18n("cta"),
    }),
    [articleListItemI18n]
  );

  // Article data
  const articleData = {
    id: article.slug?.trim(),
    title: article.title?.trim(),
    slug: `/articles/${article.slug?.trim()}`,
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

  // Generate unique IDs for ARIA relationships
  const titleId = `${articleData.id}-title`;
  const dateId = `${articleData.id}-date`;
  const descriptionId = `${articleData.id}-description`;

  // Format the date custom format
  const formattedDate = setCustomDateFormat(articleData.date);

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListItemElementType>)}
      as="article"
      className={cn(!isFrontPage ? "md:col-span-3" : undefined, className)}
      id={articleData.id}
      aria-labelledby={hasTitle ? titleId : undefined}
      aria-describedby={hasDescription ? descriptionId : undefined}
    >
      <Card.Title as="h2" href={articleData.slug} id={titleId}>
        {articleData.title || undefined}
      </Card.Title>
      <Card.Eyebrow
        as="time"
        dateTime={articleData.date}
        id={dateId}
        aria-label={`${ARTICLE_LIST_ITEM_I18N.articleDate} ${formattedDate}`}
        decorate
      >
        {formattedDate}
      </Card.Eyebrow>
      <Card.Description id={descriptionId}>
        {articleData.description}
      </Card.Description>
      <Card.Cta
        href={articleData.slug}
        title={`${ARTICLE_LIST_ITEM_I18N.cta}: ${articleData.title || ARTICLE_LIST_ITEM_I18N.cta}`}
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

export function SocialListItem<P extends Record<string, unknown> = {}>(
  props: ListItemProps<P>
) {
  const {
    as: Component = "li",
    children,
    role = "listitem",
    className,
    ...rest
  } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListItemElementType>)}
      role={role}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

SocialListItem.displayName = "SocialListItem";

// ============================================================================
// TOOLS LIST ITEM COMPONENT
// ============================================================================

export type ToolsListItemProps<P extends Record<string, unknown> = {}> =
  ListItemProps<P> & P & {};

export function ToolsListItem<P extends Record<string, unknown> = {}>(
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

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListItemElementType>)}
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
  props: ListItemProps<P>
) {
  const { as: Component = "li", children, role = "listitem", ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<ListItemElementType>)}
      role={role}
    >
      {children}
    </Component>
  );
}

ListItem.displayName = "ListItem";
