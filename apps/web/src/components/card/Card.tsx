import React from "react";

import Link from "next/link";

import {
  Article,
  Div,
  Heading,
  P,
  Span,
  Time,
} from "@guyromellemagayano/components";
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { Icon } from "@web/components/icon";
import { cn } from "@web/lib";

import styles from "./Card.module.css";

// ============================================================================
// CARD EYEBROW COMPONENT
// ============================================================================

type CardEyebrowRef = React.ComponentRef<typeof Time>;

interface InternalCardEyebrowProps extends CardEyebrowProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalCardEyebrowComponent = React.ForwardRefExoticComponent<
  InternalCardEyebrowProps & React.RefAttributes<CardEyebrowRef>
>;

/** Internal card eyebrow component with all props */
const InternalCardEyebrow = setDisplayName(
  React.forwardRef(function InternalCardEyebrow(props, ref) {
    const {
      children,
      className,
      decorate = false,
      componentId,
      isDebugMode,
      ...rest
    } = props;

    if (!children) return null;

    const element = (
      <Time
        {...rest}
        ref={ref}
        className={cn(
          styles.cardEyebrow,
          decorate && styles.cardEyebrowDecorated,
          className
        )}
        data-card-eyebrow-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-eyebrow-root"
      >
        {decorate && (
          <Span className={styles.cardEyebrowDecoratorWrapper}>
            <Span className={styles.cardEyebrowDecorator} />
          </Span>
        )}

        {children}
      </Time>
    );

    return element;
  }),
  "InternalCardEyebrow"
) as InternalCardEyebrowComponent;

interface CardEyebrowProps
  extends React.ComponentProps<typeof Time>,
    CommonWebAppComponentProps {
  /** Whether to decorate the eyebrow with a line. */
  decorate?: boolean;
}

type CardEyebrowComponent = React.ForwardRefExoticComponent<
  CardEyebrowProps & React.RefAttributes<CardEyebrowRef>
>;

