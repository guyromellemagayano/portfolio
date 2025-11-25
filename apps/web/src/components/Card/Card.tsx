import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components";
import { cn } from "@web/utils";

// ============================================================================
// CARD CTA COMPONENT
// ============================================================================

type CardCtaElementType = "div" | "span" | "section" | "article";
type CardCtaProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "target" | "title" | "as"
  > &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "div", "span", "section", or "article" are allowed */
    as?: T;
    /** The href of the link */
    href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
    /** The target of the link */
    target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
    /** The title of the link */
    title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
  };

const CardCta = setDisplayName(function CardCta(
  props: CardCtaProps<CardCtaElementType>
) {
  const {
    as: Component = "div",
    children,
    className,
    href,
    target,
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Card CTA component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn(
        "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500",
        className
      )}
      {...createComponentProps(componentId, "card-cta", isDebugMode)}
    >
      {isValidLink(linkHref) ? (
        <CardLinkCustom
          href={linkHref}
          target={linkTargetProps.target}
          rel={linkTargetProps.rel}
          title={title}
          debugId={componentId}
          debugMode={isDebugMode}
        >
          {children}
          <Icon name="chevron-right" />
        </CardLinkCustom>
      ) : (
        children
      )}
    </Component>
  );
});

// ============================================================================
// MEMOIZED CARD CTA COMPONENT
// ============================================================================

const MemoizedCardCta = React.memo(CardCta);

// ============================================================================
// CARD DESCRIPTION COMPONENT
// ===========================================================================

type CardDescriptionElementType = "p" | "div" | "span";
type CardDescriptionProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "p", "div", or "span" are allowed */
    as?: T;
  };

const CardDescription = setDisplayName(function CardDescription(
  props: CardDescriptionProps<CardDescriptionElementType>
) {
  const {
    as: Component = "p",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Card description component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as any)}
      className={cn(
        "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...createComponentProps(componentId, "card-description", isDebugMode)}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// MEMOIZED CARD DESCRIPTION COMPONENT
// ============================================================================

const MemoizedCardDescription = React.memo(CardDescription);

// ============================================================================
// CARD EYEBROW COMPONENT
// ============================================================================

type CardEyebrowElementType = "p" | "time";
type CardEyebrowProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "p" or "time" are allowed */
    as?: T;
    /** Enable decorative styling */
    decorate?: boolean;
    /** The date time of the eyebrow */
    dateTime?: string;
  };

const CardEyebrow = setDisplayName(function CardEyebrow(
  props: CardEyebrowProps<CardEyebrowElementType>
) {
  const {
    as: Component = "p",
    children,
    className,
    debugId,
    debugMode,
    dateTime,
    decorate = false,
    ...rest
  } = props;

  // Card eyebrow component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as any)}
      className={cn(
        "relative z-10 order-first mb-3 flex items-center text-sm text-wrap text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5",
        className
      )}
      dateTime={dateTime}
      {...createComponentProps(componentId, "card-eyebrow", isDebugMode)}
    >
      {decorate ? (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
          {...createComponentProps(
            componentId,
            "card-eyebrow-decorate",
            isDebugMode
          )}
        >
          <span
            className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"
            {...createComponentProps(
              componentId,
              "card-eyebrow-decorate-span",
              isDebugMode
            )}
          />
        </span>
      ) : null}
      {children}
    </Component>
  );
});

// ============================================================================
// MEMOIZED CARD EYEBROW COMPONENT
// ============================================================================

const MemoizedCardEyebrow = React.memo(CardEyebrow);

// ============================================================================
// CARD LINK COMPONENT
// ============================================================================

type CardLinkElementType = "div" | "span" | "section" | "article";
type CardLinkProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<
    React.ComponentPropsWithoutRef<typeof CardLinkCustom>,
    keyof React.ComponentPropsWithoutRef<T>
  > &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "div", "span", "section", or "article" are allowed */
    as?: T;
  };

