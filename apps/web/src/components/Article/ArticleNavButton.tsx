"use client";

import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { AppContext } from "@web/app/context";
import { Icon } from "@web/components";
import { cn } from "@web/utils";

import { ARTICLE_I18N } from "./constants";

// ============================================================================
// ARTICLE NAVIGATION BUTTON COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleNavButton` component props. */
export interface ArticleNavButtonProps
  extends React.ComponentProps<"button">,
    CommonComponentProps {}

/** `ArticleNavButton` component type. */
export type ArticleNavButtonComponent = React.FC<ArticleNavButtonProps>;

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
        className={cn(
          "group articleNavButtondark:hover:ring-white/20 mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700",
          className
        )}
        aria-label={ARTICLE_I18N.goBackToArticles}
        aria-describedby={`${debugId}-article-nav-button-description`}
        onClick={() => router.back()}
        {...createComponentProps(debugId, "article-nav-button", debugMode)}
      >
        <Icon.ArrowLeft
          className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400"
          aria-hidden="true"
          debugMode={debugMode}
          debugId={debugId}
        />
        <span
          className="sr-only"
          aria-hidden="true"
          {...createComponentProps(debugId, "article-nav-button-description", debugMode)}
        >
          {ARTICLE_I18N.goBackToArticles}
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
export const ArticleNavButton: ArticleNavButtonComponent = setDisplayName(
  function ArticleNavButton(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedArticleNavButton
      : BaseArticleNavButton;
    const element = <Component {...rest} />;
    return element;
  }
);
