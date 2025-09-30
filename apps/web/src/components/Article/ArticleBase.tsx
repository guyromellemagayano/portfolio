import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import logger from "@guyromellemagayano/logger";
import { formatDateSafely, setDisplayName } from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug, validateArticle } from "@web/utils";

import { ARTICLE_COMPONENT_LABELS } from "./i18n/Article.i18n";

// ============================================================================
// ARTICLE BASE COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleBase` component props. */
export interface ArticleBaseProps
  extends React.ComponentPropsWithRef<typeof Card>,
    CommonComponentProps {
  /** The article to display. */
  article: ArticleWithSlug;
}

/** `ArticleBase` component type. */
export type ArticleBaseComponent = React.FC<ArticleBaseProps>;

// ============================================================================
// BASE ARTICLE BASE COMPONENT
// ============================================================================

/**
 * A presentational component that displays an article's title, date, description, and a
 * call-to-action inside a `Card` component.
 */
const BaseArticleBase: ArticleBaseComponent = setDisplayName(
  function BaseArticleBase(props) {
    const { article, debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!article) return null;

    const isValidArticleData = validateArticle(article);
    if (!isValidArticleData) {
      logger.warn(
        `${(ArticleBase as unknown as { displayName: string }).displayName}: ${ARTICLE_COMPONENT_LABELS.invalidArticleData}`,
        {
          article,
        }
      );

      return null;
    }

    const articleData = {
      title: article.title.trim(),
      slug: encodeURIComponent(`/articles/${article.slug.trim()}`),
      date: article.date.trim(),
      description: article.description.trim(),
    };

    const element = (
      <Card
        {...rest}
        role="article"
        debugId={componentId}
        debugMode={isDebugMode}
        aria-labelledby={
          articleData.title.length > 0
            ? `${componentId}-base-article-card-title`
            : undefined
        }
        aria-describedby={
          articleData.description.length > 0
            ? `${componentId}-base-article-card-description`
            : undefined
        }
      >
        {articleData.title.length > 0 ? (
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

        {articleData.date.length > 0 &&
        !isNaN(new Date(articleData.date).getTime()) ? (
          <Card.Eyebrow
            as="time"
            id={`${componentId}-base-article-card-date`}
            dateTime={articleData.date}
            debugId={componentId}
            debugMode={isDebugMode}
            aria-label={`${ARTICLE_COMPONENT_LABELS.articleDate} ${formatDateSafely(articleData.date)}`}
            decorate
          >
            {formatDateSafely(articleData.date)}
          </Card.Eyebrow>
        ) : null}

        {articleData.description.length > 0 ? (
          <Card.Description
            id={`${componentId}-base-article-card-description`}
            debugId={componentId}
            debugMode={isDebugMode}
          >
            {articleData.description}
          </Card.Description>
        ) : null}

        <Card.Cta
          role="button"
          id={`${componentId}-base-article-card-cta`}
          debugId={componentId}
          debugMode={isDebugMode}
          aria-label={`${ARTICLE_COMPONENT_LABELS.cta}: ${articleData.title || "Article"}`}
        >
          {ARTICLE_COMPONENT_LABELS.cta}
        </Card.Cta>
      </Card>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE BASE COMPONENT
// ============================================================================

/** A memoized article component. */
const MemoizedArticleBase = React.memo(BaseArticleBase);

// ============================================================================
// MAIN ARTICLE BASE COMPONENT
// ============================================================================

/** Main article base component that renders an article card component, optionally memoized. */
export const ArticleBase: ArticleBaseComponent = setDisplayName(
  function ArticleBase(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedArticleBase : BaseArticleBase;
    const element = <Component {...rest} />;
    return element;
  }
);
