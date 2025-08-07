import React from "react";

import Link from "next/link";

import {
  Article,
  type ArticleProps,
  type ArticleRef,
  Div,
  type DivProps,
  type DivRef,
  Heading,
  type HeadingProps,
  type HeadingRef,
  P,
  type PProps,
  type PRef,
  Span,
  Svg,
  type SvgProps,
  Time,
  TimeProps,
  TimeRef,
} from "@guyromellemagayano/components";

import { cn } from "@web/lib";

export type CardRef = ArticleRef;
export interface CardProps extends ArticleProps {}
export type CardComponent = React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<CardRef>
> & {
  /**
   * A card link component that provides interactive hover effects and accessibility features.
   */
  Link: CardLinkComponent;

  /**
   * A card title component that can optionally be wrapped in a link for navigation.
   */
  Title: CardTitleComponent;

  /**
   * A card description component that can optionally be wrapped in a link for navigation.
   */
  Description: CardDescriptionComponent;

  /**
   * A card call to action component that can optionally be wrapped in a link for navigation.
   */
  Cta: CardCtaComponent;

  /**
   * A card eyebrow component that can optionally be wrapped in a link for navigation.
   */
  Eyebrow: CardEyebrowComponent;
};

/**
 * A card component that can be used to display content in a card-like format.
 */
export const Card = React.forwardRef<CardRef, CardProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const element = (
    <Article
      ref={ref}
      className={cn(className, "group relative flex flex-col items-start")}
      {...rest}
    >
      {children}
    </Article>
  );

  return element;
}) as CardComponent;

Card.displayName = "Card";

type CardLinkRef = React.ComponentRef<typeof Link>;
interface CardLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {}
type CardLinkComponent = React.ForwardRefExoticComponent<
  CardLinkProps & React.RefAttributes<CardLinkRef>
>;

/**
 * A card link component that provides interactive hover effects and accessibility features.
 */
const CardLink = React.forwardRef<CardLinkRef, CardLinkProps>((props, ref) => {
  const {
    children,
    className,
    href = "#",
    title = "",
    target = "_self",
    ...rest
  } = props;

  if (!children && !href) return null;

  const element = (
    <>
      <Div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />

      {href ? (
        <Link
          ref={ref}
          href={href}
          target={target}
          title={title}
          className={className}
          {...rest}
        >
          <Span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <Span className="relative z-10">{children}</Span>
        </Link>
      ) : (
        children
      )}
    </>
  );

  return element;
}) as CardLinkComponent;

CardLink.displayName = "CardLink";

type CardTitleRef = HeadingRef;
interface CardTitleProps
  extends HeadingProps,
    Pick<CardLinkProps, "href" | "target" | "title"> {}
type CardTitleComponent = React.ForwardRefExoticComponent<
  CardTitleProps & React.RefAttributes<CardTitleRef>
>;

/**
 * A card title component that can optionally be wrapped in a link for navigation.
 */
const CardTitle = React.forwardRef<CardTitleRef, CardTitleProps>(
  (props, ref) => {
    const {
      children,
      className,
      href = "#",
      title = "",
      target = "_self",
      ...rest
    } = props;

    if (!children && !href) return null;

    const element = (
      <Heading
        ref={ref}
        as={"h2"}
        className={cn(
          className,
          "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
        )}
        {...rest}
      >
        {href ? (
          <CardLink href={href} target={target} title={title}>
            {children}
          </CardLink>
        ) : (
          children
        )}
      </Heading>
    );

    return element;
  }
) as CardTitleComponent;

CardTitle.displayName = "CardTitle";

type CardDescriptionRef = PRef;
interface CardDescriptionProps extends PProps {}
type CardDescriptionComponent = React.ForwardRefExoticComponent<
  CardDescriptionProps & React.RefAttributes<CardDescriptionRef>
>;

/**
 * A card description component that can optionally be wrapped in a link for navigation.
 */
const CardDescription = React.forwardRef<
  CardDescriptionRef,
  CardDescriptionProps
>((props, ref) => {
  const { children, className, ...rest } = props;

  if (!children) return null;

  const element = (
    <P
      ref={ref}
      className={cn(
        className,
        "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400"
      )}
      {...rest}
    >
      {children}
    </P>
  );

  return element;
}) as CardDescriptionComponent;

CardDescription.displayName = "CardDescription";

interface ChevronRightIconProps extends SvgProps {}

const ChevronRightIcon = (props: ChevronRightIconProps) => {
  return (
    <Svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

type CardCtaRef = DivRef;
interface CardCtaProps
  extends DivProps,
    Pick<CardLinkProps, "target" | "title"> {
  href?: string;
}
type CardCtaComponent = React.ForwardRefExoticComponent<
  CardCtaProps & React.RefAttributes<CardCtaRef>
>;

const CardCta = React.forwardRef<CardCtaRef, CardCtaProps>((props, ref) => {
  const {
    children,
    className,
    href,
    title = "",
    target = "_self",
    ...rest
  } = props;

  const element = (
    <Div
      ref={ref}
      className={cn(
        className,
        "relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500"
      )}
      aria-hidden="true"
      {...rest}
    >
      {href ? (
        <Link
          href={href}
          title={title}
          target={target}
          className="flex items-center transition hover:text-amber-600 dark:hover:text-amber-600"
        >
          {children}
          <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
        </Link>
      ) : (
        children
      )}
    </Div>
  );

  return element;
}) as CardCtaComponent;

CardCta.displayName = "CardCta";

type CardEyebrowRef = TimeRef;
interface CardEyebrowProps extends TimeProps {
  /**
   * Whether to decorate the eyebrow with a line.
   */
  decorate?: boolean;
}
type CardEyebrowComponent = React.ForwardRefExoticComponent<
  CardEyebrowProps & React.RefAttributes<CardEyebrowRef>
>;

/**
 * A card eyebrow component that can optionally be wrapped in a link for navigation.
 */
const CardEyebrow = React.forwardRef<CardEyebrowRef, CardEyebrowProps>(
  (props, ref) => {
    const { children, className, decorate = false, ...rest } = props;

    const element = (
      <Time
        ref={ref}
        className={cn(
          className,
          "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
          decorate && "pl-3.5"
        )}
        {...rest}
      >
        {decorate && (
          <Span
            className="absolute inset-y-0 left-0 flex items-center"
            aria-hidden="true"
          >
            <Span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          </Span>
        )}

        {children}
      </Time>
    );

    return element;
  }
) as CardEyebrowComponent;

CardEyebrow.displayName = "CardEyebrow";

Card.Link = CardLink;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Cta = CardCta;
Card.Eyebrow = CardEyebrow;
