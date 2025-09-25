import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  ARTICLE_COMPONENT_LABELS,
  type ArticleListComponent,
} from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./ArticleList.module.css";

// ============================================================================
// BASE LIST COMPONENT
// ============================================================================

/** Renders a base container for a list of articles. */
const BaseArticleList: ArticleListComponent = setDisplayName(
  function BaseArticleList(props) {
    const { className, children, debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    if (!children) return null;

    const element = (
      <div
        {...rest}
        role="region"
        id={`${componentId}-article-list`}
        className={cn(styles.articleList, className)}
        aria-label={ARTICLE_COMPONENT_LABELS.articleList}
        aria-labelledby={`${componentId}-article-list-heading`}
        {...createComponentProps(componentId, "article-list", isDebugMode)}
      >
        <h2
          id={`${componentId}-article-list-heading`}
          className="sr-only"
          aria-hidden="true"
          {...createComponentProps(
            componentId,
            "article-list-heading",
            isDebugMode
          )}
        >
          {ARTICLE_COMPONENT_LABELS.articleList}
        </h2>
        <div
          role="list"
          id={`${componentId}-article-list-children`}
          className={styles.articleListChildren}
          aria-label={ARTICLE_COMPONENT_LABELS.articles}
          {...createComponentProps(
            componentId,
            "article-list-children",
            isDebugMode
          )}
        >
          {children}
        </div>
      </div>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE LIST COMPONENT
// ============================================================================

/** A memoized article list component. */
const MemoizedArticleList = React.memo(BaseArticleList);

// ============================================================================
// MAIN ARTICLE LIST COMPONENT
// ============================================================================

/** Renders a top-level container for a list of articles. */
const ArticleList: ArticleListComponent = setDisplayName(
  function ArticleList(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedArticleList : BaseArticleList;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);

export default ArticleList;
