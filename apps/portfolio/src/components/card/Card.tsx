'use client'

import {
  ElementType,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef
} from 'react'

import {
  Div,
  type DivisionProps,
  type DivisionRef,
  Heading,
  P,
  type ParagraphProps,
  type ParagraphRef,
  Span
} from '@react-components'

import { cn } from '@react-utils'

import { ChevronRightSvg } from '@portfolio/components'
import { Link } from '@portfolio/i18n/routing'

export type CardRef = DivisionRef
export type CardProps = DivisionProps & {
  as?: ElementType
}
export type CardCommonProps = CardProps & {
  href?: string
  title?: string
  decorate?: boolean
  target?: string
  dateTime?: string
}
export type CardStaticComponents = {
  Link: typeof CardLink
  Title: typeof CardTitle
  Description: typeof CardDescription
  Cta: typeof CardCta
  Eyebrow: typeof CardEyebrow
}

/**
 * Renders the card component.
 * @param {CardProps} props - The component props
 * @param {CardRef} ref - The component reference
 * @returns The rendered card component
 */
const Card = forwardRef<CardRef, CardProps>(
  ({ as: Component = Div, className, children, ...rest }, ref) => {
    if (!children) return null

    return (
      <Component
        ref={ref}
        className={cn('group relative flex flex-col items-start', className)}
        {...rest}
      >
        {children}
      </Component>
    )
  }
) as ForwardRefExoticComponent<CardProps & RefAttributes<CardRef>> &
  CardStaticComponents

Card.displayName = 'Card'

export type CardLinkRef = DivisionRef
export type CardLinkProps = CardCommonProps

/**
 * Renders the card link component.
 * @param {CardLinkProps} props - The component props
 * @param {CardLinkRef} ref - The component reference
 * @returns The rendered card link component
 */
const CardLink = forwardRef<CardLinkRef, CardLinkProps>(
  ({ href, title, target, children, ...rest }, ref) => {
    if (!children && !href) return null

    return (
      <Div ref={ref} {...rest}>
        <Div
          className={cn(
            'absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50'
          )}
        />

        {href ? (
          <Link href={href} target={target} title={title}>
            <Span
              className={cn(
                'absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl'
              )}
            />
            <Span className={cn('relative z-10')}>{children}</Span>
          </Link>
        ) : (
          children
        )}
      </Div>
    )
  }
)

CardLink.displayName = 'CardLink'

export type CardTitleRef = CardRef
export type CardTitleProps = CardCommonProps

/**
 * Renders the card title component.
 * @param {CardTitleProps} props - The component props
 * @param {CardTitleRef} ref - The component reference
 * @returns The rendered card title component
 */
const CardTitle = forwardRef<CardTitleRef, CardTitleProps>(
  (
    { as: Component = Heading, href, title, children, className, ...rest },
    ref
  ) => {
    if (!children && !href) return null

    return (
      <Component
        ref={ref}
        as="h2"
        className={cn(
          'text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100',
          className
        )}
        {...rest}
      >
        {href ? (
          <CardLink href={href} title={title}>
            {children}
          </CardLink>
        ) : (
          children
        )}
      </Component>
    )
  }
)

CardTitle.displayName = 'CardTitle'

export type CardDescriptionRef = ParagraphRef
export type CardDescriptionProps = ParagraphProps & CardCommonProps

/**
 * Renders the card description component.
 * @param {CardDescriptionProps} props - The component props
 * @param {CardDescriptionRef} ref - The component reference
 * @returns The rendered card description component
 */
const CardDescription = forwardRef<CardDescriptionRef, CardDescriptionProps>(
  ({ children, className, ...rest }, ref) => {
    if (!children) return null

    return (
      <P
        ref={ref}
        className={cn(
          'relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400',
          className
        )}
        {...rest}
      >
        {children}
      </P>
    )
  }
)

CardDescription.displayName = 'CardDescription'

export type CardCtaRef = DivisionRef
export type CardCtaProps = CardCommonProps

/**
 * Renders the card call to action component.
 * @param {CardCtaProps} props - The component props
 * @param {CardCtaRef} ref - The component reference
 * @returns The rendered card call to action component
 */
const CardCta = forwardRef<CardCtaRef, CardCtaProps>(
  ({ href, title, children, className, ...rest }, ref) => {
    if (!children && !href) return null

    return (
      <Div
        ref={ref}
        className={cn(
          'relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500',
          className
        )}
        aria-hidden="true"
        {...rest}
      >
        {href ? (
          <Link
            className="flex items-center transition hover:text-amber-600 dark:hover:text-amber-600"
            href={href}
            title={title}
          >
            {children}
            <ChevronRightSvg className="ml-1 h-4 w-4 stroke-current" />
          </Link>
        ) : (
          children
        )}
      </Div>
    )
  }
)

CardCta.displayName = 'CardCta'

export type CardEyebrowRef = CardRef
export type CardEyebrowProps = CardCommonProps &
  Pick<CardCommonProps, 'decorate'>

/**
 * An eyebrow component that can be used inside a Card component.
 * @param {CardEyebrowProps} props - The component props
 * @param {CardEyebrowRef} ref - The component reference
 * @returns The rendered eyebrow component
 */
const CardEyebrow = forwardRef<CardEyebrowRef, CardEyebrowProps>(
  (
    { as: Component = P, decorate = false, className, children, ...rest },
    ref
  ) => {
    if (!children) return null

    return (
      <Component
        ref={ref}
        className={cn(
          'relative z-10 my-1 flex items-center text-sm font-medium',
          className,
          decorate && 'pl-3'
        )}
        {...rest}
      >
        {decorate && (
          <Span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 flex items-center"
          >
            <Span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          </Span>
        )}

        {children}
      </Component>
    )
  }
)

CardEyebrow.displayName = 'CardEyebrow'

Card.Link = CardLink
Card.Title = CardTitle
Card.Description = CardDescription
Card.Cta = CardCta
Card.Eyebrow = CardEyebrow

export default Card
