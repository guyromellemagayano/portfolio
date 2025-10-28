import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  formatDateSafely,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug, cn } from "@web/utils";

import { LIST_ITEM_I18N } from "../ListItem.i18n";

// ============================================================================
// ARTICLE LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleListItemProps
  extends Omit<React.ComponentPropsWithRef<"article">, "ref">,
    CommonComponentProps {
  /** The article to display. */
  article: ArticleWithSlug;
  /** Whether the article is on the front page. */
  isFrontPage?: boolean;
}
export type ArticleListItemComponent = React.FC<ArticleListItemProps>;

// ============================================================================
// BASE ARTICLE LIST ITEM COMPONENT
// ============================================================================

const BaseArticleListItem = setDisplayName(function BaseArticleListItem(props) {
  const {
    as: Component = "article",
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

  // Check for required fields and return null if any are missing
  if (
    !article.title ||
    !article.description ||
    !article.slug ||
    !article.date
  ) {
    return null;
  }

  const trimmedTitle = article.title.trim();
  const trimmedSlug = article.slug.trim();
  const trimmedDate = article.date.trim();
  const trimmedDescription = article.description.trim();

  // Check if any required fields are empty after trimming
  if (!trimmedTitle || !trimmedSlug || !trimmedDate || !trimmedDescription) {
    return null;
  }

  // Check if date is valid
  if (isNaN(new Date(trimmedDate).getTime())) {
    return null;
  }

  const articleData = {
    id: trimmedSlug,
    title: trimmedTitle,
    slug: encodeURIComponent(`/articles/${trimmedSlug}`),
    date: trimmedDate,
    description: trimmedDescription,
  };

  /** Renders the article as a `Card` compound component. */
  const ArticleCard: React.FC<Omit<ArticleListItemProps, "article">> =
    function ArticleCard(props) {
      const { className, ...rest } = props;

      const element = (
        <Card
          {...rest}
          as="article"
          className={!isFrontPage ? cn("md:col-span-3", className) : className}
          debugId={componentId}
          debugMode={isDebugMode}
          id={articleData.id}
          aria-label={articleData.title}
          aria-describedby={articleData.description}
        >
          {articleData?.title &&
          articleData.title.trim().length > 0 &&
          articleData.title !== "" ? (
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
              aria-label={`${LIST_ITEM_I18N.articleDate} ${formatDateSafely(articleData.date)}`}
              decorate
            >
              {formatDateSafely(articleData.date)}
            </Card.Eyebrow>
          ) : null}

          {articleData?.description &&
          articleData.description.trim().length > 0 &&
          articleData.description !== "" ? (
            <Card.Description debugId={componentId} debugMode={isDebugMode}>
              {articleData.description}
            </Card.Description>
          ) : null}

          <Card.Cta
            role="button"
            debugId={componentId}
            debugMode={isDebugMode}
            aria-label={`${LIST_ITEM_I18N.cta}: ${articleData.title || LIST_ITEM_I18N.cta}`}
          >
            {LIST_ITEM_I18N.cta}
          </Card.Cta>
        </Card>
      );

      return element;
    };

  const element = !isFrontPage ? (
    <Component
      {...rest}
      role="article"
      className={cn("md:grid md:grid-cols-4 md:items-baseline", className)}
      {...createComponentProps(componentId, "article-item", debugMode)}
    >
      <ArticleCard {...rest} />
    </Component>
  ) : (
    <ArticleCard {...rest} />
  );

  return element;
});

// ============================================================================
// MEMOIZED ARTICLE LIST ITEM COMPONENT
// ============================================================================

const MemoizedArticleListItem = React.memo(BaseArticleListItem);

// ============================================================================
// MAIN ARTICLE LIST ITEM COMPONENT
// ============================================================================

export const ArticleListItem: ArticleListItemComponent = setDisplayName(
  function ArticleListItem(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedArticleListItem
      : BaseArticleListItem;
    const element = <Component {...rest} />;
    return element;
  }
);
