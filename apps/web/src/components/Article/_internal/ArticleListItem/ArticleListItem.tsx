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

import { ARTICLE_COMPONENT_LABELS } from "../../_data";
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
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { title, date, description, image, tags, slug } = article;

    const articleSlug = `/articles/${slug}`;

    const ArticleCard = function ArticleCard({
      internalId,
      debugMode,
      ...cardProps
    }: CommonComponentProps & Record<string, any>) {
      return (
        <Card
          className={
            !isFrontPage ? cn(styles.articleListItemCard, className) : undefined
          }
          internalId={internalId}
          debugMode={debugMode}
          {...cardProps}
        >
          <Card.Title
            href={articleSlug}
            internalId={internalId}
            debugMode={debugMode}
          >
            {title}
          </Card.Title>
          <Card.Eyebrow
            as="time"
            dateTime={date}
            decorate
            internalId={internalId}
            debugMode={debugMode}
          >
            {formatDate(date)}
          </Card.Eyebrow>
          <Card.Description internalId={internalId} debugMode={debugMode}>
            {description}
          </Card.Description>
          <Card.Cta internalId={internalId} debugMode={debugMode}>
            {ARTICLE_COMPONENT_LABELS.cta}
          </Card.Cta>
        </Card>
      );
    };

    const element = !isFrontPage ? (
      <article
        {...rest}
        id={`${internalId}-article-item`}
        className={cn(styles.articleListItem, className)}
        {...createComponentProps(internalId, "article-item", debugMode)}
      >
        <ArticleCard internalId={internalId} debugMode={debugMode} {...rest} />
      </article>
    ) : (
      <ArticleCard internalId={internalId} debugMode={debugMode} {...rest} />
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

export default ArticleListItem;
