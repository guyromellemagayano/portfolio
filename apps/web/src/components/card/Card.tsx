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

const CardCtaElement: React.ElementType = "div";

type CardCtaRef = React.ComponentRef<typeof CardCtaElement>;
interface CardCtaProps
  extends
    React.ComponentPropsWithoutRef<typeof CardCtaElement>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
}

const CardCta = setDisplayName(
  React.forwardRef<CardCtaRef, CardCtaProps>(function CardCta(props, ref) {
    const {
      as: Component = CardCtaElement,
      children,
      className,
      href,
      target,
      title,
      debugId,
      debugMode,
      ...rest
    } = props;

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
        {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
        ref={ref}
        className={cn(
          "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500",
          className
        )}
        {...createComponentProps(componentId, "card-cta", isDebugMode)}
      >
        {linkHref ? (
          <CardLinkCustom
            href={linkHref}
            target={linkTargetProps?.target}
            rel={linkTargetProps?.rel}
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
  })
);

// ============================================================================
// CARD DESCRIPTION COMPONENT
// ============================================================================

const CardDescriptionElement: React.ElementType = "p";

type CardDescriptionRef = React.ComponentRef<typeof CardDescriptionElement>;
interface CardDescriptionProps
  extends
    React.ComponentPropsWithoutRef<typeof CardDescriptionElement>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {}

const CardDescription = setDisplayName(
  React.forwardRef<CardDescriptionRef, CardDescriptionProps>(
    function CardDescription(props, ref) {
      const {
        as: Component = CardDescriptionElement,
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

      return (
        <Component
          {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
          ref={ref}
          className={cn(
            "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400",
            className
          )}
          {...createComponentProps(
            componentId,
            "card-description",
            isDebugMode
          )}
        >
          {children}
        </Component>
      );
    }
  )
);

// ============================================================================
// CARD EYEBROW COMPONENT
// ============================================================================

const CardEyebrowElement: "p" | "time" = "p";

type CardEyebrowRef = React.ComponentRef<typeof CardEyebrowElement>;
interface CardEyebrowProps
  extends
    React.ComponentPropsWithoutRef<typeof CardEyebrowElement>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {
  decorate?: boolean;
  dateTime?: string;
}

const CardEyebrow = setDisplayName(
  React.forwardRef<CardEyebrowRef, CardEyebrowProps>(
    function CardEyebrow(props, ref) {
      const {
        as: Component = CardEyebrowElement,
        children,
        className,
        debugId,
        debugMode,
        dateTime,
        decorate = false,
        ...rest
      } = props;

      const { componentId, isDebugMode } = useComponentId({
        debugId,
        debugMode,
      });

      if (!children) return null;

      return (
        <Component
          {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
          ref={ref}
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
  )
);

// ============================================================================
// CARD LINK COMPONENT
// ============================================================================

const CardLinkElement: React.ElementType = "div";

type CardLinkRef = React.ComponentRef<typeof CardLinkElement>;
interface CardLinkProps
  extends
    React.ComponentPropsWithoutRef<typeof CardLinkElement>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
}

const CardLink = setDisplayName(
  React.forwardRef<CardLinkRef, CardLinkProps>(function CardLink(props, ref) {
    const {
      as: Component = CardLinkElement,
      children,
      className,
      href,
      target,
      title,
      debugId,
      debugMode,
      ...rest
    } = props;

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
        {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
        ref={ref}
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
  })
);

// ============================================================================
// CARD LINK CUSTOM COMPONENT
// ============================================================================

const CardLinkCustomElement: React.ElementType = Link;

type CardLinkCustomRef = React.ComponentRef<typeof CardLinkCustomElement>;
interface CardLinkCustomProps
  extends
    React.ComponentPropsWithoutRef<typeof CardLinkCustomElement>,
    CardLinkProps,
    Pick<
      CardLinkProps,
      "as" | "debugId" | "debugMode" | "href" | "target" | "title"
    > {}

const CardLinkCustom = setDisplayName(
  React.forwardRef<CardLinkCustomRef, CardLinkCustomProps>(
    function CardLinkCustom(props, ref) {
      const {
        as: Component = CardLinkCustomElement,
        children,
        title,
        href,
        target,
        rel,
        debugId,
        debugMode,
        ...rest
      } = props;

      const { componentId, isDebugMode } = useComponentId({
        debugId,
        debugMode,
      });

      if (!children) return null;

      // Automatically add rel for external links when target is _blank and rel is not provided
      const linkTargetProps =
        !rel &&
        href &&
        target === "_blank" &&
        typeof href === "string" &&
        href.startsWith("http")
          ? getLinkTargetProps(href, target)
          : { target, rel };

      return (
        <Component
          {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
          ref={ref}
          href={href}
          target={linkTargetProps.target}
          rel={linkTargetProps.rel}
          title={title}
          aria-label={title}
          {...createComponentProps(
            componentId,
            "card-link-custom",
            isDebugMode
          )}
        >
          {children}
        </Component>
      );
    }
  )
);

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

const CardTitleElement: React.ElementType = "h2";

type CardTitleRef = React.ComponentRef<typeof CardTitleElement>;
interface CardTitleProps
  extends
    React.ComponentPropsWithoutRef<typeof CardTitleElement>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  target?: React.ComponentPropsWithoutRef<typeof Link>["target"];
  title?: React.ComponentPropsWithoutRef<typeof Link>["title"];
}

const CardTitle = setDisplayName(
  React.forwardRef<CardTitleRef, CardTitleProps>(
    function CardTitle(props, ref) {
      const {
        as: Component = CardTitleElement,
        children,
        className,
        href,
        target,
        title,
        debugId,
        debugMode,
        ...rest
      } = props;

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
          ref={ref}
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
    }
  )
);

// ============================================================================
// CARD COMPONENT
// ============================================================================

const CardElementType: React.ElementType = "article";

export type CardRef = React.ComponentRef<typeof CardElementType>;
export interface CardProps
  extends
    React.ComponentPropsWithoutRef<typeof CardElementType>,
    Pick<CommonComponentProps, "as" | "debugId" | "debugMode"> {}

export interface CardCompoundComponent extends React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<CardRef>
> {
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
}

export const Card = setDisplayName(
  React.forwardRef<CardRef, CardProps>(function Card(props, ref) {
    const {
      as: Component = CardElementType,
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

    return (
      <Component
        {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
        ref={ref}
        className={cn("group relative flex flex-col items-start", className)}
        {...createComponentProps(componentId, "card", isDebugMode)}
      >
        {children}
      </Component>
    );
  })
) as CardCompoundComponent;

// ============================================================================
// CARD COMPOUND COMPONENTS
// ============================================================================

Card.Cta = CardCta;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Link = CardLink;
Card.LinkCustom = CardLinkCustom;
Card.Eyebrow = CardEyebrow;

export default Card;

// ============================================================================
// MEMOIZED CARD COMPONENT
// ============================================================================

export const MemoizedCard = React.memo(Card);
