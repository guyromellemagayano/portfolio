'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { ChevronRightSvgImage } from '@/components'

import { TBlockProps, TCardCommonProps } from '@/types/components'

/**
 * A card component that renders a container with a group class and a relative position.
 * @param {String} Component - The HTML tag or React component to render as the eyebrow.
 * @param {String} [className] - Additional CSS classes to apply to the eyebrow.
 * @param {React.ReactNode} children - The content to render inside the eyebrow.
 * @returns {JSX.Element} The rendered card component.
 */
const Card = ({
  as: Component = 'div',
  className,
  children
}: TBlockProps): JSX.Element => {
  return (
    <Component
      className={clsx('group relative flex flex-col items-start', className)}
    >
      {children}
    </Component>
  )
}

/**
 * A link component that can be used inside a Card component.
 * @param {React.ReactNode} children - The content to render inside the link.
 * @param {String} [href] - The URL to link to.
 * @param {String} [title] - The title of the link.
 * @param {String} [className] - Additional CSS classes to apply to the link.
 * @param {String} [target] - The target of the link.
 * @returns {JSX.Element} The rendered link component.
 */
const CardLink = ({
  children,
  href,
  title,
  className,
  target,
  ...rest
}: TCardCommonProps): JSX.Element => {
  return (
    <div {...rest}>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      {href ? (
        <Link href={href} title={title} className={className} target={target}>
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
 * A title component that can be used inside a Card component.
 * @param {String} Component - The HTML tag or React component to render as the title.
 * @param {String} [href] - The URL to link to.
 * @param {String} [title] - The title of the link.
 * @param {String} [className] - Additional CSS classes to apply to the title.
 * @returns {JSX.Element} The rendered title component.
 */
const CardTitle = ({
  as: Component = 'h2',
  href,
  children,
  title,
  className
}: TCardCommonProps): JSX.Element => {
  return (
    <Component
      className={clsx(
        'text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100',
        className
      )}
    >
      {href ? (
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
 * A description component that can be used inside a Card component.
 * @param {String} [className] - Additional CSS classes to apply to the description.
 * @param {React.ReactNode} children - The content to render inside the description.
 * @returns {JSX.Element} The rendered description component.
 */
const CardDescription = ({
  children,
  className
}: TCardCommonProps): JSX.Element => {
  return (
    <p
      className={clsx(
        'relative z-10 my-2 text-sm text-zinc-600 dark:text-zinc-400',
        className
      )}
    >
      {children}
    </p>
  )
}

/**
 * A CTA component that can be used inside a Card component.
 * @param {String} [className] - Additional CSS classes to apply to the CTA.
 * @param {String} [href] - The URL to link to.
 * @param {String} [title] - The title of the link.
 * @param {React.ReactNode} children - The content to render inside the CTA.
 * @returns {JSX.Element} The rendered CTA component.
 */
const CardCta = ({
  title,
  children,
  className,
  href,
  ...rest
}: TCardCommonProps): JSX.Element => {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'relative z-10 mt-2 text-sm font-medium flex items-start text-amber-500',
        className
      )}
      {...rest}
    >
      {href ? (
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
 * @param {String} Component - The HTML tag or React component to render as the eyebrow.
 * @param {Boolean} [decorate=false] - Whether to decorate the eyebrow with a line.
 * @param {String} [className] - Additional CSS classes to apply to the eyebrow.
 * @param {React.ReactNode} children - The content to render inside the eyebrow.
 * @returns {JSX.Element} The rendered eyebrow component.
 */
const CardEyebrow = ({
  as: Component = 'p',
  decorate = false,
  className,
  children,
  ...rest
}: TCardCommonProps): JSX.Element => {
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
