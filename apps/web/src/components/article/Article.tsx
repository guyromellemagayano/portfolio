/**
 * @file apps/web/src/components/article/Article.tsx
 * @author Guy Romelle Magayano
 * @description Main Article component implementation.
 */

"use client";

import { type ComponentPropsWithRef, useId, useMemo } from "react";

import { useTranslations } from "next-intl";

import { formatDateSafely } from "@portfolio/utils";

import { type ArticleWithSlug } from "@web/utils/articles";

import { Card } from "../card";

export type ArticleElementType = typeof Card;
export type ArticleProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<ArticleElementType>,
  "as"
> &
  P & {
    as?: ArticleElementType;
    article: ArticleWithSlug;
  };

export function Article<P extends Record<string, unknown> = {}>(
  props: ArticleProps<P>
) {
  const { as: Component = Card, article, ...rest } = props;

  // Generate unique IDs for ARIA relationships (SEO: proper semantic structure)
  const articleId = useId();
  const titleId = `${articleId}-title`;
  const descriptionId = `${articleId}-description`;

  // Internationalization
  const articleI18n = useTranslations("components.article");

  // Article labels
  const ARTICLE_I18N = {
    articleDate: articleI18n("articleDate"),
    cta: articleI18n("cta"),
  };

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

  return (
    <Component
      {...(rest as ComponentPropsWithRef<ArticleElementType>)}
      aria-labelledby={articleData.title ? titleId : undefined}
      aria-describedby={articleData.description ? descriptionId : undefined}
    >
      {articleData.title &&
      articleData.title.trim().length > 0 &&
      articleData.slug &&
      articleData.slug.trim().length > 0 ? (
        <Card.Title id={titleId} href={articleData.slug}>
          {articleData.title}
        </Card.Title>
      ) : null}

      {articleData.date && articleData.date.trim().length > 0 ? (
        <Card.Eyebrow
          as="time"
          dateTime={articleData.date}
          aria-label={`${ARTICLE_I18N.articleDate} ${articleData.formattedDate}`}
          decorate
        >
          {articleData.formattedDate}
        </Card.Eyebrow>
      ) : null}

      {articleData.description && articleData.description.trim().length > 0 ? (
        <Card.Description id={descriptionId}>
          {articleData.description}
        </Card.Description>
      ) : null}

      {articleData.title &&
      articleData.title.trim().length > 0 &&
      articleData.slug &&
      articleData.slug.trim().length > 0 &&
      articleData.date &&
      articleData.date.trim().length > 0 &&
      articleData.description &&
      articleData.description.trim().length > 0 ? (
        <Card.Cta href={articleData.slug} title={articleData.title}>
          {ARTICLE_I18N.cta}
        </Card.Cta>
      ) : null}
    </Component>
  );
}

Article.displayName = "Article";
