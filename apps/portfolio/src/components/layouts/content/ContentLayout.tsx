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
  Heading,
  P,
  Span,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isArrayType } from '@guy-romelle-magayano/react-utils'

import { BaseContainer } from '@guy-romelle-magayano/portfolio/components'

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
 * Render the aside content layout component.
 * @param {ContentLayoutProps} props - The props of the aside content layout.
 * @param {ContentLayoutRef} ref - The reference of the aside content layout.
 * @returns The rendered aside content layout component.
 */
const ContentAsideLayout = memo(
  forwardRef<ContentLayoutRef, ContentLayoutProps>(
    ({ title, intro, children, className, id, ...rest }, ref) => {
      return (
        <Aside {...rest} ref={ref}>
          {title && title?.length > 0 && (
            <Heading
              as="h1"
              className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            >
              {title}
            </Heading>
          )}

          {intro &&
            ((typeof intro === 'string' && intro?.length > 0) ||
              (Array.isArray(intro) && intro?.length > 0)) && (
              <P className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                {Array.isArray(intro)
                  ? intro?.map(
                      (paragraph: string, index: number) =>
                        paragraph && (
                          <Span key={index} className="space-y-7">
                            {paragraph}
                          </Span>
                        )
                    )
                  : intro}
              </P>
            )}

          {children && (
            <Div className={cn('mt-16 sm:mt-20', className)}>{children}</Div>
          )}
        </Aside>
      )
    }
  )
)

ContentAsideLayout.displayName = 'ContentAsideLayout'

/**
 * Render the simple content layout component.
 * @param  {ContentLayoutProps} props - The props of the simple content layout.
 * @param {ContentLayoutRef} ref - The reference of the simple content layout.
 * @returns The rendered simple content layout component.
 */
const ContentSimpleLayout = memo(
  forwardRef<ContentLayoutRef, ContentLayoutProps>(
    ({ title, intro, children, className, ...rest }, ref) => {
      const pathname = usePathname()

      return (
        <BaseContainer
          {...rest}
          ref={ref}
          className={cn('mt-16 sm:mt-32', className)}
        >
          <Div className="w-full max-w-2xl">
            {title && title?.length > 0 && (
              <Heading
                as="h1"
                className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                {title}
              </Heading>
            )}

            {intro &&
              ((typeof intro === 'string' && intro?.length > 0) ||
                (Array.isArray(intro) && intro?.length > 0)) && (
                <P className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                  {isArrayType(intro)
                    ? intro?.map(
                        (paragraph: string, index: number) =>
                          paragraph && (
                            <Span key={index} className="space-y-7">
                              {paragraph}
                            </Span>
                          )
                      )
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
 * @param {ContentLayoutProps} props - The props of the content layout.
 * @param {ContentLayoutRef} ref - The reference of the content layout.
 * @returns The rendered content layout component.
 */
const ContentLayout = forwardRef<ContentLayoutRef, ContentLayoutProps>(
  ({ as: Component = Div, children, ...rest }, ref) => {
    return (
      children && (
        <Component {...rest} ref={ref}>
          {children}
        </Component>
      )
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
