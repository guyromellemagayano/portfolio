import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import logger from "@guyromellemagayano/logger";
import {
  createComponentProps,
  formatDateSafely,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug, cn, validateArticle } from "@web/utils";

import { ARTICLE_I18N } from "./constants";

// ============================================================================
// ARTICLE LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleListItemProps
  extends Omit<React.ComponentProps<"article">, "ref">,
    CommonComponentProps {
  /** The article to display. */
  article: ArticleWithSlug;
  /** Whether the article is on the front page. */
  isFrontPage?: boolean;
  /** Whether to enable memoization */
  isMemoized?: boolean;
}
export type ArticleListItemComponent = React.ForwardRefExoticComponent<
  ArticleListItemProps & React.RefAttributes<HTMLElement>
>;

// ============================================================================
// BASE ARTICLE LIST ITEM COMPONENT
// ============================================================================

/** Renders the base article list item as a Card compound component. */
const BaseArticleListItem = setDisplayName(
  React.forwardRef<HTMLElement, ArticleListItemProps>(
    function BaseArticleListItem(props, ref) {
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
          `${(ArticleListItem as unknown as { displayName: string }).displayName}: ${ARTICLE_I18N.invalidArticleData}`,
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
                !isFrontPage ? cn("md:col-span-3", className) : className
              }
              debugId={componentId}
              debugMode={isDebugMode}
            >
              {articleData.title.length > 0 ? (
                <Card.Title
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
                  debugId={componentId}
                  debugMode={isDebugMode}
                  aria-label={`${ARTICLE_I18N.articleDate} ${formatDateSafely(articleData.date)}`}
                  decorate
                >
                  {formatDateSafely(articleData.date)}
                </Card.Eyebrow>
              ) : null}

              {articleData.description.length > 0 ? (
                <Card.Description debugId={componentId} debugMode={isDebugMode}>
                  {articleData.description}
                </Card.Description>
              ) : null}

              <Card.Cta
                role="button"
                debugId={componentId}
                debugMode={isDebugMode}
                aria-label={`${ARTICLE_I18N.cta}: ${articleData.title || ARTICLE_I18N.cta}`}
              >
                {ARTICLE_I18N.cta}
              </Card.Cta>
            </Card>
          );

          return element;
        };

      const element = !isFrontPage ? (
        <article
          ref={ref}
          {...rest}
          role="article"
          className={cn("md:grid md:grid-cols-4 md:items-baseline", className)}
          {...createComponentProps(componentId, "article-item", debugMode)}
        >
          <ArticleCard {...rest} />
        </article>
      ) : (
        <ArticleCard {...rest} />
      );

      return element;
    }
  )
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
export const ArticleListItem: ArticleListItemComponent = setDisplayName(
  React.forwardRef<HTMLElement, ArticleListItemProps>(
    function ArticleListItem(props, ref) {
      const { isMemoized = false, ...rest } = props;

      const Component = isMemoized
        ? MemoizedArticleListItem
        : BaseArticleListItem;
      const element = <Component {...rest} ref={ref} />;
      return element;
    }
  )
);
