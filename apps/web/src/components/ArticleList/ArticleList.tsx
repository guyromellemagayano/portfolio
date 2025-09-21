import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { ARTICLE_COMPONENT_LABELS } from "../_shared";
import styles from "./ArticleList.module.css";

// ============================================================================
// LIST COMPONENT TYPES & INTERFACES
// ============================================================================

interface ArticleListProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}
type ArticleListComponent = React.FC<ArticleListProps>;

// ============================================================================
// BASE LIST COMPONENT
// ============================================================================

/** Renders a base container for a list of articles. */
const BaseArticleList: ArticleListComponent = setDisplayName(
  function BaseArticleList(props) {
    const { className, children, internalId, debugMode, ...rest } = props;

    if (!children) return null;

    const element = (
      <div
        {...rest}
        id={`${internalId}-article-list`}
        className={cn(styles.articleList, className)}
        role="region"
        aria-label={ARTICLE_COMPONENT_LABELS.articleList}
        aria-labelledby={`${internalId}-article-list-heading`}
        {...createComponentProps(internalId, "article-list", debugMode)}
      >
        <h2
          id={`${internalId}-article-list-heading`}
          className="sr-only"
          aria-hidden="true"
        >
          {ARTICLE_COMPONENT_LABELS.articleList}
        </h2>
        <div
          id={`${internalId}-article-list-children`}
          className={styles.articleListChildren}
          role="list"
          aria-label={ARTICLE_COMPONENT_LABELS.articles}
          {...createComponentProps(
            internalId,
            "article-list-children",
            debugMode
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
    const {
      children,
      isMemoized = false,
      internalId,
      debugMode,
      ...rest
    } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const updatedProps = {
      ...rest,
      internalId: id,
      debugMode: isDebugMode,
    };

    const Component = isMemoized ? MemoizedArticleList : BaseArticleList;
    const element = <Component {...updatedProps}>{children}</Component>;
    return element;
  }
);

export default ArticleList;
