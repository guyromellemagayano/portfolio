import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { ArticleWithSlug, cn, formatDate } from "@web/utils";

import { ARTICLE_COMPONENT_LABELS } from "../_shared";
import styles from "./ArticleListItem.module.css";

// ============================================================================
// ARTICLE LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

interface ArticleListItemProps
  extends React.ComponentProps<"article">,
    CommonComponentProps {
  /** The article to display. */
  article: ArticleWithSlug;
  /** Whether the article is on the front page. */
  isFrontPage?: boolean;
}
type ArticleListItemComponent = React.FC<ArticleListItemProps>;

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
      internalId,
      debugMode,
      ...rest
    } = props;

    if (!article) return null;

    let trimmedTitle = article.title?.trim() ?? "";
    let trimmedSlug = article.slug?.trim() ?? "";
    let trimmedDate = article.date?.trim() ?? "";
    let trimmedDescription = article.description?.trim() ?? "";

    // Validate that required fields have content
    if (
      trimmedTitle.length === 0 ||
      trimmedSlug.length === 0 ||
      trimmedDate.length === 0 ||
      trimmedDescription.length === 0
    ) {
      return null;
    }

    const articleSlug = encodeURIComponent(`/articles/${trimmedSlug}`);

    const ArticleCard: React.FC<Omit<ArticleListItemProps, "article">> =
      function ArticleCard(props) {
        const { className, internalId, debugMode, ...rest } = props;

        const element = (
          <Card
            {...rest}
            className={
              !isFrontPage
                ? cn(styles.articleListItemCard, className)
                : className
            }
            internalId={internalId}
            debugMode={debugMode}
            role="article"
            aria-labelledby={
              trimmedTitle.length > 0
                ? `${internalId}-article-card-title`
                : undefined
            }
            aria-describedby={
              trimmedDescription.length > 0
                ? `${internalId}-article-card-description`
                : undefined
            }
          >
            {trimmedTitle.length > 0 ? (
              <Card.Title
                href={articleSlug}
                internalId={internalId}
                debugMode={debugMode}
                id={`${internalId}-article-card-title`}
                aria-level={1}
              >
                {trimmedTitle}
              </Card.Title>
            ) : null}

            {trimmedDate.length > 0 &&
            !isNaN(new Date(trimmedDate).getTime()) ? (
              <Card.Eyebrow
                as="time"
                dateTime={trimmedDate}
                decorate
                internalId={internalId}
                debugMode={debugMode}
                id={`${internalId}-article-card-date`}
                aria-label={`${ARTICLE_COMPONENT_LABELS.articleDate} ${formatDate(trimmedDate)}`}
              >
                {formatDate(trimmedDate)}
              </Card.Eyebrow>
            ) : null}

            {trimmedDescription.length > 0 ? (
              <Card.Description
                internalId={internalId}
                debugMode={debugMode}
                id={`${internalId}-article-card-description`}
              >
                {trimmedDescription}
              </Card.Description>
            ) : null}

            <Card.Cta
              internalId={internalId}
              debugMode={debugMode}
              id={`${internalId}-article-card-cta`}
              role="button"
              aria-label={`${ARTICLE_COMPONENT_LABELS.cta}: ${trimmedTitle || "Article"}`}
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
        id={`${internalId}-article-item`}
        className={cn(styles.articleListItem, className)}
        role="article"
        aria-labelledby={
          trimmedTitle.length > 0
            ? `${internalId}-article-card-title`
            : undefined
        }
        aria-describedby={
          trimmedDescription.length > 0
            ? `${internalId}-article-card-description`
            : undefined
        }
        {...createComponentProps(internalId, "article-item", debugMode)}
      >
        <ArticleCard
          internalId={internalId}
          debugMode={debugMode}
          className={className}
          {...rest}
        />
      </article>
    ) : (
      <ArticleCard
        internalId={internalId}
        debugMode={debugMode}
        className={className}
        {...rest}
      />
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
    const { isMemoized = false, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const updatedProps = {
      ...rest,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized
      ? MemoizedArticleListItem
      : BaseArticleListItem;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export default ArticleListItem;
