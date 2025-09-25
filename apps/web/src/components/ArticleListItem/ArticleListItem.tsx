import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import logger from "@guyromellemagayano/logger";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import {
  ARTICLE_COMPONENT_LABELS,
  type ArticleListItemComponent,
  type ArticleListItemProps,
} from "@web/components/_shared";
import { cn, formatDate, validateArticle } from "@web/utils";

import styles from "./ArticleListItem.module.css";

// ============================================================================
// BASE ARTICLE LIST ITEM COMPONENT
// ============================================================================

/** Renders the base article list item as a Card compound component. */
const BaseArticleListItem: ArticleListItemComponent = setDisplayName(
  function BaseArticleListItem(props) {
    const {
      className,
      article,
      isFrontPage = false,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!article) return null;

    const isValidArticleData = validateArticle(article);
    if (!isValidArticleData) {
      logger.warn(
        `${(ArticleListItem as unknown as { displayName: string }).displayName}: ${ARTICLE_COMPONENT_LABELS.invalidArticleData}`,
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

    /** Renders the article as a `Card` compound component. */
    const ArticleCard: React.FC<Omit<ArticleListItemProps, "article">> =
      function ArticleCard(props) {
        const { className, ...rest } = props;

        const element = (
          <Card
            {...rest}
            role="article"
            className={
              !isFrontPage
                ? cn(styles.articleListItemCard, className)
                : className
            }
            debugId={componentId}
            debugMode={isDebugMode}
            aria-labelledby={
              articleData.title.length > 0
                ? `${componentId}-article-list-item-card-title`
                : undefined
            }
            aria-describedby={
              articleData.description.length > 0
                ? `${componentId}-article-list-item-card-description`
                : undefined
            }
          >
            {articleData.title.length > 0 ? (
              <Card.Title
                id={`${componentId}-article-list-item-card-title`}
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
                dateTime={articleData.date}
                id={`${componentId}-article-list-item-card-date`}
                debugId={componentId}
                debugMode={isDebugMode}
                aria-label={`${ARTICLE_COMPONENT_LABELS.articleDate} ${formatDate(articleData.date)}`}
                decorate
              >
                {formatDate(articleData.date)}
              </Card.Eyebrow>
            ) : null}

            {articleData.description.length > 0 ? (
              <Card.Description
                id={`${componentId}-article-list-item-card-description`}
                debugId={componentId}
                debugMode={isDebugMode}
              >
                {articleData.description}
              </Card.Description>
            ) : null}

            <Card.Cta
              role="button"
              id={`${componentId}-article-list-item-card-cta`}
              debugId={componentId}
              debugMode={isDebugMode}
              aria-label={`${ARTICLE_COMPONENT_LABELS.cta}: ${articleData.title || ARTICLE_COMPONENT_LABELS.articleItem}`}
            >
              {ARTICLE_COMPONENT_LABELS.cta}
            </Card.Cta>
          </Card>
        );

        return element;
      };

    const element = !isFrontPage ? (
      <article
        {...rest}
        role="article"
        id={`${componentId}-article-item`}
        className={cn(styles.articleListItem, className)}
        aria-labelledby={
          articleData.title.length > 0
            ? `${componentId}-article-list-item-card-title`
            : undefined
        }
        aria-describedby={
          articleData.description.length > 0
            ? `${componentId}-article-list-item-card-description`
            : undefined
        }
        {...createComponentProps(componentId, "article-item", debugMode)}
      >
        <ArticleCard {...rest} />
      </article>
    ) : (
      <ArticleCard {...rest} />
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE LIST ITEM COMPONENT
// ============================================================================

/** A memoized article list item component. */
const MemoizedArticleListItem = React.memo(BaseArticleListItem);

// ============================================================================
// MAIN ARTICLE LIST ITEM COMPONENT
// ============================================================================

/** Renders a flexible article list item component using the Card compound component. */
const ArticleListItem: ArticleListItemComponent = setDisplayName(
  function ArticleListItem(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedArticleListItem
      : BaseArticleListItem;
    const element = <Component {...rest} />;
    return element;
  }
);

export default ArticleListItem;
