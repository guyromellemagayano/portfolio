/**
 * @file Card.tsx
 * @author Guy Romelle Magayano
 * @description Card component for the web application.
 */

import React from "react";

import Link from "next/link";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  getLinkTargetProps,
  isValidLink,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components/icon/Icon";
import { CommonAppComponentProps } from "@web/types/common";
import { cn } from "@web/utils/helpers";

// ============================================================================
// CARD LINK CUSTOM COMPONENT
// ============================================================================

type CardLinkCustomProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps &
    Omit<
      React.ComponentPropsWithRef<typeof Link>,
      "href" | "target" | "title"
    > &
    T & {
      href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
      target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
      title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
    };

function CardLinkCustom<T extends Record<string, unknown> = {}>(
  props: CardLinkCustomProps<T>
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

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<typeof Component>)}
      href={linkHref ?? undefined}
      target={linkTargetProps?.target ?? undefined}
      rel={linkTargetProps?.rel ?? undefined}
      title={title ?? undefined}
      aria-label={title ?? undefined}
      {...createComponentProps(componentId, "card-link-custom", isDebugMode)}
    >
      {children}
    </Component>
  );
}

CardLinkCustom.displayName = "CardLinkCustom";

// ============================================================================
// CARD CTA COMPONENT
// ============================================================================

type CardCtaProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps &
    React.ComponentPropsWithRef<"div"> &
    T &
    Pick<CardLinkCustomProps, "href" | "target" | "title"> & {};

function CardCta<T extends Record<string, unknown> = {}>(
  props: CardCtaProps<T>
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

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<typeof Component>)}
      className={cn(
        "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500",
        className
      )}
      {...createComponentProps(componentId, "card-cta", isDebugMode)}
    >
      {linkHref ? (
        <CardLinkCustom
          href={linkHref}
          target={linkTargetProps?.target ?? undefined}
          rel={linkTargetProps?.rel ?? undefined}
          title={title ?? undefined}
          debugId={componentId}
          debugMode={isDebugMode}
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

type CardDescriptionProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps & React.ComponentPropsWithRef<"p"> & T & {};

function CardDescription<T extends Record<string, unknown> = {}>(
  props: CardDescriptionProps<T>
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
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn(
        "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...createComponentProps(componentId, "card-description", isDebugMode)}
    >
      {children}
    </Component>
  );
}

CardDescription.displayName = "CardDescription";

// ============================================================================
// CARD EYEBROW COMPONENT
// ============================================================================

type CardEyebrowProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps &
    React.ComponentPropsWithRef<"p" | "time"> &
    T & {
      decorate?: boolean;
      dateTime?: string;
    };

function CardEyebrow<T extends Record<string, unknown> = {}>(
  props: CardEyebrowProps<T>
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
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
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
}

CardEyebrow.displayName = "CardEyebrow";

// ============================================================================
// CARD LINK COMPONENT
// ============================================================================

type CardLinkProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps &
    React.ComponentPropsWithRef<"div"> &
    T &
    Pick<CardLinkCustomProps, "href" | "target" | "title"> & {};

function CardLink<T extends Record<string, unknown> = {}>(
  props: CardLinkProps<T>
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

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<typeof Component>)}
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

      {linkHref ? (
        <CardLinkCustom
          href={linkHref}
          target={linkTargetProps?.target}
          rel={linkTargetProps?.rel}
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
}

CardLink.displayName = "CardLink";

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

type CardTitleProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps &
    React.ComponentPropsWithRef<"h2"> &
    T &
    Pick<CardLinkCustomProps, "href" | "target" | "title"> & {};

function CardTitle<T extends Record<string, unknown> = {}>(
  props: CardTitleProps<T>
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

  const linkHref = href && isValidLink(href) ? href : null;
  const linkTargetProps = linkHref
    ? getLinkTargetProps(linkHref, target)
    : undefined;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<typeof Component>)}
      className={cn(
        "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100",
        className
      )}
      {...createComponentProps(componentId, "card-title", isDebugMode)}
    >
      {linkHref ? (
        <CardLinkCustom
          href={linkHref}
          target={linkTargetProps?.target ?? undefined}
          rel={linkTargetProps?.rel ?? undefined}
          title={title ?? undefined}
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
}

CardTitle.displayName = "CardTitle";

// ============================================================================
// CARD COMPONENT
// ============================================================================

export type CardProps<T extends Record<string, unknown> = {}> =
  CommonAppComponentProps & React.ComponentPropsWithRef<"div"> & T & {};

export function Card<T extends Record<string, unknown> = {}>(
  props: CardProps<T>
) {
  const {
    as: Component = "div",
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
      {...(rest as React.ComponentPropsWithRef<typeof Component>)}
      className={cn("group relative flex flex-col items-start", className)}
      {...createComponentProps(componentId, "card", isDebugMode)}
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

// ============================================================================
// MEMOIZED CARD COMPONENT
// ============================================================================

export const MemoizedCard = React.memo(Card);
