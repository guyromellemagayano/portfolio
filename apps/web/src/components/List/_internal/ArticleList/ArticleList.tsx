import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import styles from "./ArticleList.module.css";

// ============================================================================
// LIST COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleListProps
  extends React.ComponentProps<"div">,
    Omit<CommonComponentProps, "as"> {}
export type ArticleListComponent = React.FC<ArticleListProps>;

// ============================================================================
// BASE LIST COMPONENT
// ============================================================================

/** Renders a base container for a list of articles. */
const BaseArticleList: ArticleListComponent = setDisplayName(
  function BaseArticleList(props) {
    const { className, children, internalId, debugMode, ...rest } = props;

    const element = (
      <div
        {...rest}
        className={cn(styles.articleList, className)}
        {...createComponentProps(internalId, "article-list", debugMode)}
      >
        <div className={styles.articleListChildren}>{children}</div>
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
export const ArticleList: ArticleListComponent = setDisplayName(
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

    if (!hasAnyRenderableContent(children)) return null;

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
