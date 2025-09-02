import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  type ComponentProps,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import {
  CardCta,
  CardDescription,
  CardEyebrow,
  CardLink,
  CardTitle,
} from "./_internal";
import styles from "./Card.module.css";

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

interface CardProps extends React.ComponentProps<"article">, ComponentProps {}
type CardComponent = React.FC<CardProps>;

/** A flexible card component for displaying grouped content with optional subcomponents */
const BaseCard: CardComponent = setDisplayName(function BaseCard(props) {
  const { children, className, internalId, debugMode, ...rest } = props;

  const element = (
    <article
      {...rest}
      className={cn(styles.card, className)}
      data-card-id={`${internalId}-card`}
      data-debug-mode={debugMode ? "true" : undefined}
      data-testid={(rest as any)["data-testid"] || "card-root"}
    >
      {children}
    </article>
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

type CardCompoundComponent = CardComponent & {
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
const Card = setDisplayName(function Card(props) {
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

  if (!isRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    children,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedCard : BaseCard;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
} as CardCompoundComponent);

// ============================================================================
// CARD COMPOUND COMPONENTS
// ============================================================================

Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;

export { Card };
