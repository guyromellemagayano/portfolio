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
import { isRenderableContent, isValidLink } from "@guyromellemagayano/utils";

import type { CommonWebAppComponentProps } from "@web/@types";
import { Icon } from "@web/components/icon";
import { cn } from "@web/lib";

import styles from "./Card.module.css";

// ============================================================================
// CARD EYEBROW COMPONENT
// ============================================================================

type CardEyebrowRef = React.ComponentRef<typeof Time>;
interface CardEyebrowProps extends React.ComponentPropsWithoutRef<typeof Time> {
  /** Whether to decorate the eyebrow with a line. */
  decorate?: boolean;
}

interface InternalCardEyebrowProps
  extends CardEyebrowProps,
    Pick<CommonWebAppComponentProps, "componentId" | "isDebugMode"> {}

type InternalCardEyebrowComponent = React.ForwardRefExoticComponent<
  InternalCardEyebrowProps & React.RefAttributes<CardEyebrowRef>
>;

/** Internal card eyebrow component with all props */
const InternalCardEyebrow = setDisplayName(
  React.memo(
    React.forwardRef(function InternalCardEyebrow(props, ref) {
      const {
        children,
        className,
        decorate = false,
        componentId,
        isDebugMode,
        ...rest
      } = props;

      if (!isRenderableContent(children)) return null;

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
    })
  )
) as InternalCardEyebrowComponent;

type CardEyebrowComponent = React.ForwardRefExoticComponent<
  CardEyebrowProps &
    Pick<CommonWebAppComponentProps, "_internalId" | "_debugMode"> &
    React.RefAttributes<CardEyebrowRef>
>;

/** Public card eyebrow component with useComponentId integration */
export const CardEyebrow = setDisplayName(
  React.memo(
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
    })
  )
) as CardEyebrowComponent;

// ============================================================================
// CARD LINK COMPONENT
// ============================================================================

type CardLinkRef = React.ComponentRef<typeof Link>;
interface CardLinkProps
  extends React.ComponentPropsWithoutRef<typeof Heading>,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title"> {
  /** The URL to link to when the card link is clicked. */
  href?: string;
}

interface InternalCardLinkProps
  extends CardLinkProps,
    Pick<CommonWebAppComponentProps, "componentId" | "isDebugMode"> {}

type InternalCardLinkComponent = React.ForwardRefExoticComponent<
  InternalCardLinkProps & React.RefAttributes<CardLinkRef>
>;

/** Internal card link component with all props */
const InternalCardLink = setDisplayName(
  React.memo(
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

      if (!isRenderableContent(children)) return null;

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
          {isValidLink(href) ? (
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
    })
  )
) as InternalCardLinkComponent;

type CardLinkComponent = React.ForwardRefExoticComponent<
  CardLinkProps &
    Pick<CommonWebAppComponentProps, "_internalId" | "_debugMode"> &
    React.RefAttributes<CardLinkRef>
>;

/** Public card link component with `useComponentId` integration */
const CardLink = setDisplayName(
  React.memo(
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
    })
  )
) as CardLinkComponent;

// ============================================================================
// CARD TITLE COMPONENT
// ============================================================================

type CardTitleRef = React.ComponentRef<typeof Heading>;
interface CardTitleProps
  extends React.ComponentProps<typeof Heading>,
    Pick<CardLinkProps, "target" | "title"> {
  /** The URL to link to when the card title is clicked. */
  href?: string;
}

interface InternalCardTitleProps
  extends CardTitleProps,
    Pick<CommonWebAppComponentProps, "componentId" | "isDebugMode"> {}

type InternalCardTitleComponent = React.ForwardRefExoticComponent<
  InternalCardTitleProps & React.RefAttributes<CardTitleRef>
>;

/** Internal card title component with all props */
const InternalCardTitle = setDisplayName(
  React.memo(
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

      if (!isRenderableContent(children)) return null;

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
          {isValidLink(href) ? (
            <InternalCardLink href={href} target={target} title={title}>
              {children}
            </InternalCardLink>
          ) : (
            children
          )}
        </Heading>
      );

      return element;
    })
  )
) as InternalCardTitleComponent;

type CardTitleComponent = React.ForwardRefExoticComponent<
  CardTitleProps &
    Pick<CommonWebAppComponentProps, "_internalId" | "_debugMode"> &
    React.RefAttributes<CardTitleRef>
>;

/** Public card title component with useComponentId integration */
const CardTitle = setDisplayName(
  React.memo(
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
    })
  )
) as CardTitleComponent;

// ============================================================================
// CARD DESCRIPTION COMPONENT
// ============================================================================

type CardDescriptionRef = React.ComponentRef<typeof P>;
interface CardDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof P> {}

