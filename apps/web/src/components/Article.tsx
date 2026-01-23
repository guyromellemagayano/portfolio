/**
 * @file Article.tsx
 * @author Guy Romelle Magayano
 * @description Presentational component for displaying article cards using the Card compound component.
 */

import React, { useMemo } from "react";

import { useTranslations } from "next-intl";

import { useComponentId } from "@guyromellemagayano/hooks";
import { formatDateSafely } from "@guyromellemagayano/utils";

import { type CommonAppComponentProps } from "@web/types/common";
import { type ArticleWithSlug } from "@web/utils/articles";

import { Card } from "./Card";

export type ArticleProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps &
    React.ComponentPropsWithRef<typeof Card> &
    T & {
      article: ArticleWithSlug;
    };

export function Article<T extends Record<string, unknown> = {}>(
  props: ArticleProps<T>
) {
  const { as: Component = Card, article, debugId, debugMode, ...rest } = props;

  // Internationalization
  const t = useTranslations("article");

  // Article component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({ debugId, debugMode });

  // Article data object
  const articleData = useMemo(() => {
    if (!article) return null;

    // Use primitive dependencies to avoid unnecessary recalculations
    const title = article.title?.trim() ?? "";
    const description = article.description?.trim() ?? "";
    const date = article.date?.trim() ?? null;
    const slug = article.slug?.trim() ?? "";
    const image = article.image?.trim();
    const tagsString = article.tags?.map((tag) => tag.trim()).join(",") ?? "";

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
  }, [article]);

  if (!articleData) return null;

  // ARIA relationships
  const titleId = `${componentId}-base-article-card-title`;
  const descriptionId = `${componentId}-base-article-card-description`;

  return (
    <Component
      {...rest}
      role="article"
      debugId={componentId}
      debugMode={isDebugMode}
      aria-labelledby={articleData.title ? titleId : undefined}
      aria-describedby={articleData.description ? descriptionId : undefined}
    >
      {articleData.title ? (
        <Card.Title
          id={titleId}
          href={articleData.slug}
          debugId={componentId}
          debugMode={isDebugMode}
          aria-level={1}
        >
          {articleData.title}
        </Card.Title>
      ) : null}

      {articleData.date ? (
        <Card.Eyebrow
          as="time"
          dateTime={articleData.date}
          debugId={componentId}
          debugMode={isDebugMode}
          aria-label={`${t("articleDate")} ${articleData.formattedDate}`}
          decorate
        >
          {articleData.formattedDate}
        </Card.Eyebrow>
      ) : null}

      {articleData.description ? (
        <Card.Description
          id={descriptionId}
          debugId={componentId}
          debugMode={isDebugMode}
        >
          {articleData.description}
        </Card.Description>
      ) : null}

      {articleData.title && articleData.date && articleData.description ? (
        <Card.Cta
          role="button"
          debugId={componentId}
          debugMode={isDebugMode}
          aria-label={`${t("cta")}: ${articleData.title || "Article"}`}
        >
          {t("cta")}
        </Card.Cta>
      ) : null}
    </Component>
  );
}

Article.displayName = "Article";
