"use client";

import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { AppContext } from "@web/app/context";
import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { ARTICLE_LAYOUT_COMPONENT_LABELS } from "../../_data";
import styles from "./ArticleNavButton.module.css";

// ============================================================================
// ARTICLE NAVIGATION BUTTON COMPONENT TYPES & INTERFACES
// ============================================================================

interface ArticleNavButtonProps
  extends React.ComponentProps<"button">,
    Omit<CommonComponentProps, "as"> {}
type ArticleNavButtonComponent = React.FC<ArticleNavButtonProps>;

// ============================================================================
// BASE ARTICLE NAVIGATION BUTTON COMPONENT
// ============================================================================

/** A navigation button that returns to the previous articles list. */
const BaseArticleNavButton: ArticleNavButtonComponent = setDisplayName(
  function BaseArticleNavButton(props) {
    const { className, _internalId, _debugMode, ...rest } = props;

    const element = (
      <button
        {...rest}
        className={cn(styles.articleNavButton, className)}
        aria-label={ARTICLE_LAYOUT_COMPONENT_LABELS.goBackToArticles}
        {...createComponentProps(_internalId, "article-nav-button", _debugMode)}
      >
        <Icon.ArrowLeft
          className={styles.articleNavButtonIcon}
          _debugMode={_debugMode}
          _internalId={_internalId}
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
export const ArticleNavButton: ArticleNavButtonComponent = setDisplayName(
  function ArticleNavButton(props) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    let router = useRouter();
    let { previousPathname } = useContext(AppContext);

    if (!previousPathname) return null;

    const updatedProps = {
      ...rest,
      onClick: () => router.back(),
      _internalId: id,
      _debugMode: isDebugMode,
    };

    const Component = isMemoized
      ? MemoizedArticleNavButton
      : BaseArticleNavButton;
    const element = <Component {...updatedProps} />;
    return element;
  }
);
