'use client'

import {
  ElementType,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
  memo
} from 'react'

import { usePathname } from 'next/navigation'

import {
  Aside,
  Div,
  type DivisionProps,
  type DivisionRef,
  Heading,
  P,
  Span
} from '@react-components'

import { cn } from '@react-utils'

import { BaseContainer } from '@portfolio/components'

export type ContentLayoutRef = DivisionRef
export type ContentLayoutProps = DivisionProps & {
  as?: ElementType
  title?: string
  intro?: string[] | string
}
export type ContentLayoutStaticComponents = {
  Simple: typeof ContentSimpleLayout
  Aside: typeof ContentAsideLayout
}

/**
 * Render the content aside layout component.
 * @param {ContentLayoutProps} props - The component props
 * @param {ContentLayoutRef} ref - The component reference
 * @returns The rendered content aside layout component
 */
const ContentAsideLayout = memo(
  forwardRef<ContentLayoutRef, ContentLayoutProps>(
    ({ title, intro, children, className, ...rest }, ref) => {
      if (!title && !intro && !children) return null

      return (
        <Aside ref={ref}>
          {title && (
            <Heading
              as="h1"
              className={cn(
                'text-4xl font-bold tracking-tighter text-zinc-800 dark:text-zinc-100'
              )}
            >
              {title}
            </Heading>
          )}
          {intro && (
            <P
              className={cn('mt-6 text-base text-zinc-600 dark:text-zinc-400')}
            >
              {Array.isArray(intro)
                ? intro.map((paragraph, index) => (
                    <Span key={index} className={cn('space-y-7')}>
                      {paragraph}
                    </Span>
                  ))
                : intro}
            </P>
          )}
          {children && (
            <Div className={cn('mt-16 sm:mt-20', className)} {...rest}>
              {children}
            </Div>
          )}
        </Aside>
      )
    }
  )
)

ContentAsideLayout.displayName = 'ContentAsideLayout'

/**
 * Render the content simple layout component.
 * @param {ContentLayoutProps} props - The component props
 * @param {ContentLayoutRef} ref - The component reference
 * @returns The rendered content simple layout component
 */
const ContentSimpleLayout = memo(
  forwardRef<ContentLayoutRef, ContentLayoutProps>(
    ({ title, intro, children, className, ...rest }, ref) => {
      const pathname = usePathname()

      if (!title && !intro && !children) return null

      return (
        <BaseContainer
          ref={ref}
          className={cn('mt-16 sm:mt-32', className)}
          {...rest}
        >
          <Div className={cn('w-full max-w-3xl')}>
            {title && (
              <Heading
                as="h1"
                className={cn(
                  'text-4xl font-bold tracking-tighter text-zinc-800 sm:text-5xl dark:text-zinc-100'
                )}
              >
                {title}
              </Heading>
            )}

            {intro && (
              <P
                className={cn(
                  'mt-6 flex flex-col space-y-7 text-base text-zinc-600 dark:text-zinc-400'
                )}
              >
                {Array.isArray(intro)
                  ? intro.map((paragraph, index) => (
                      <Span key={index} className={cn('space-y-7')}>
                        {paragraph}
                      </Span>
                    ))
                  : intro}
              </P>
            )}
          </Div>

          {children && (
            <Div
              className={cn(
                pathname !== '/' ? 'mt-16 sm:mt-20' : 'mt-9 sm:mt-9'
              )}
            >
              {children}
            </Div>
          )}
        </BaseContainer>
      )
    }
  )
)

ContentSimpleLayout.displayName = 'ContentSimpleLayout'

/**
 * Render the content layout component.
 * @param {ContentLayoutProps} props - The component props
 * @param {ContentLayoutRef} ref - The component reference
 * @returns The rendered content layout component
 */
const ContentLayout = forwardRef<ContentLayoutRef, ContentLayoutProps>(
  ({ as: Component = Div, children, ...rest }, ref) => {
    if (!children) {
      return null
    }

    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    )
  }
) as ForwardRefExoticComponent<
  ContentLayoutProps & RefAttributes<ContentLayoutRef>
> &
  ContentLayoutStaticComponents

ContentLayout.displayName = 'ContentLayout'

ContentLayout.Simple = ContentSimpleLayout
ContentLayout.Aside = ContentAsideLayout

export default ContentLayout
