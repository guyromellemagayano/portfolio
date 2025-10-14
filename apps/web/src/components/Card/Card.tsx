import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import {
  CardCta,
  CardDescription,
  CardEyebrow,
  CardLink,
  CardTitle,
} from "./internal";

// ============================================================================
// COMPONENT CLASSIFICATION: Compound Component
// - Type: Compound (main component with orchestrated sub-components)
// - Testing: Unit + Integration tests (both required)
// - Structure: _internal/ folder with sub-components
// - Risk Tier: Tier 1 (90%+ coverage, comprehensive edge cases)
// - Data Source: Static data (no external data fetching)
// ============================================================================

// ============================================================================
// CARD COMPONENT TYPES & INTERFACES
// ============================================================================

/** `Card` component props. */
export interface CardProps
  extends React.ComponentPropsWithRef<"article">,
    CommonComponentProps {}

/** `Card` component type. */
export type CardComponent = React.FC<CardProps>;

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

/** A flexible card component for displaying grouped content with optional subcomponents */
const BaseCard: CardComponent = setDisplayName(function BaseCard(props) {
  const {
    as: Component = "article",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  const element = (
    <Component
      {...rest}
      className={cn("group relative flex flex-col items-start", className)}
      {...createComponentProps(componentId, "card", isDebugMode)}
    >
      {children}
    </Component>
  );

  return element;
});

// ============================================================================
// MEMOIZED CARD COMPONENT
// ============================================================================

/** A memoized card component. */
const MemoizedCard = React.memo(BaseCard);

// ============================================================================
// MAIN CARD COMPONENT
// ============================================================================

/** `Card` compound component type. */
export type CardCompoundComponent = CardComponent & {
  /** A card link component that provides interactive hover effects and accessibility features */
  Link: typeof CardLink;
  /** A card title component that can optionally be wrapped in a link for navigation */
  Title: typeof CardTitle;
  /** A card description component that can optionally be wrapped in a link for navigation */
  Description: typeof CardDescription;
  /** A card call to action component that can optionally be wrapped in a link for navigation */
  Cta: typeof CardCta;
  /** A card eyebrow component that can optionally be wrapped in a link for navigation */
  Eyebrow: typeof CardEyebrow;
};

/** A card component that can optionally be wrapped in a link for navigation */
export const Card = setDisplayName(function Card(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedCard : BaseCard;
  const element = <Component {...rest}>{children}</Component>;
  return element;
} as CardCompoundComponent);

Card.Cta = CardCta;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.Eyebrow = CardEyebrow;