/** Public card eyebrow component with useComponentId integration */
export const CardEyebrow = setDisplayName(
  React.forwardRef(function CardEyebrow(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalCardEyebrow
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "CardEyebrow"
) as CardEyebrowComponent;

// ============================================================================
// CARD LINK COMPONENT
// ============================================================================

type CardLinkRef = React.ComponentRef<typeof Link>;

interface InternalCardLinkProps extends CardLinkProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalCardLinkComponent = React.ForwardRefExoticComponent<
  InternalCardLinkProps & React.RefAttributes<CardLinkRef>
>;

/** Internal card link component with all props */
const InternalCardLink = setDisplayName(
  React.forwardRef(function InternalCardLink(props, ref) {
    const {
      children,
      className,
      as = "h2",
      href = "#",
      title = "",
      target = "_self",
      componentId,
      isDebugMode,
      ...rest
    } = props;

    if (!children) return null;

    const element = (
      <Heading
        {...rest}
        as={as}
        className={cn(styles.cardLinkHeading, className)}
        data-card-link-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-link-root"
      >
        <Div className={styles.cardLinkBackground} />

        {href ? (
          <Link ref={ref} href={href} target={target} title={title}>
            <Span className={styles.cardLinkClickableArea} />
            <Span className={styles.cardLinkContent}>{children}</Span>
          </Link>
        ) : (
          children
        )}
      </Heading>
    );

    return element;
  }),
  "InternalCardLink"
) as InternalCardLinkComponent;

interface CardLinkProps
  extends React.ComponentProps<typeof Heading>,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title">,
    CommonWebAppComponentProps {
  /** The URL to link to when the card link is clicked. */
  href?: string;
}

type CardLinkComponent = React.ForwardRefExoticComponent<
  CardLinkProps & React.RefAttributes<CardLinkRef>
>;

/** Public card link component with useComponentId integration */
const CardLink = setDisplayName(
  React.forwardRef(function CardLink(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalCardLink
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "CardLink"
) as CardLinkComponent;

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

type CardTitleRef = React.ComponentRef<typeof Heading>;
interface CardTitleProps
  extends React.ComponentProps<typeof Heading>,
    Pick<CardLinkProps, "target" | "title">,
    CommonWebAppComponentProps {
  /** The URL to link to when the card title is clicked. */
  href?: string;
}

interface InternalCardTitleProps extends CardTitleProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalCardTitleComponent = React.ForwardRefExoticComponent<
  InternalCardTitleProps & React.RefAttributes<CardTitleRef>
>;

/** Internal card title component with all props */
const InternalCardTitle = setDisplayName(
  React.forwardRef(function InternalCardTitle(props, ref) {
    const {
      children,
      className,
      href = "#",
      title = "",
      target = "_self",
      componentId,
      isDebugMode,
      ...rest
    } = props;

    if (!children) return null;

    const element = (
      <Heading
        {...rest}
        ref={ref}
        as="h2"
        className={cn(styles.cardTitle, className)}
        data-card-title-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-title-root"
      >
        {href ? (
          <InternalCardLink href={href} target={target} title={title}>
            {children}
          </InternalCardLink>
        ) : (
          children
        )}
      </Heading>
    );

    return element;
  }),
  "InternalCardTitle"
) as InternalCardTitleComponent;

type CardTitleComponent = React.ForwardRefExoticComponent<
  CardTitleProps & React.RefAttributes<CardTitleRef>
>;

/** Public card title component with useComponentId integration */
const CardTitle = setDisplayName(
  React.forwardRef(function CardTitle(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalCardTitle
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "CardTitle"
) as CardTitleComponent;

// ============================================================================
// CARD DESCRIPTION COMPONENT
// ============================================================================

type CardDescriptionRef = React.ComponentRef<typeof P>;
interface CardDescriptionProps
  extends React.ComponentProps<typeof P>,
    CommonWebAppComponentProps {}

interface InternalCardDescriptionProps extends CardDescriptionProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalCardDescriptionComponent = React.ForwardRefExoticComponent<
  InternalCardDescriptionProps & React.RefAttributes<CardDescriptionRef>
>;

/** Internal card description component with all props */
const InternalCardDescription = setDisplayName(
  React.forwardRef(function InternalCardDescription(props, ref) {
    const { children, className, componentId, isDebugMode, ...rest } = props;

    if (!children) return null;

    const element = (
      <P
        {...rest}
        ref={ref}
        className={cn(styles.cardDescription, className)}
        data-card-description-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-description-root"
      >
        {children}
      </P>
    );

    return element;
  }),
  "InternalCardDescription"
) as InternalCardDescriptionComponent;

type CardDescriptionComponent = React.ForwardRefExoticComponent<
  CardDescriptionProps & React.RefAttributes<CardDescriptionRef>
>;

/** Public card description component with useComponentId integration */
const CardDescription = setDisplayName(
  React.forwardRef(function CardDescription(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalCardDescription
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "CardDescription"
) as CardDescriptionComponent;

// ============================================================================
// CARD CTA COMPONENT
// ============================================================================

type CardCtaRef = React.ComponentRef<typeof Div>;
interface CardCtaProps
  extends React.ComponentProps<typeof Div>,
    Pick<CardLinkProps, "target" | "title">,
    CommonWebAppComponentProps {
  /** The URL to link to when the card CTA is clicked. */
  href?: string;
}

interface InternalCardCtaProps extends CardCtaProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalCardCtaComponent = React.ForwardRefExoticComponent<
  InternalCardCtaProps & React.RefAttributes<CardCtaRef>
>;

/** Internal card CTA component with all props */
const InternalCardCta = setDisplayName(
  React.forwardRef(function InternalCardCta(props, ref) {
    const {
      children,
      className,
      href = "#",
      target = "_self",
      title = "",
      componentId,
      isDebugMode,
      ...rest
    } = props;

    if (!children) return null;

    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.cardCtaContainer, className)}
        data-card-cta-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-cta-root"
      >
        {href && href !== "#" ? (
          <Link
            href={href}
            target={target}
            title={title}
            className={styles.cardCtaLink}
          >
            {children}
            <Icon.ChevronRight className={styles.cardCtaIcon} />
          </Link>
        ) : (
          children
        )}
      </Div>
    );

    return element;
  }),
  "InternalCardCta"
) as InternalCardCtaComponent;

type CardCtaComponent = React.ForwardRefExoticComponent<
  CardCtaProps & React.RefAttributes<CardCtaRef>
>;

/** Public card CTA component with useComponentId integration */
const CardCta = setDisplayName(
  React.forwardRef(function CardCta(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalCardCta
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "CardCta"
) as CardCtaComponent;

// ============================================================================
// MAIN CARD COMPONENT
// ============================================================================

type CardRef = React.ComponentRef<typeof Article>;
interface CardProps
  extends React.ComponentProps<typeof Article>,
    CommonWebAppComponentProps {}

type CardComponent = React.ForwardRefExoticComponent<
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

/** A card component that can be used to display content in a card-like format. */
export const Card = setDisplayName(
  React.forwardRef<CardRef, CardProps>(function Card(props, ref) {
    const { children, className, _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <Article
        {...rest}
        ref={ref}
        className={cn("group relative flex flex-col items-start", className)}
        data-card-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="card-root"
      >
        {children}
      </Article>
    );

    return element;
  }),
  "Card"
) as CardComponent;

// ============================================================================
// COMPOUND COMPONENT EXPORTS
// ============================================================================

Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;
