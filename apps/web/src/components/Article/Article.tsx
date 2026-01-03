import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { formatDateSafely, setDisplayName } from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug } from "@web/utils";

// ============================================================================
// ARTICLE COMPONENT I18N
// ============================================================================

type ArticleI18n = Readonly<Record<string, string>>;

const ARTICLE_I18N = {
  // Action labels
  cta: "Read article",

  // Content labels
  articleDate: "Published on",
} as const satisfies ArticleI18n;

// ============================================================================
// ARTICLE COMPONENT
// ============================================================================

type ArticleElementType = typeof Card;

export type ArticleProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only `Card` is allowed */
    as?: T;
    /** The article to render */
    article: ArticleWithSlug;
  };

export const Article = setDisplayName(function Article<
  T extends ArticleElementType,
>(props: ArticleProps<T>) {
  const { as: Component = Card, article, debugId, debugMode, ...rest } = props;

  // Article component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  if (!article) return null;

  const articleData = {
    title: article.title?.trim() ?? "",
    description: article.description?.trim() ?? "",
    date: article.date?.trim() ?? null,
    formattedDate: formatDateSafely(article.date?.trim() ?? null),
    slug: isNaN(new Date(article.date?.trim() ?? "").getTime())
      ? undefined
      : new URL(encodeURIComponent(`/articles/${article.slug.trim()}`)),
    image: article.image?.trim() ?? "#",
    tags: article.tags?.map((tag) => tag.trim()) ?? [],
  };

  // ARIA relationships
  const titleId = `${componentId}-base-article-card-title`;
  const descriptionId = `${componentId}-base-article-card-description`;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role="article"
      debugId={componentId}
      debugMode={isDebugMode}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <Card.Title
        id={titleId}
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
        aria-label={`${ARTICLE_I18N.articleDate} ${articleData.formattedDate}`}
        decorate
      >
        {articleData.formattedDate}
      </Card.Eyebrow>
      <Card.Description
        id={descriptionId}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        {articleData.description}
      </Card.Description>
      <Card.Cta
        role="button"
        debugId={componentId}
        debugMode={isDebugMode}
        aria-label={`${ARTICLE_I18N.cta}: ${articleData?.title || "Article"}`}
      >
        {ARTICLE_I18N.cta}
      </Card.Cta>
    </Component>
  );
});

// ============================================================================
// MEMOIZED ARTICLE COMPONENT
// ============================================================================

export const MemoizedArticle = React.memo(Article);
