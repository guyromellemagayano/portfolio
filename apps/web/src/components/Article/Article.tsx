"use client";

import React, { useMemo } from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import logger from "@guyromellemagayano/logger";
import { formatDateSafely, setDisplayName } from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug, validateArticle } from "@web/utils";

import { ARTICLE_I18N } from "./constants";

// ============================================================================
// ARTICLE COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleProps
  extends React.ComponentPropsWithRef<typeof Card>,
    CommonComponentProps {
  /** The article to display. */
  article: ArticleWithSlug;
  /** Whether to enable memoization */
  isMemoized?: boolean;
}
export type ArticleComponent = React.FC<ArticleProps>;

// ============================================================================
// BASE ARTICLE COMPONENT
// ============================================================================

/**
 * A presentational component that displays an article's title, date, description, and a
 * call-to-action inside a `Card` component.
 */
const BaseArticle: ArticleComponent = setDisplayName(
  function BaseArticle(props) {
    const { article, debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    // Optimized data processing with useMemo (must be before early returns)
    const articleData = useMemo(() => {
      if (
        !article ||
        !article.title ||
        !article.slug ||
        !article.date ||
        !article.description
      ) {
        return null;
      }

      return {
        title: article.title.trim(),
        slug: encodeURIComponent(`/articles/${article.slug.trim()}`),
        date: article.date.trim(),
        description: article.description.trim(),
        formattedDate: formatDateSafely(article.date.trim()),
      };
    }, [article]);

    if (!article) return null;

    const isValidArticleData = validateArticle(article);
    if (!isValidArticleData) {
      logger.warn(
        `${(BaseArticle as unknown as { displayName: string }).displayName}: ${ARTICLE_I18N.invalidArticleData}`,
        {
          article,
        }
      );

      return null;
    }

    const element = (
      <Card
        {...rest}
        role="article"
        debugId={componentId}
        debugMode={isDebugMode}
        aria-labelledby={
          articleData?.title && articleData.title.length > 0
            ? `${componentId}-base-article-card-title`
            : undefined
        }
        aria-describedby={
          articleData?.description && articleData.description.length > 0
            ? `${componentId}-base-article-card-description`
            : undefined
        }
      >
        {articleData?.title && articleData.title.length > 0 ? (
          <Card.Title
            id={`${componentId}-base-article-card-title`}
            href={articleData.slug}
            debugId={componentId}
            debugMode={isDebugMode}
            aria-level={1}
          >
            {articleData.title}
          </Card.Title>
        ) : null}

        {articleData?.date &&
        articleData.date.length > 0 &&
        !isNaN(new Date(articleData.date).getTime()) ? (
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
        ) : null}

        {articleData?.description && articleData.description.length > 0 ? (
          <Card.Description debugId={componentId} debugMode={isDebugMode}>
            {articleData.description}
          </Card.Description>
        ) : null}

        <Card.Cta
          role="button"
          debugId={componentId}
          debugMode={isDebugMode}
          aria-label={`${ARTICLE_I18N.cta}: ${articleData?.title || "Article"}`}
        >
          {ARTICLE_I18N.cta}
        </Card.Cta>
      </Card>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE COMPONENT
// ============================================================================

/** A memoized article component with custom comparison. */
const MemoizedArticle = React.memo(BaseArticle, (prevProps, nextProps) => {
  // Only re-render if article data actually changes
  return (
    prevProps.article === nextProps.article ||
    (prevProps.article?.title === nextProps.article?.title &&
      prevProps.article?.slug === nextProps.article?.slug &&
      prevProps.article?.date === nextProps.article?.date &&
      prevProps.article?.description === nextProps.article?.description)
  );
});

// ============================================================================
// MAIN ARTICLE COMPONENT
// ============================================================================

/** Main article component that renders an article card component, optionally memoized. */
export const Article: ArticleComponent = setDisplayName(
  function Article(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedArticle : BaseArticle;
    const element = <Component {...rest} />;
    return element;
  }
);
