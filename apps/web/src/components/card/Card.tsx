/**
 * @file Card.tsx
 * @author Guy Romelle Magayano
 * @description Card component for the web application.
 */

import React from "react";

import Link from "next/link";

import { getLinkTargetProps, isValidLink } from "@guyromellemagayano/utils";

import { cn } from "@web/utils/helpers";

import { Icon } from "../icon";

// ============================================================================
// CARD LINK CUSTOM COMPONENT
// ============================================================================

type CardLinkCustomElementType = typeof Link;
type CardLinkCustomProps<
  T extends CardLinkCustomElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "href" | "target" | "title" | "as"> &
  P & {
    as?: T;
    href?: React.ComponentPropsWithoutRef<T>["href"];
    target?: React.ComponentPropsWithoutRef<T>["target"];
    title?: React.ComponentPropsWithoutRef<T>["title"];
  };

function CardLinkCustom<
  T extends CardLinkCustomElementType,
  P extends Record<string, unknown> = {},
>(props: CardLinkCustomProps<T, P>) {
  const {
    as: Component = Link,
    children,
    href,
    target,
    title,
    ...rest
  } = props;

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  const hasDescriptiveText =
    typeof children === "string"
      ? children.trim().length > 0
      : React.Children.count(children) > 0;
  const ariaLabel = title && !hasDescriptiveText ? title : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      href={linkHref ?? undefined}
      target={linkTargetProps?.target ?? undefined}
      rel={linkTargetProps?.rel ?? undefined}
      title={title ?? undefined}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  );
}

CardLinkCustom.displayName = "CardLinkCustom";

// ============================================================================
// CARD CTA COMPONENT
// ============================================================================

type CardCtaElementType = "div" | "section" | "article" | "main";
type CardCtaProps<
  T extends CardCtaElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  Pick<
    CardLinkCustomProps<CardLinkCustomElementType, P>,
    "href" | "target" | "title"
  > &
  P & {
    as?: T;
  };

function CardCta<
  T extends CardCtaElementType,
  P extends Record<string, unknown> = {},
>(props: CardCtaProps<T, P>) {
  const {
    as: Component = "div",
    children,
    className,
    href,
    target,
    title,
    ...rest
  } = props;

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      className={cn(
        "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500",
        className
      )}
    >
      {linkHref ? (
        <CardLinkCustom
          href={linkHref ?? undefined}
          target={linkTargetProps?.target ?? undefined}
          rel={linkTargetProps?.rel ?? undefined}
          title={title ?? undefined}
        >
          {children}
          <Icon name="chevron-right" aria-hidden="true" />
        </CardLinkCustom>
      ) : (
        children
      )}
    </Component>
  );
}

CardCta.displayName = "CardCta";

// ============================================================================
// CARD DESCRIPTION COMPONENT
// ============================================================================

type CardDescriptionElementType = "p" | "div" | "span";
type CardDescriptionProps<
  T extends CardDescriptionElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
  };

function CardDescription<
  T extends CardDescriptionElementType,
  P extends Record<string, unknown> = {},
>(props: CardDescriptionProps<T, P>) {
  const { as: Component = "p", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      className={cn(
        "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </Component>
  );
}

CardDescription.displayName = "CardDescription";

// ============================================================================
// CARD EYEBROW COMPONENT
// ============================================================================

type CardEyebrowElementType = "p" | "time";
type CardEyebrowProps<
  T extends CardEyebrowElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as" | "dateTime"> &
  P & {
    as?: T;
    decorate?: boolean;
    dateTime?: T extends "time" ? string : never;
  };

function CardEyebrow<
  T extends CardEyebrowElementType,
  P extends Record<string, unknown> = {},
>(props: CardEyebrowProps<T, P>) {
  const {
    as: Component = "p",
    decorate = false,
    children,
    className,
    dateTime,
    ...rest
  } = props;

  if (!children) return null;

  const Element = Component as React.ElementType;

  const timeProps =
    Component === "time" && dateTime
      ? { dateTime }
      : Component === "time" && !dateTime
        ? {}
        : {};

  return (
    <Element
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      {...timeProps}
      className={cn(
        "relative z-10 order-first mb-3 flex items-center text-sm text-wrap text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5",
        className
      )}
    >
      {decorate ? (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      ) : null}

      {children}
    </Element>
  );
}

CardEyebrow.displayName = "CardEyebrow";

// ============================================================================
// CARD LINK COMPONENT
// ============================================================================

type CardLinkElementType = "div" | "section" | "article" | "span";
type CardLinkProps<
  T extends CardLinkElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  Pick<
    CardLinkCustomProps<CardLinkCustomElementType, P>,
    "href" | "target" | "title"
  > &
  P & {
    as?: T;
  };

function CardLink<
  T extends CardLinkElementType,
  P extends Record<string, unknown> = {},
>(props: CardLinkProps<T, P>) {
  const {
    as: Component = "div",
    children,
    className,
    href,
    target,
    title,
    ...rest
  } = props;

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component {...(rest as React.ComponentPropsWithoutRef<T>)}>
      <div
        className={cn(
          "absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50",
          className
        )}
      />

      {linkHref ? (
        <CardLinkCustom
          href={linkHref ?? undefined}
          target={linkTargetProps?.target ?? undefined}
          rel={linkTargetProps?.rel ?? undefined}
          title={title ?? undefined}
        >
          <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{children}</span>
        </CardLinkCustom>
      ) : (
        children
      )}
    </Component>
  );
}

CardLink.displayName = "CardLink";

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

type CardTitleElementType = "h2" | "h3";
type CardTitleProps<
  T extends CardTitleElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  Pick<
    CardLinkCustomProps<CardLinkCustomElementType, P>,
    "href" | "target" | "title"
  > &
  P & {
    as?: T;
  };

function CardTitle<
  T extends CardTitleElementType,
  P extends Record<string, unknown> = {},
>(props: CardTitleProps<T, P>) {
  const {
    as: Component = "h2",
    children,
    className,
    href,
    target,
    title,
    ...rest
  } = props;

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      className={cn(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className
      )}
    >
      {linkHref ? (
        <CardLinkCustom
          href={linkHref ?? undefined}
          target={linkTargetProps?.target ?? undefined}
          rel={linkTargetProps?.rel ?? undefined}
          title={title ?? undefined}
        >
          {children}
        </CardLinkCustom>
      ) : (
        children
      )}
    </Component>
  );
}

CardTitle.displayName = "CardTitle";

// ============================================================================
// CARD COMPONENT
// ============================================================================

type CardElementType = "div" | "article" | "section";

export type CardProps<
  T extends CardElementType,
  P extends Record<string, unknown> = {},
> = Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
  };

export function Card<
  T extends CardElementType,
  P extends Record<string, unknown> = {},
>(props: CardProps<T, P>) {
  const { as: Component = "div", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      className={cn("group relative flex flex-col items-start", className)}
    >
      {children}
    </Component>
  );
}

Card.displayName = "Card";

// ============================================================================
// MEMOIZED CARD COMPONENT
// ============================================================================

export const MemoizedCard = React.memo(Card);

// ============================================================================
// CARD COMPOUND COMPONENTS
// ============================================================================

Card.Cta = CardCta;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.LinkCustom = CardLinkCustom;
Card.Eyebrow = CardEyebrow;
