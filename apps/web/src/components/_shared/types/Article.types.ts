// ============================================================================
// SHARED ARTICLE COMPONENT TYPES
// ============================================================================

import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

import { Card, Container } from "@web/components";
import { type ArticleWithSlug } from "@web/utils";

// ============================================================================
// ARTICLE BASE COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleBase` component props. */
export interface ArticleBaseProps
  extends React.ComponentPropsWithRef<typeof Card>,
    CommonComponentProps {
  /** The article to display. */
  article: ArticleWithSlug;
}

/** `ArticleBase` component type. */
export type ArticleBaseComponent = React.FC<ArticleBaseProps>;

// ============================================================================
// ARTICLE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleLayout` component props. */
export interface ArticleLayoutProps
  extends React.ComponentProps<typeof Container>,
    CommonComponentProps {
  /** The article to display. */
  article?: ArticleWithSlug;
}

/** `ArticleLayout` component type. */
export type ArticleLayoutComponent = React.FC<ArticleLayoutProps>;

// ============================================================================
// ARTICLE LIST COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleList` component props. */
export interface ArticleListProps
  extends React.ComponentProps<"div">,
    CommonComponentProps {}

/** `ArticleList` component type. */
export type ArticleListComponent = React.FC<ArticleListProps>;

// ============================================================================
// ARTICLE LIST ITEM COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleListItem` component props. */
export interface ArticleListItemProps
  extends React.ComponentProps<"article">,
    CommonComponentProps {
  /** The article to display. */
  article: ArticleWithSlug;
  /** Whether the article is on the front page. */
  isFrontPage?: boolean;
}

/** `ArticleListItem` component type. */
export type ArticleListItemComponent = React.FC<ArticleListItemProps>;

// ============================================================================
// ARTICLE NAVIGATION BUTTON COMPONENT TYPES & INTERFACES
// ============================================================================

/** `ArticleNavButton` component props. */
export interface ArticleNavButtonProps
  extends React.ComponentProps<"button">,
    CommonComponentProps {}

/** `ArticleNavButton` component type. */
export type ArticleNavButtonComponent = React.FC<ArticleNavButtonProps>;
