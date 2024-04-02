import {
  ElementType,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef
} from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

import { ChevronRightSvg } from '@guy-romelle-magayano/portfolio/components/SVG'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const Heading = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Heading
  )
)
const P = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.P)
)
const Span = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Span)
)

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
 * Renders the card link component.
 * @param href - The URL to link to.
 * @param title - The title of the link.
 * @param target - The target of the link.
 * @param children - The content to render inside the link.
 * @param rest - The rest of the props of the link.
 * @returns The rendered card link component.
 */
const CardLink = forwardRef<CardRef, CardCommonProps>(
  ({ href, title, target, children, ...rest }, ref) => {
    return (
      <Div ref={ref} {...rest}>
        <Div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />

        {href && children ? (
          <Link href={href} title={title} target={target}>
            <Span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
            <Span className="relative z-10">{children}</Span>
          </Link>
        ) : (
          children
        )}
      </Div>
    )
  }
)

CardLink.displayName = 'CardLink'

/**
 * Renders the card title component.
 * @param as - The HTML tag or React component to render as the title.
 * @param href - The URL to link to.
 * @param title - The title of the link.
 * @param children - The content to render inside the title.
 * @param className - Additional CSS classes to apply to the title.
 * @param rest - The rest of the props of the title.
 * @returns The rendered card title component.
 */
const CardTitle = forwardRef<CardRef, CardCommonProps>(
  (
    { as: Component = Heading, href, title, children, className, ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        as="h2"
        {...rest}
        className={cn(
          'text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100',
          className
        )}
      >
        {href && children ? (
          <Card.Link href={href} title={title}>
            {children}
          </Card.Link>
        ) : (
          children
        )}
      </Component>
    )
  }
)

CardTitle.displayName = 'CardTitle'

/**
 * Renders the card description component.
 * @param children - The content to render inside the description.
 * @param id - The ID of the description.
 * @param className - Additional CSS classes to apply to the description.
 * @param rest - The rest of the props of the description.
 * @returns The rendered card description component.
 */
const CardDescription = forwardRef<CardRef, CardCommonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <P
        ref={ref}
        {...rest}
        className={cn(
          'relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400',
          className
        )}
      >
        {children}
      </P>
    )
  }
)

CardDescription.displayName = 'CardDescription'

/**
 * Renders the card call to action component.
 * @param title - The title of the link.
 * @param children - The content to render inside the CTA.
 * @param id - The ID of the CTA.
 * @param className - Additional CSS classes to apply to the CTA.
 * @param href - The URL to link to.
 * @param rest - The rest of the props of the CTA.
 * @returns The rendered card CTA component.
 */
const CardCta = forwardRef<CardRef, CardCommonProps>(
  ({ href, title, children, className, ...rest }, ref) => {
    return (
      <Div
        ref={ref}
        aria-hidden="true"
        {...rest}
        className={cn(
          'relative z-10 mt-2 flex items-start text-sm font-medium text-amber-500',
          className
        )}
      >
        {href && children ? (
          <Link
            href={href}
            title={title}
            className="flex items-center transition hover:text-amber-600 dark:hover:text-amber-600"
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

/**
 * An eyebrow component that can be used inside a Card component.
 * @param as - The HTML tag or React component to render as the eyebrow.
 * @param [decorate=false] - Whether to decorate the eyebrow with a line.
 * @param className - Additional CSS classes to apply to the eyebrow.
 * @param children - The content to render inside the eyebrow.
 * @returns The rendered eyebrow component.
 */
const CardEyebrow = forwardRef<CardRef, CardCommonProps>(
  (
    { as: Component = P, decorate = false, children, className, ...rest },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        {...rest}
        className={cn(
          'relative z-10 my-1 flex items-center text-sm font-medium',
          className,
          decorate && 'pl-3'
        )}
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
      </Component>
    )
  }
)

CardEyebrow.displayName = 'CardEyebrow'

/**
 * Renders the card component.
 * @param as - The HTML tag or React component to render as the card.
 * @param className - Additional CSS classes to apply to the card.
 * @param children - The content to render inside the card.
 * @param rest - The rest of the props of the card.
 * @returns The rendered card component.
 */
const Card = forwardRef<CardRef, CardProps>(
  ({ as: Component = Div, className, children, ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        {...rest}
        className={cn('group relative flex flex-col items-start', className)}
      >
        {children}
      </Component>
    )
  }
) as ForwardRefExoticComponent<CardProps & RefAttributes<CardRef>> &
  CardStaticComponents

Card.displayName = 'Card'

Card.Link = CardLink
Card.Title = CardTitle
Card.Description = CardDescription
Card.Cta = CardCta
Card.Eyebrow = CardEyebrow

export default Card
