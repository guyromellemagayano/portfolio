'use client'

import {
  type ElementType,
  type ForwardRefExoticComponent,
  type RefAttributes,
  forwardRef,
  memo
} from 'react'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import {
  Div,
  Heading,
  P,
  Span,
  type TDivisionProps,
  type TDivisionRef
} from '@react-components'

import { cn } from '@react-utils'

// Dynamic imports
const BaseContainer = dynamic(() =>
  import('@portfolio/components').then(mod => mod.BaseContainer)
)

export type TContentLayoutRef = TDivisionRef
export type TContentLayoutProps = TDivisionProps & {
  as?: ElementType
  heading?: string | null
  description?: (string | null)[] | null
}
export type TContentLayoutStaticComponents = {
  Simple: typeof ContentSimpleLayout
  Aside: typeof ContentAsideLayout
}

/**
 * Render the content aside layout component.
 * @param {TContentLayoutProps} props - The component props
 * @param {TContentLayoutRef} ref - The component reference
 * @returns The rendered content aside layout component
 */
export const ContentAsideLayout = memo(
  forwardRef<TContentLayoutRef, TContentLayoutProps>(
    ({ heading, description, children, className, ...rest }, ref) => {
      if (!heading && !description) return null

      return (
        <BaseContainer
          ref={ref}
          className={cn('mt-16 sm:mt-32', className)}
          {...rest}
        >
          <Div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
            <Div className="lg:pl-20">
              <Div className="max-w-xs px-2.5 lg:max-w-none">
                <Div className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800" />
              </Div>
            </Div>
            <Div className="lg:order-first lg:row-span-2">
              {heading && (
                <Heading
                  as="h1"
                  className="mb-8 text-3xl font-bold tracking-tighter text-zinc-800 sm:text-5xl dark:text-zinc-100"
                >
                  {heading}
                </Heading>
              )}

              {description && (
                <Div className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                  <P className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {Array.isArray(description)
                      ? description?.map((paragraph, index) => (
                          <Span key={index}>{paragraph}</Span>
                        ))
                      : description}
                  </P>
                </Div>
              )}

              {children && (
                <Div className={cn('mt-9 sm:mt-9', className)} {...rest}>
                  {children}
                </Div>
              )}
            </Div>
          </Div>
        </BaseContainer>
      )
    }
  )
)

ContentAsideLayout.displayName = 'ContentAsideLayout'

/**
 * Render the content simple layout component.
 * @param {TContentLayoutProps} props - The component props
 * @param {TContentLayoutRef} ref - The component reference
 * @returns The rendered content simple layout component
 */
export const ContentSimpleLayout = memo(
  forwardRef<TContentLayoutRef, TContentLayoutProps>(
    ({ heading, description, children, className, ...rest }, ref) => {
      const pathname = usePathname()

      if (!heading && !description) return null

      return (
        <BaseContainer
          ref={ref}
          className={cn('mt-16 sm:mt-32', className)}
          {...rest}
        >
          <Div className="w-full max-w-3xl">
            {heading && (
              <Heading
                as="h1"
                className="mb-8 text-3xl font-bold tracking-tighter text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                {heading}
              </Heading>
            )}

            {description && (
              <P className="mt-6 flex flex-col space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                {Array.isArray(description)
                  ? description?.map((paragraph, index) => (
                      <Span key={index}>{paragraph}</Span>
                    ))
                  : description}
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
 * @param {TContentLayoutProps} props - The component props
 * @param {TContentLayoutRef} ref - The component reference
 * @returns The rendered content layout component
 */
const ContentLayout = forwardRef<TContentLayoutRef, TContentLayoutProps>(
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
  TContentLayoutProps & RefAttributes<TContentLayoutRef>
> &
  TContentLayoutStaticComponents

ContentLayout.displayName = 'ContentLayout'

ContentLayout.Simple = ContentSimpleLayout
ContentLayout.Aside = ContentAsideLayout

export default ContentLayout
