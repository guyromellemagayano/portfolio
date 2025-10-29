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
  MemoizedCardCta,
  MemoizedCardDescription,
  MemoizedCardEyebrow,
  MemoizedCardLink,
  MemoizedCardLinkCustom,
  MemoizedCardTitle,
} from "./_internal";

// ============================================================================
// CARD COMPONENT TYPES & INTERFACES
// ============================================================================

export type CardProps<T extends React.ComponentPropsWithRef<"article">> = Omit<
  T,
  "as"
> &
  CommonComponentProps;
export type CardCompoundComponent = React.FC<
  CardProps<React.ComponentPropsWithRef<"article">>
> & {
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
  /** A memoized card call to action component that can optionally be wrapped in a link for navigation */
  MemoizedCta: typeof MemoizedCardCta;
  /** A memoized card title component that can optionally be wrapped in a link for navigation */
  MemoizedTitle: typeof MemoizedCardTitle;
  /** A memoized card description component that can optionally be wrapped in a link for navigation */
  MemoizedDescription: typeof MemoizedCardDescription;
  /** A memoized card eyebrow component that can optionally be wrapped in a link for navigation */
  MemoizedEyebrow: typeof MemoizedCardEyebrow;
  /** A memoized card link component that provides interactive hover effects and accessibility features */
  MemoizedLink: typeof MemoizedCardLink;
  /** A memoized card link custom component that provides interactive hover effects and accessibility features */
  MemoizedLinkCustom: typeof MemoizedCardLinkCustom;
};

// ============================================================================
// MAIN CARD COMPONENT
// ============================================================================

export const Card = setDisplayName(function Card<
  T extends React.ComponentPropsWithRef<"article">,
>(props: CardProps<T>) {
  const {
    as: Component = "article" as unknown as React.ElementType,
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
}) as CardCompoundComponent;

// ============================================================================
// CARD COMPOUND COMPONENTS
// ============================================================================

Card.Cta = CardCta;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.Eyebrow = CardEyebrow;
Card.MemoizedCta = MemoizedCardCta;
Card.MemoizedTitle = MemoizedCardTitle;
Card.MemoizedDescription = MemoizedCardDescription;
Card.MemoizedEyebrow = MemoizedCardEyebrow;
Card.MemoizedLink = MemoizedCardLink;
Card.MemoizedLinkCustom = MemoizedCardLinkCustom;

// ============================================================================
// MEMOIZED CARD COMPONENT
// ============================================================================

export const MemoizedCard = React.memo(Card);
