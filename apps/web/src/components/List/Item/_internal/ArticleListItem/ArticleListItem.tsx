import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasMeaningfulText,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { ArticleWithSlug, cn, formatDate } from "@web/utils";

import { ARTICLE_LIST_ITEM_COMPONENT_LABELS } from "./_data";
import styles from "./ArticleListItem.module.css";

// ============================================================================
// ARTICLE LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleListItemProps
  extends React.ComponentProps<"article">,
    Omit<CommonComponentProps, "as"> {
  /** The article to display. */
  article: ArticleWithSlug;
  /** Whether the article is on the front page. */
  isFrontPage?: boolean;
}
export type ArticleListItemComponent = React.FC<ArticleListItemProps>;

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
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { title, date, description, image, tags, slug } = article;

    const ArticleCard = function () {
      return (
        <Card
          as="article"
          className={
            !isFrontPage ? cn(styles.articleListItemCard, className) : undefined
          }
          {...createComponentProps(internalId, "article-item", debugMode)}
        >
          <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
          <Card.Eyebrow as="time" dateTime={date} decorate>
            {formatDate(date)}
          </Card.Eyebrow>
          <Card.Description>{description}</Card.Description>
          <Card.Cta>{ARTICLE_LIST_ITEM_COMPONENT_LABELS.cta}</Card.Cta>
        </Card>
      );
    };

    const element = !isFrontPage ? (
      <article {...rest} className={cn(styles.articleListItem, className)}>
        <ArticleCard />
      </article>
    ) : (
      <ArticleCard />
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
export const ArticleListItem: ArticleListItemComponent = setDisplayName(
  function ArticleListItem(props) {
    const {
      article,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { title, date, description, image, tags, slug } = article;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (
      !hasMeaningfulText(title) ||
      !hasMeaningfulText(description) ||
      !hasMeaningfulText(slug) ||
      !hasMeaningfulText(date)
      // TODO: Add back in when we have tags and image
      // !hasMeaningfulText(tags) ||
      // !hasMeaningfulText(image)
    )
      return null;

    const updatedProps = {
      ...rest,
      article,
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
