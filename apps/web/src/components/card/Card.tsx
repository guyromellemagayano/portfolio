import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  CardCta,
  CardDescription,
  CardEyebrow,
  CardLink,
  CardTitle,
} from "@web/components";
import {
  type CardComponent,
  type CardCompoundComponent,
} from "@web/components/_shared";
import { cn } from "@web/utils";

import styles from "./Card.module.css";

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

/** A flexible card component for displaying grouped content with optional subcomponents */
const BaseCard: CardComponent = setDisplayName(function BaseCard(props) {
  const {
    as: Component = "div",
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
      id={rest.id || `${componentId}-card`}
      className={cn(styles.card, className)}
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

/** A card component that can optionally be wrapped in a link for navigation */
const Card = setDisplayName(function Card(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedCard : BaseCard;
  const element = <Component {...rest}>{children}</Component>;
  return element;
} as CardCompoundComponent);

Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;

export default Card;
