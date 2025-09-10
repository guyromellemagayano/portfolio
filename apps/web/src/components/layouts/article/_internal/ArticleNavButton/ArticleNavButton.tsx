"use client";

import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { setDisplayName } from "@guyromellemagayano/utils";

import { AppContext } from "@web/app/context";
import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { ARTICLE_LAYOUT_COMPONENT_LABELS } from "../../_data";
import styles from "./ArticleNavButton.module.css";

// ============================================================================
// BASE ARTICLE NAVIGATION BUTTON COMPONENT
// ============================================================================

interface ArticleNavButtonProps
  extends React.ComponentProps<"button">,
    CommonComponentProps {}
type ArticleNavButtonComponent = React.FC<ArticleNavButtonProps>;

/** A navigation button that returns to the previous articles list. */
const BaseArticleNavButton: ArticleNavButtonComponent = setDisplayName(
  function BaseArticleNavButton(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <button
        {...rest}
        className={cn(styles.articleNavButton, className)}
        aria-label={ARTICLE_LAYOUT_COMPONENT_LABELS.goBackToArticles}
        data-article-nav-button-id={`${_internalId}-article-nav-button`}
        data-debug-mode={_debugMode ? "true" : undefined}
        data-testid="article-nav-button"
      >
        <Icon.ArrowLeft
          className={styles.articleNavButtonIcon}
          _debugMode={_debugMode}
          _internalId={_internalId}
          isMemoized
        />
      </button>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ARTICLE NAVIGATION BUTTON COMPONENT
// ============================================================================

/** A memoized article navigation button component. */
const MemoizedArticleNavButton = React.memo(BaseArticleNavButton);

// ============================================================================
// MAIN ARTICLE NAVIGATION BUTTON COMPONENT
// ============================================================================

/** Renders a navigation button to go back to the articles list. */
const ArticleNavButton: ArticleNavButtonComponent = setDisplayName(
  function ArticleNavButton(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    let router = useRouter();
    let { previousPathname } = useContext(AppContext);

    if (!previousPathname) return null;

    const updatedProps = {
      ...rest,
      onClick: () => router.back(),
      _internalId,
      _debugMode,
    };

    const Component = isMemoized
      ? MemoizedArticleNavButton
      : BaseArticleNavButton;
    const element = <Component {...updatedProps} />;
    return element;
  }
);

export { ArticleNavButton };
