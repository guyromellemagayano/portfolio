import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import { ARTICLE_I18N } from "./constants";

// ============================================================================
// ARTICLE LIST COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ArticleListProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {
  /** Whether to enable memoization */
  isMemoized?: boolean;
}
export type ArticleListComponent = React.FC<ArticleListProps>;

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
        className={cn(
          "md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40",
          className
        )}
        aria-label={ARTICLE_I18N.articleList}
        {...createComponentProps(componentId, "article-list", isDebugMode)}
      >
        <h2
          className="sr-only"
          aria-hidden="true"
          {...createComponentProps(
            componentId,
            "article-list-heading",
            isDebugMode
          )}
        >
          {ARTICLE_I18N.articleList}
        </h2>
        <div
          role="list"
          className="flex w-full max-w-3xl flex-col space-y-16"
          aria-label={ARTICLE_I18N.articles}
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
export const ArticleList: ArticleListComponent = setDisplayName(
  function ArticleList(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedArticleList : BaseArticleList;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
