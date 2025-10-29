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
} from "./_internal";

// ============================================================================
// CARD COMPONENT TYPES & INTERFACES
// ============================================================================

type CardProps<T extends React.ElementType = "article"> = {
  as?: T;
} & Omit<CommonComponentProps, "as"> &
  React.ComponentPropsWithRef<T>;
type CardCompoundComponent = React.FC<CardProps> & {
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

// ============================================================================
// MAIN CARD COMPONENT
// ============================================================================

export const Card = setDisplayName(function Card<
  T extends React.ElementType = "article",
>(props: CardProps<T>) {
  const {
    as: Component = "article" as T,
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
      {...(rest as any)}
      className={cn("group relative flex flex-col items-start", className)}
      {...createComponentProps(componentId, "card", isDebugMode)}
    >
      {children}
    </Component>
  );

  return element;
}) as CardCompoundComponent;

// ============================================================================
// CARD COMPOUND COMPONENTS
// ============================================================================

Card.Cta = CardCta;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.Eyebrow = CardEyebrow;
