/**
 * @file apps/web/src/components/article/Article.tsx
 * @author Guy Romelle Magayano
 * @description Main Article component implementation.
 */

import { type ComponentPropsWithRef } from "react";

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

  // Internationalization
  const articleI18n = useTranslations("components.article");

  // Article labels
  const ARTICLE_I18N = {
    articleDate: articleI18n("articleDate"),
    cta: articleI18n("cta"),
  };

  if (!article) return null;

  const slugValue = article.slug?.trim() ?? "";
  const articleId =
    slugValue.length > 0
      ? `article-${slugValue.replace(/[^a-zA-Z0-9_-]/g, "-")}`
      : undefined;
  const titleId = articleId ? `${articleId}-title` : undefined;
  const descriptionId = articleId ? `${articleId}-description` : undefined;
  const articleData = {
    title: article.title?.trim() ?? "",
    description: article.description?.trim() ?? "",
    date: article.date?.trim() ?? null,
    formattedDate: formatDateSafely(article.date?.trim() ?? null),
    slug: slugValue ? `/articles/${encodeURIComponent(slugValue)}` : undefined,
  };

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