const CardLink = setDisplayName(function CardLink(
  props: CardLinkProps<CardLinkElementType>
) {
  const {
    as: Component = "div",
    children,
    className,
    href,
    target,
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Card link component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as any)}
      {...createComponentProps(componentId, "card-link", isDebugMode)}
    >
      <div
        className={cn(
          "absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50",
          className
        )}
        {...createComponentProps(
          componentId,
          "card-link-background",
          isDebugMode
        )}
      />

      {href && isValidLink(href) ? (
        <CardLinkCustom
          href={href}
          target={target}
          title={title}
          debugId={componentId}
          debugMode={isDebugMode}
        >
          <span
            className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"
            {...createComponentProps(
              componentId,
              "card-link-custom-span",
              isDebugMode
            )}
          />
          <span
            className="relative z-10"
            {...createComponentProps(
              componentId,
              "card-link-custom-span-content",
              isDebugMode
            )}
          >
            {children}
          </span>
        </CardLinkCustom>
      ) : (
        children
      )}
    </Component>
  );
});

// ============================================================================
// MEMOIZED CARD LINK COMPONENT
// ============================================================================

const MemoizedCardLink = React.memo(CardLink);

// ============================================================================
// CARD LINK CUSTOM COMPONENT
// ============================================================================

type CardLinkCustomElementType = typeof Link;
type CardLinkCustomProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "a" is allowed */
    as?: T;
  };

const CardLinkCustom = setDisplayName(function CardLinkCustom(
  props: CardLinkCustomProps<CardLinkCustomElementType>
) {
  const {
    as: Component = Link,
    children,
    href,
    target,
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Card link custom component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={title}
      aria-label={title}
      {...createComponentProps(componentId, "card-link-custom", isDebugMode)}
    >
      {children}
    </Component>
  );
});

// ============================================================================
// MEMOIZED CARD LINK CUSTOM COMPONENT
// ============================================================================

const MemoizedCardLinkCustom = React.memo(CardLinkCustom);

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

type CardTitleElementType = "h2" | "h3";
type CardTitleProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CardCtaProps<CardCtaElementType>, "as"> & {
    /** The component to render as - only "h2" or "h3" are allowed */
    as?: T;
  };

const CardTitle = setDisplayName(function CardTitle(
  props: CardTitleProps<CardTitleElementType>
) {
  const {
    as: Component = "h2",
    children,
    className,
    href,
    target,
    title,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Card title component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : "";
  const linkTargetProps = getLinkTargetProps(linkHref, target);

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className
      )}
      {...createComponentProps(componentId, "card-title", isDebugMode)}
    >
      {isValidLink(linkHref) ? (
        <CardLinkCustom
          href={linkHref}
          target={linkTargetProps.target}
          rel={linkTargetProps.rel}
          title={title}
          debugId={componentId}
          debugMode={isDebugMode}
        >
          {children}
        </CardLinkCustom>
      ) : (
        <>{children}</>
      )}
    </Component>
  );
});

// ============================================================================
// MEMOIZED CARD TITLE COMPONENT
// ============================================================================

const MemoizedCardTitle = React.memo(CardTitle);

// ============================================================================
// CARD COMPONENT
// ============================================================================

type CardElementType = "article" | "div" | "li";
type CardProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "article", "div", or "li" are allowed */
    as?: T;
  };

export type CardCompoundComponent = ((
  props: CardProps<CardElementType>
) => React.ReactElement | null) & {
  /** A card link component that provides interactive hover effects and accessibility features */
  Link: typeof CardLink;
  /** A card link custom component that provides interactive hover effects and accessibility features */
  LinkCustom: typeof CardLinkCustom;
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

export const Card = setDisplayName(function Card<T extends React.ElementType>(
  props: CardProps<T>
) {
  const {
    as: Component = "article",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Card component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<CardElementType>)}
      className={cn("group relative flex flex-col items-start", className)}
      {...createComponentProps(componentId, "card", isDebugMode)}
    >
      {children}
    </Component>
  );
}) as CardCompoundComponent;

// ============================================================================
// CARD COMPOUND COMPONENTS
// ============================================================================

Card.Cta = CardCta;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.LinkCustom = CardLinkCustom;
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
