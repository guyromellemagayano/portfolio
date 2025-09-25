// ============================================================================
// SHARED CARD COMPONENT TYPES
// ============================================================================

import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";

import {
  CardCta,
  CardDescription,
  CardEyebrow,
  CardLink,
  CardLinkCustom,
  CardTitle,
} from "../../Card/_internal";

// ============================================================================
// CARD COMPONENT TYPES & INTERFACES
// ============================================================================

/** `Card` component props. */
export interface CardProps
  extends React.ComponentPropsWithRef<"div">,
    CommonComponentProps {}

/** `Card` component type. */
export type CardComponent = React.FC<CardProps>;

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

// ============================================================================
// CARD CTA COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CardCta` component props. */
export interface CardCtaProps
  extends React.ComponentPropsWithRef<"div">,
    CommonComponentProps {
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
}

/** `CardCta` component type. */
export type CardCtaComponent = React.FC<CardCtaProps>;

// ============================================================================
// CARD DESCRIPTION COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CardDescription` component props. */
export interface CardDescriptionProps
  extends React.ComponentPropsWithRef<"p">,
    CommonComponentProps {}

/** `CardDescription` component type. */
export type CardDescriptionComponent = React.FC<CardDescriptionProps>;

// ============================================================================
// CARD EYEBROW COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CardEyebrow` component props. */
export interface CardEyebrowProps
  extends React.ComponentPropsWithRef<"p">,
    CommonComponentProps {
  /** ISO date string for the eyebrow content */
  dateTime?: string;
  /** Enable decorative styling */
  decorate?: boolean;
}

/** `CardEyebrow` component type. */
export type CardEyebrowComponent = React.FC<CardEyebrowProps>;

// ============================================================================
// CARD LINK COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CardLink` component props. */
export interface CardLinkProps
  extends React.ComponentPropsWithRef<"div">,
    Omit<
      React.ComponentPropsWithoutRef<typeof CardLinkCustom>,
      keyof React.ComponentPropsWithRef<"div">
    >,
    Omit<CommonComponentProps, "as"> {}

/** `CardLink` component type. */
export type CardLinkComponent = React.FC<CardLinkProps>;

// ============================================================================
// CARD LINK CUSTOM COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CardLinkCustom` component props. */
export interface CardLinkCustomProps
  extends React.ComponentPropsWithRef<typeof Link>,
    Omit<CommonComponentProps, "as"> {}

/** `CardLinkCustom` component type. */
export type CardLinkCustomComponent = React.FC<CardLinkCustomProps>;

// ============================================================================
// CARD TITLE COMPONENT TYPES & INTERFACES
// ============================================================================

/** `CardTitle` component props. */
export interface CardTitleProps
  extends React.ComponentPropsWithRef<"h2">,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title">,
    Omit<CommonComponentProps, "as"> {
  /** Optional href for linking the title */
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
}

/** `CardTitle` component type. */
export type CardTitleComponent = React.FC<CardTitleProps>;
