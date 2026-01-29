/**
 * @file Card.tsx
 * @author Guy Romelle Magayano
 * @description Card component for the web application.
 */

import React from "react";

import Link, { LinkProps } from "next/link";

import { getLinkTargetProps, isValidLink } from "@guyromellemagayano/utils";

import { cn } from "@web/utils/helpers";

import { Icon } from "../icon";

// ============================================================================
// CARD LINK CUSTOM COMPONENT
// ============================================================================

export type CardLinkCustomElementType = typeof Link;
export type CardLinkCustomProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<CardLinkCustomElementType>,
  "as" | "href"
> &
  P & {
    as?: CardLinkCustomElementType;
    href?: LinkProps["href"];
    title?: string;
    target?: string;
  };

function CardLinkCustom<P extends Record<string, unknown> = {}>(
  props: CardLinkCustomProps<P>
) {
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
      {...rest}
      href={linkHref ?? undefined}
      target={linkTargetProps?.target ?? undefined}
      rel={linkTargetProps?.rel ?? undefined}
      title={title || undefined}
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

export type CardCtaElementType = "div" | "section" | "article" | "main";
export type CardCtaProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<CardCtaElementType>,
  "as"
> &
  Pick<CardLinkCustomProps<P>, "href" | "target" | "title"> &
  P & {
    as?: CardCtaElementType;
  };

function CardCta<P extends Record<string, unknown> = {}>(
  props: CardCtaProps<P>
) {
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
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn(
        "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500",
        className
      )}
    >
      {linkHref ? (
        <CardLinkCustom
          href={linkHref}
          target={linkTargetProps?.target ?? undefined}
          rel={linkTargetProps?.rel ?? undefined}
          title={title || undefined}
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

export type CardDescriptionElementType = "p" | "div" | "span";
export type CardDescriptionProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<CardDescriptionElementType>,
  "as"
> &
  P & {
    as?: CardDescriptionElementType;
  };

function CardDescription<P extends Record<string, unknown> = {}>(
  props: CardDescriptionProps<P>
) {
  const { as: Component = "p", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
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

export type CardEyebrowElementType = "p" | "time";
export type CardEyebrowProps<P extends Record<string, unknown> = {}> =
  | (Omit<React.ComponentPropsWithRef<"p">, "as" | "dateTime"> &
      P & {
        as?: "p";
        decorate?: boolean;
        dateTime?: never;
      })
  | (Omit<React.ComponentPropsWithRef<"time">, "as" | "dateTime"> &
      P & {
        as: "time";
        decorate?: boolean;
        dateTime?: string;
      });

function CardEyebrow<P extends Record<string, unknown> = {}>(
  props: CardEyebrowProps<P>
) {
  const {
    as: Component = "p",
    decorate = false,
    children,
    className,
    dateTime,
    ...rest
  } = props as CardEyebrowProps<P> & {
    as?: CardEyebrowElementType;
    decorate?: boolean;
    dateTime?: string;
    children?: React.ReactNode;
    className?: string;
  };

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
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
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

export type CardLinkElementType = "div" | "section" | "article" | "span";
export type CardLinkProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<CardLinkElementType>,
  "as"
> &
  Pick<CardLinkCustomProps<P>, "href" | "target" | "title"> &
  P & {
    as?: CardLinkElementType;
  };

function CardLink<P extends Record<string, unknown> = {}>(
  props: CardLinkProps<P>
) {
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
    <Component {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}>
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

export type CardTitleElementType = "h2" | "h3";
export type CardTitleProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<CardTitleElementType>,
  "as"
> &
  Pick<CardLinkCustomProps<P>, "href" | "target" | "title"> &
  P & {
    as?: CardTitleElementType;
  };

function CardTitle<P extends Record<string, unknown> = {}>(
  props: CardTitleProps<P>
) {
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
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
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

export type CardElementType = "div" | "article" | "section";
export type CardProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<CardElementType>,
  "as"
> &
  P & {
    as?: CardElementType;
  };

export function Card<P extends Record<string, unknown> = {}>(
  props: CardProps<P>
) {
  const { as: Component = "div", children, className, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn("group relative flex flex-col items-start", className)}
    >
      {children}
    </Component>
  );
}

Card.displayName = "Card";

// ============================================================================
// CARD COMPOUND COMPONENTS
// ============================================================================

Card.Cta = CardCta;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.LinkCustom = CardLinkCustom;
Card.Eyebrow = CardEyebrow;
