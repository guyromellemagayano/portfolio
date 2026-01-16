/**
 * @file Article.tsx
 * @author Guy Romelle Magayano
 * @description Presentational component for displaying article cards using the Card compound component.
 */

import React, { useMemo } from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { formatDateSafely } from "@guyromellemagayano/utils";

import { Card } from "@web/components/Card";
import { type ArticleWithSlug } from "@web/utils";

import { ARTICLE_I18N } from "./constants/Article.i18n";

const ArticleElementType = Card;

export interface ArticleProps
  extends
    React.ComponentPropsWithoutRef<typeof ArticleElementType>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {
  article: ArticleWithSlug;
}

export function Article(props: ArticleProps) {
  const {
    as: Component = ArticleElementType,
    article,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Article component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  // Use primitive dependencies to avoid unnecessary recalculations
  const title = article.title?.trim() ?? "";
  const description = article.description?.trim() ?? "";
  const date = article.date?.trim() ?? null;
  const slug = article.slug?.trim() ?? "";
  const image = article.image?.trim();
  const tagsString = article.tags?.map((tag) => tag.trim()).join(",") ?? "";

  // Article data object
  const articleData = useMemo(() => {
    if (!article) return null;

    // Reconstruct tags array from string for consistency
    const tags = tagsString ? tagsString.split(",").filter(Boolean) : [];

    return {
      title,
      description,
      date,
      formattedDate: formatDateSafely(date),
      slug: slug ? `/articles/${encodeURIComponent(slug)}` : undefined,
      image: image || undefined,
      tags,
    };
  }, [article, title, description, date, slug, image, tagsString]);

  if (!articleData) return null;

  if (!articleData.title || !articleData.description || !articleData.date)
    return null;

  // ARIA relationships
  const titleId = `${componentId}-base-article-card-title`;
  const descriptionId = `${componentId}-base-article-card-description`;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role="article"
      debugId={componentId}
      debugMode={isDebugMode}
      aria-labelledby={articleData.title ? titleId : undefined}
      aria-describedby={articleData.description ? descriptionId : undefined}
    >
      {articleData.title && (
        <Card.Title
          id={titleId}
          href={articleData.slug}
          debugId={componentId}
          debugMode={isDebugMode}
          aria-level={1}
        >
          {articleData.title}
        </Card.Title>
      )}

      {articleData.date && (
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
      )}

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
        aria-label={`${ARTICLE_I18N.cta}: ${articleData.title || "Article"}`}
      >
        {ARTICLE_I18N.cta}
      </Card.Cta>
    </Component>
  );
}
