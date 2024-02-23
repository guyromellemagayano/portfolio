'use client'

import { ElementType, FC, useId } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

import ChevronRightSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/ChevronRight'

import type { TContainerProps } from '@guy-romelle-magayano/portfolio/types/common'
import {
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

export type TCardProps = TContainerProps & {
  as?: ElementType
}

interface ICardStaticComponents {
  Link: FC<TCardCommonProps>
  Title: FC<TCardCommonProps>
  Description: FC<TCardCommonProps>
  Cta: FC<TCardCommonProps>
  Eyebrow: FC<TCardCommonProps>
}

interface ICardProps extends FC<TCardProps>, ICardStaticComponents {}

/**
 * Renders the card component.
 * @param as - The HTML tag or React component to render as the card.
 * @param className - Additional CSS classes to apply to the card.
 * @param children - The content to render inside the card.
 * @param rest - The rest of the props of the card.
 * @returns The rendered card component.
 */
const Card: ICardProps = ({
  as: Component = 'div',
  className,
  children,
  ...rest
}) => {
  return (
    <Component
      className={clsx('group relative flex flex-col items-start', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export type TCardCommonProps = TCardProps & {
  href?: string
  title?: string
  decorate?: boolean
  target?: string
}

/**
 * Renders the card link component.
 * @param href - The URL to link to.
 * @param title - The title of the link.
 * @param id - The ID of the link.
 * @param children - The content to render inside the link.
 * @param className - Additional CSS classes to apply to the link.
 * @param target - The target of the link.
 * @param rest - The rest of the props of the link.
 * @returns The rendered card link component.
 */
const CardLink: FC<TCardCommonProps> = ({
  children,
  href,
  title,
  id,
  target,
  ...rest
}) => {
  const customId = useId()

  return (
    <div id={id || customId} {...rest}>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />

      {isStringType(href) && !isEmpty(href) && children ? (
        <Link href={href} title={title} target={target}>
          <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{children}</span>
        </Link>
      ) : (
        children
      )}
    </div>
  )
}

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
const CardTitle: FC<TCardCommonProps> = ({
  as: Component = 'h2',
  href,
  children,
  title,
  className,
  ...rest
}) => {
  return (
    <Component
      className={clsx(
        'text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100',
        className
      )}
      {...rest}
    >
      {isStringType(href) && !isEmpty(href) && children ? (
        <Card.Link href={href} title={title}>
          {children}
        </Card.Link>
      ) : (
        children
      )}
    </Component>
  )
}

/**
 * Renders the card description component.
 * @param children - The content to render inside the description.
 * @param id - The ID of the description.
 * @param className - Additional CSS classes to apply to the description.
 * @param rest - The rest of the props of the description.
 * @returns The rendered card description component.
 */
const CardDescription: FC<TCardCommonProps> = ({
  children,
  id,
  className,
  ...rest
}) => {
  const customId = useId()

  return (
    <p
      id={id || customId}
      className={clsx(
        'relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400',
        className
      )}
      {...rest}
    >
      {children}
    </p>
  )
}

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
const CardCta: FC<TCardCommonProps> = ({
  title,
  children,
  id,
  className,
  href,
  ...rest
}) => {
  const customId = useId()

  return (
    <div
      aria-hidden="true"
      id={id || customId}
      className={clsx(
        'relative z-10 mt-2 text-sm font-medium flex items-start text-amber-500',
        className
      )}
      {...rest}
    >
      {isStringType(href) && !isEmpty(href) && children ? (
        <Link
          href={href}
          title={title}
          className="transition hover:text-amber-600 dark:hover:text-amber-600 flex items-center"
        >
          {children}
          <ChevronRightSvgImage className="ml-1 h-4 w-4 stroke-current" />
        </Link>
      ) : (
        children
      )}
    </div>
  )
}

/**
 * An eyebrow component that can be used inside a Card component.
 * @param as - The HTML tag or React component to render as the eyebrow.
 * @param [decorate=false] - Whether to decorate the eyebrow with a line.
 * @param className - Additional CSS classes to apply to the eyebrow.
 * @param children - The content to render inside the eyebrow.
 * @returns The rendered eyebrow component.
 */
const CardEyebrow: FC<TCardCommonProps> = ({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...rest
}) => {
  return (
    <Component
      className={clsx(
        'relative z-10 my-1 flex items-center text-sm font-medium',
        className,
        decorate && 'pl-3'
      )}
      {...rest}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}

      {children}
    </Component>
  )
}

Card.Link = CardLink
Card.Title = CardTitle
Card.Description = CardDescription
Card.Cta = CardCta
Card.Eyebrow = CardEyebrow

export default Card