interface InternalCardDescriptionProps
  extends CardDescriptionProps,
    Pick<CommonWebAppComponentProps, "componentId" | "isDebugMode"> {}

type InternalCardDescriptionComponent = React.ForwardRefExoticComponent<
  InternalCardDescriptionProps & React.RefAttributes<CardDescriptionRef>
>;

/** Internal card description component with all props */
const InternalCardDescription = setDisplayName(
  React.memo(
    React.forwardRef(function InternalCardDescription(props, ref) {
      const { children, className, componentId, isDebugMode, ...rest } = props;

      if (!isRenderableContent(children)) return null;

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
    })
  )
) as InternalCardDescriptionComponent;

type CardDescriptionComponent = React.ForwardRefExoticComponent<
  CardDescriptionProps &
    Pick<CommonWebAppComponentProps, "_internalId" | "_debugMode"> &
    React.RefAttributes<CardDescriptionRef>
>;

/** Public card description component with useComponentId integration */
const CardDescription = setDisplayName(
  React.memo(
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
    })
  )
) as CardDescriptionComponent;

// ============================================================================
// CARD CTA COMPONENT
// ============================================================================

type CardCtaRef =
  | React.ComponentRef<typeof Div>
  | React.ComponentRef<typeof Link>;
interface CardCtaProps
  extends React.ComponentPropsWithoutRef<typeof Div>,
    Pick<CardLinkProps, "target" | "title">,
    Pick<CommonWebAppComponentProps, "_internalId" | "_debugMode"> {
  /** The URL to link to when the card CTA is clicked. */
  href?: string;
}

interface InternalCardCtaProps
  extends CardCtaProps,
    Pick<CommonWebAppComponentProps, "componentId" | "isDebugMode"> {}

type InternalCardCtaComponent = React.ForwardRefExoticComponent<
  InternalCardCtaProps & React.RefAttributes<CardCtaRef>
>;

/** Internal card CTA component with all props */
const InternalCardCta = setDisplayName(
  React.memo(
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

      if (!isRenderableContent(children)) return null;

      /** Type-safe ref handling function */
      function handleRef(
        element: HTMLDivElement | HTMLAnchorElement | null
      ): void {
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      }

      const element = (
        <Div
          {...rest}
          ref={!isValidLink(href) ? handleRef : undefined}
          className={cn(styles.cardCtaContainer, className)}
          data-card-cta-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
          data-testid="card-cta-root"
        >
          {isValidLink(href) ? (
            <Link
              ref={handleRef}
              href={href}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : undefined}
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
    })
  )
) as InternalCardCtaComponent;

type CardCtaComponent = React.ForwardRefExoticComponent<
  CardCtaProps & React.RefAttributes<CardCtaRef>
>;

/** Public card CTA component with useComponentId integration */
const CardCta = setDisplayName(
  React.memo(
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
    })
  ),
  "CardCta"
) as CardCtaComponent;

// ============================================================================
// MAIN CARD COMPONENT
// ============================================================================

type CardRef = React.ComponentRef<typeof Article>;
interface CardProps extends React.ComponentPropsWithoutRef<typeof Article> {}

interface InternalCardProps
  extends CardProps,
    Pick<CommonWebAppComponentProps, "componentId" | "isDebugMode"> {}

type InternalCardComponent = React.ForwardRefExoticComponent<
  InternalCardProps & React.RefAttributes<CardRef>
>;

/** Internal card component with all props */
const InternalCard = setDisplayName(
  React.memo(
    React.forwardRef(function InternalCard(props, ref) {
      const { children, className, componentId, isDebugMode, ...rest } = props;

      const element = (
        <Article
          {...rest}
          ref={ref}
          className={cn(styles.card, className)}
          data-card-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
          data-testid="card-root"
        >
          {children}
        </Article>
      );

      return element;
    })
  )
) as InternalCardComponent;

type CardComponent = React.ForwardRefExoticComponent<
  CardProps &
    Pick<CommonWebAppComponentProps, "_internalId" | "_debugMode"> &
    React.RefAttributes<CardRef>
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
  React.memo(
    React.forwardRef(function Card(props, ref) {
      const { _internalId, _debugMode, ...rest } = props;

      // Use shared hook for ID generation and debug logging
      // Component name will be auto-detected from export const declaration
      const { id, isDebugMode } = useComponentId({
        internalId: _internalId,
        debugMode: _debugMode,
      });

      const element = (
        <InternalCard
          {...rest}
          ref={ref}
          componentId={id}
          isDebugMode={isDebugMode}
        />
      );

      return element;
    })
  )
) as CardComponent;

// ============================================================================
// COMPOUND COMPONENT EXPORTS
// ============================================================================

Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;
