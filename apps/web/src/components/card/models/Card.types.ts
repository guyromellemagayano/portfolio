import React from "react";

import Link from "next/link";

import type {
  ArticleProps,
  ArticleRef,
  DivProps,
  DivRef,
  HeadingProps,
  HeadingRef,
  PProps,
  PRef,
  SvgProps,
  TimeProps,
  TimeRef,
} from "@guyromellemagayano/components";

/** A reference to a card component. */
export type CardRef = ArticleRef;

/** A card component props. */
export interface CardProps extends ArticleProps {}

/** A card component. */
export type CardComponent = React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<CardRef>
> & {
  /** A card link component that provides interactive hover effects and accessibility features. */
  Link: CardLinkComponent;

  /** A card title component that can optionally be wrapped in a link for navigation. */
  Title: CardTitleComponent;

  /** A card description component that can optionally be wrapped in a link for navigation. */
  Description: CardDescriptionComponent;

  /** A card call to action component that can optionally be wrapped in a link for navigation. */
  Cta: CardCtaComponent;

  /** A card eyebrow component that can optionally be wrapped in a link for navigation. */
  Eyebrow: CardEyebrowComponent;
};

/** A reference to a card link component. */
export type CardLinkRef = React.ComponentRef<typeof Link>;

/** A card link component props. */
export interface CardLinkProps
  extends HeadingProps,
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "target" | "title"
    > {}

/** A card link component. */
export type CardLinkComponent = React.ForwardRefExoticComponent<
  CardLinkProps & React.RefAttributes<CardLinkRef>
>;

/** A reference to a card title component. */
export type CardTitleRef = HeadingRef;

/** A card title component props. */
export interface CardTitleProps
  extends HeadingProps,
    Pick<CardLinkProps, "href" | "target" | "title"> {}

/** A card title component. */
export type CardTitleComponent = React.ForwardRefExoticComponent<
  CardTitleProps & React.RefAttributes<CardTitleRef>
>;

/** A reference to a card description component. */
export type CardDescriptionRef = PRef;

/** A card description component props. */
export interface CardDescriptionProps extends PProps {}

/** A card description component. */
export type CardDescriptionComponent = React.ForwardRefExoticComponent<
  CardDescriptionProps & React.RefAttributes<CardDescriptionRef>
>;

/** A props interface for the `ChevronRightIcon` component. */
export interface ChevronRightIconProps extends SvgProps {}

/** A reference to a card call to action component. */
export type CardCtaRef = DivRef;

/** A card call to action component props. */
export interface CardCtaProps
  extends DivProps,
    Pick<CardLinkProps, "target" | "title"> {
  href?: string;
}

/** A card call to action component. */
export type CardCtaComponent = React.ForwardRefExoticComponent<
  CardCtaProps & React.RefAttributes<CardCtaRef>
>;

/** A reference to a card eyebrow component. */
export type CardEyebrowRef = TimeRef;

/** A card eyebrow component props. */
export interface CardEyebrowProps extends TimeProps {
  /**
   * Whether to decorate the eyebrow with a line.
   */
  decorate?: boolean;
}

/** A card eyebrow component. */
export type CardEyebrowComponent = React.ForwardRefExoticComponent<
  CardEyebrowProps & React.RefAttributes<CardEyebrowRef>
>;
