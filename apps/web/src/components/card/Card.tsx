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
// MAIN CARD COMPONENT
// ============================================================================

interface CardProps extends React.ComponentProps<"article">, ComponentProps {}

type CardCompoundComponent = React.ComponentType<CardProps> & {
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
  const { children, className, internalId, debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!isRenderableContent(children)) return null;

  const element = (
    <article
      {...rest}
      className={cn(styles.card, className)}
      data-card-id={id}
      data-debug-mode={isDebugMode ? "true" : undefined}
      data-testid="card-root"
    >
      {children}
    </article>
  );

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
