"use client";

import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  formatDateSafely,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug, cn } from "@web/utils";

import { LIST_ITEM_I18N } from "./ListItem.i18n";

// ============================================================================
// MAIN LIST ITEM COMPONENT
// ============================================================================

export type ListItemLinkProps = Omit<
  React.ComponentPropsWithoutRef<typeof Link>,
  "href" | "target" | "title"
> & {
  /** The href of the link */
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  /** The target of the link */
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  /** The title of the link */
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
};
export type ListItemProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> &
  ListItemLinkProps & {
    /** The component to render as */
    as?: T;
    /** The variant of the list item */
    variant?: "default" | "article" | "social" | "tools";
  };

export const ListItem = setDisplayName(function ListItem<
  T extends React.ElementType = "li",
>(props: ListItemProps<T>) {
  const {
    as: Component = "li" as unknown as T,
    variant = "default",
    role,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // List item component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  // Define a mapping of variants to components
  const variantComponentMap: Record<string, React.ElementType> = {
    default: "li",
    article: ArticleListItem,
    social: SocialListItem,
    tools: ToolsListItem,
  };

  // Choose the component based on variant
  const VariantComponent = variantComponentMap[variant] || Component;

  // For default variant, use string element directly
  // Respect the `as` prop if provided, otherwise use "li" from variant map
  if (variant === "default") {
    const defaultRole = role !== undefined ? role : "listitem";
    const Element = (
      Component !== "li" ? Component : VariantComponent
    ) as React.ElementType;
    return (
      <Element
        {...(rest as any)}
        role={defaultRole}
        {...createComponentProps(componentId, `list-${variant}`, isDebugMode)}
      >
        {children}
      </Element>
    );
  }

  // For variant components, only pass role if explicitly provided
  // Let variant components handle their own default roles
  const variantProps: any = {
    ...(rest as any),
    as: Component,
    variant,
    ...createComponentProps(componentId, `list-${variant}`, isDebugMode),
  };

  if (role !== undefined) {
    variantProps.role = role;
  }

  return <VariantComponent {...variantProps}>{children}</VariantComponent>;
});

// ============================================================================
// MEMOIZED LIST ITEM COMPONENT
// ============================================================================

export const MemoizedListItem = React.memo(ListItem);

// ============================================================================
// MAIN ARTICLE LIST ITEM COMPONENT
// ============================================================================

type ArticleListItemProps = ListItemProps<typeof Card> & {
  /** The article to display */
  article: ArticleWithSlug;
  /** Whether the article is on the front page */
  isFrontPage?: boolean;
};

const ArticleListItem = setDisplayName(function ArticleListItem(
  props: ArticleListItemProps
) {
  const {
    as: Component = Card,
    className,
    article,
    isFrontPage = false,
    debugId,
    debugMode,
    ...rest
  } = props;

  // List item component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!article) return null;

  /** Article data object. */
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
      {...(rest as any)}
      as="article"
      className={cn(!isFrontPage ? "md:col-span-3" : undefined, className)}
      debugId={componentId}
      debugMode={isDebugMode}
      id={articleData.id}
      aria-label={articleData.title}
      aria-describedby={articleData.description}
    >
      <Card.Title
        href={articleData.slug}
        debugId={componentId}
        debugMode={isDebugMode}
        aria-level={1}
      >
        {articleData.title}
      </Card.Title>
      <Card.Eyebrow
        as="time"
        dateTime={articleData.date}
        debugId={componentId}
        debugMode={isDebugMode}
        aria-label={`${LIST_ITEM_I18N.articleDate} ${formatDateSafely(articleData.date)}`}
        decorate
      >
        {formatDateSafely(articleData.date)}
      </Card.Eyebrow>
      <Card.Description debugId={componentId} debugMode={isDebugMode}>
        {articleData.description}
      </Card.Description>
      <Card.Cta
        role="button"
        debugId={componentId}
        debugMode={isDebugMode}
        aria-label={`${LIST_ITEM_I18N.cta}: ${articleData.title || LIST_ITEM_I18N.cta}`}
      >
        {LIST_ITEM_I18N.cta}
      </Card.Cta>
    </Component>
  );
});

// ============================================================================
// MAIN SOCIAL LIST ITEM COMPONENT
// ============================================================================

type SocialListItemProps = ListItemProps<"li">;

const SocialListItem = setDisplayName(function SocialListItem(
  props: SocialListItemProps
) {
  const {
    as: Component = ListItem,
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
      {...rest}
      role="listitem"
      {...createComponentProps(componentId, "social-list-item", isDebugMode)}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// MAIN TOOLS LIST ITEM COMPONENT
// ============================================================================

type ToolsListItemProps = ListItemProps<typeof Card>;

const ToolsListItem = setDisplayName(function ToolsListItem(
  props: ToolsListItemProps
) {
  const {
    as: Component = Card,
    children,
    href,
    role,
    target,
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children || !title) return null;

  // Get the link href and target props
  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...rest}
      as="li"
      role={role}
      debugId={componentId}
      debugMode={isDebugMode}
    >
      <Card.Title
        as="h3"
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        {title}
      </Card.Title>
      <Card.Description debugId={componentId} debugMode={isDebugMode}>
        {children}
      </Card.Description>
    </Component>
  );
});
