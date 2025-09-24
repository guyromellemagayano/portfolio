"use client";

import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { AppContext } from "@web/app/context";
import { Icon } from "@web/components";
import { cn } from "@web/utils";

import {
  ARTICLE_COMPONENT_LABELS,
  type ArticleNavButtonComponent,
} from "../_shared";
import styles from "./ArticleNavButton.module.css";

// ============================================================================
// BASE ARTICLE NAVIGATION BUTTON COMPONENT
// ============================================================================

/** A navigation button that returns to the previous articles list. */
const BaseArticleNavButton: ArticleNavButtonComponent = setDisplayName(
  function BaseArticleNavButton(props) {
    const { className, debugId, debugMode, ...rest } = props;

    let router = useRouter();
    let { previousPathname } = useContext(AppContext);

    if (!previousPathname) return null;

    const element = (
      <button
        {...rest}
        role="button"
        className={cn(styles.articleNavButton, className)}
        aria-label={ARTICLE_COMPONENT_LABELS.goBackToArticles}
        aria-describedby={`${debugId}-nav-button-description`}
        onClick={() => router.back()}
        {...createComponentProps(debugId, "article-nav-button", debugMode)}
      >
        <Icon.ArrowLeft
          className={styles.articleNavButtonIcon}
          aria-hidden="true"
          debugMode={debugMode}
          debugId={debugId}
        />
        <span
          id={`${debugId}-nav-button-description`}
          className="sr-only"
          aria-hidden="true"
        >
          {ARTICLE_COMPONENT_LABELS.goBackToArticles}
        </span>
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
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedArticleNavButton
      : BaseArticleNavButton;
    const element = <Component {...rest} />;
    return element;
  }
);

export default ArticleNavButton;
