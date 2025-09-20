// ============================================================================
// ARTICLE COMPONENT TYPES & INTERFACES
// ============================================================================

import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { isRenderableContent, setDisplayName } from "@guyromellemagayano/utils";

import { Card } from "@web/components";
import { type ArticleWithSlug, formatDate } from "@web/utils";

import { ARTICLE_COMPONENT_LABELS } from "./_data";
import {
  ArticleLayout,
  ArticleList,
  ArticleListItem,
  ArticleNavButton,
} from "./_internal";

interface ArticleProps
  extends React.ComponentPropsWithRef<typeof Card>,
    CommonComponentProps {
  article: ArticleWithSlug;
}
type ArticleComponent = React.FC<ArticleProps>;

// ============================================================================
// BASE ARTICLE COMPONENT
// ============================================================================

const BaseArticle: ArticleComponent = setDisplayName(
  function BaseArticle(props) {
    const { article, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const element = (
      <Card {...rest}>
        <Card.Title
          href={`/articles/${article.slug}`}
          internalId={id}
          debugMode={isDebugMode}
        >
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          decorate
          internalId={id}
          debugMode={isDebugMode}
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description internalId={id} debugMode={isDebugMode}>
          {article.description}
        </Card.Description>
        <Card.Cta internalId={id} debugMode={isDebugMode}>
          {ARTICLE_COMPONENT_LABELS.cta}
        </Card.Cta>
      </Card>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE COMPONENT
// ============================================================================

/** A memoized article component. */
const MemoizedArticle = React.memo(BaseArticle);

// ============================================================================
// MAIN ARTICLE COMPONENT
// ============================================================================

/** Renders an article using a Card layout, supporting memoization and custom layouts. */
const Article = setDisplayName(function Article(props) {
  const { article, isMemoized = false, internalId, debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!isRenderableContent(article)) return null;

  const updatedProps = {
    ...rest,
    article,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedArticle : BaseArticle;
  const element = <Component {...updatedProps} />;
  return element;
} as ArticleCompoundComponent);

// ============================================================================
// ARTICLE COMPOUND COMPONENTS
// ============================================================================

type ArticleCompoundComponent = ArticleComponent & {
  /** A layout component for an article. */
  Layout: typeof ArticleLayout;
  /** A list component for an article. */
  List: typeof ArticleList;
  /** A list item component for an article. */
  ListItem: typeof ArticleListItem;
  /** A navigation button component for an article. */
  NavButton: typeof ArticleNavButton;
};

Article.Layout = ArticleLayout;
Article.List = ArticleList;
Article.ListItem = ArticleListItem;
Article.NavButton = ArticleNavButton;

export default Article;
