import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { cn } from "@web/utils";

import {
  CardCta,
  CardDescription,
  CardEyebrow,
  CardLink,
  CardTitle,
} from "./_internal";
import styles from "./styles/Card.module.css";

// ============================================================================
// CARD COMPONENT TYPES & INTERFACES
// ============================================================================

interface CardProps
  extends React.ComponentProps<"article">,
    CommonComponentProps {}
type CardComponent = React.FC<CardProps>;

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

/** A flexible card component for displaying grouped content with optional subcomponents */
const BaseCard: CardComponent = setDisplayName(function BaseCard(props) {
  const { children, className, internalId, debugMode, ...rest } = props;

  const element = (
    <article
      {...rest}
      className={cn(styles.card, className)}
      {...createComponentProps(internalId, "card", debugMode)}
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

/** A card component that can optionally be wrapped in a link for navigation */
export const Card = setDisplayName(function Card(props) {
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

Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;
