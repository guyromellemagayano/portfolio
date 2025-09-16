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

import { ARTICLE_LAYOUT_COMPONENT_LABELS } from "./_data";
import styles from "./ArticleItem.module.css";

// ============================================================================
// ARTICLE ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleItemProps
  extends React.ComponentProps<typeof Card>,
    CommonComponentProps,
    Omit<CommonComponentProps, "as"> {
  /** The article to display. */
  article: ArticleWithSlug;
}
export type ArticleItemComponent = React.FC<ArticleItemProps>;

// ============================================================================
// BASE ARTICLE ITEM COMPONENT
// ============================================================================

/** Renders the base article item as a Card compound component. */
const BaseArticleItem: ArticleItemComponent = setDisplayName(
  function BaseArticleItem(props) {
    const { className, article, internalId, debugMode, ...rest } = props;

    const element = (
      <Card
        {...rest}
        as="article"
        className={cn(styles.articleItem, className)}
        {...createComponentProps(internalId, "article-item", debugMode)}
      >
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow as="time" dateTime={article.date} decorate>
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>{ARTICLE_LAYOUT_COMPONENT_LABELS.cta}</Card.Cta>
      </Card>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE ITEM COMPONENT
// ============================================================================

/** A memoized article item component. */
const MemoizedArticleItem = React.memo(BaseArticleItem);

// ============================================================================
// MAIN ARTICLE ITEM COMPONENT
// ============================================================================

/** Renders a flexible article item component using the Card compound component. */
export const ArticleItem: ArticleItemComponent = setDisplayName(
  function ArticleItem(props) {
    const {
      article,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;
    const { title, description } = article;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    if (!hasMeaningfulText(title) && !hasMeaningfulText(description))
      return null;

    const updatedProps = {
      ...rest,
      article,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedArticleItem : BaseArticleItem;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
