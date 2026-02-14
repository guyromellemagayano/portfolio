/**
 * @file Card.tsx
 * @author Guy Romelle Magayano
 * @description Card component for the web application.
 */

import {
  Children,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactNode,
} from "react";

import { getLinkTargetProps, isValidLink } from "@portfolio/utils";
import Link, { LinkProps } from "next/link";

import { COMMON_FOCUS_CLASSNAMES } from "@web/data/common";
import { cn } from "@web/utils/helpers";

import { Icon } from "../icon";

// ============================================================================
// CARD LINK CUSTOM COMPONENT
// ============================================================================

export type CardLinkCustomElementType = typeof Link;
export type CardLinkCustomProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<CardLinkCustomElementType>,
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
    className,
    children,
    href,
    target,
    title,
    ...rest
  } = props;

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  const hasDescriptiveText =
    typeof children === "string"
      ? children.trim().length > 0
      : Children.count(children) > 0;
  const ariaLabel = title && !hasDescriptiveText ? title : undefined;

  return (
    <Component
      {...rest}
      href={linkHref}
      target={linkTargetProps?.target}
      rel={linkTargetProps?.rel}
      title={title}
      aria-label={ariaLabel}
      className={cn(className, COMMON_FOCUS_CLASSNAMES)}
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
  ComponentPropsWithRef<CardCtaElementType>,
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

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<CardCtaElementType>)}
      className={cn(
        "relative z-10 mt-2 flex items-start text-sm font-medium text-teal-500",
        className
      )}
    >
      {linkHref ? (
        <CardLinkCustom
          href={linkHref}
          target={linkTargetProps?.target}
          rel={linkTargetProps?.rel}
          title={title}
          className="relative z-10 mt-4 flex items-center text-sm font-medium"
        >
          {children}
          <Icon name="chevron-right" className="ml-1 h-4 w-4 stroke-current" />
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
  ComponentPropsWithRef<CardDescriptionElementType>,
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
      {...(rest as ComponentPropsWithoutRef<CardDescriptionElementType>)}
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
  | (Omit<ComponentPropsWithRef<"p">, "as" | "dateTime"> &
      P & {
        as?: "p";
        decorate?: boolean;
        dateTime?: never;
      })
  | (Omit<ComponentPropsWithRef<"time">, "as" | "dateTime"> &
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
    children?: ReactNode;
    className?: string;
  };

  if (!children) return null;

  const Element = Component as ElementType;

  const timeProps =
    Component === "time" && dateTime
      ? { dateTime }
      : Component === "time" && !dateTime
        ? {}
        : {};

  return (
    <Element
      {...(rest as ComponentPropsWithoutRef<CardEyebrowElementType>)}
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

export type CardLinkElementType = typeof CardLinkCustom;
export type CardLinkProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<CardLinkElementType>,
  "as"
> &
  Pick<CardLinkCustomProps<P>, "href" | "target" | "title"> &
  P & {
    as?: CardLinkElementType;
    children?: ReactNode;
  };

function CardLink<P extends Record<string, unknown> = {}>(
  props: CardLinkProps<P>
) {
  const {
    as: Component = CardLinkCustom,
    children,
    href,
    target,
    title,
    ...rest
  } = props;

  if (!children) return null;

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:bg-zinc-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50 dark:group-hover:bg-zinc-700/50" />
      <Component
        {...(rest as ComponentPropsWithoutRef<CardLinkElementType>)}
        href={linkHref}
        target={linkTargetProps?.target}
        rel={linkTargetProps?.rel}
        title={title}
      >
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Component>
    </>
  );
}

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

export type CardTitleElementType = "h2" | "h3";
export type CardTitleProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<CardTitleElementType>,
  "as"
> &
  P & {
    as?: CardTitleElementType;
    href?: LinkProps["href"];
    target?: string;
    title?: string;
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

  const linkHref = href && isValidLink(href) ? href : "#";
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<CardTitleElementType>)}
      className={cn(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className
      )}
    >
      {linkHref ? (
        <CardLink
          href={linkHref}
          target={linkTargetProps?.target}
          rel={linkTargetProps?.rel}
          title={title}
        >
          {children}
        </CardLink>
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
  ComponentPropsWithRef<CardElementType>,
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
      {...(rest as ComponentPropsWithoutRef<CardElementType>)}
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
