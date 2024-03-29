import {
  ElementType,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef
} from 'react'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'
import { CommonComponentsProps } from '@guy-romelle-magayano/react-components/types'

import {
  cn,
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import { BaseContainer } from '@guy-romelle-magayano/portfolio/components/Containers/Base'

// Dynamic imports
const Heading = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Heading
  )
)
const Aside = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Aside)
)
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const P = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.P)
)
const Span = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Span)
)

export type ContentLayoutRef = DivisionRef
export type ContentLayoutProps = DivisionProps &
  CommonComponentsProps & {
    as?: ElementType
    title?: string
    intro?: string[] | string
  }

type ContentLayoutStaticComponents = {
  Simple: typeof ContentSimpleLayout
  Aside: typeof ContentAsideLayout
}

/**
 * Render the aside content layout component.
 * @param title - The title of the aside content layout.
 * @param intro - The introduction of the aside content layout.
 * @param children - The children of the aside content layout.
 * @param rest - The rest of the props of the aside content layout.
 * @returns The rendered aside content layout component.
 */
const ContentAsideLayout = forwardRef<ContentLayoutRef, ContentLayoutProps>(
  ({ title, intro, className, children, ...rest }, ref) => {
    return (
      <Aside ref={ref} {...rest}>
        {!isEmpty(title) && (
          <Heading
            as="h1"
            className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
          >
            {title}
          </Heading>
        )}

        {!isEmpty(intro) && (
          <P className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {isArrayType(intro)
              ? intro.map(
                  (paragraph: string, index: number) =>
                    !isEmpty(paragraph) &&
                    isStringType(paragraph) && (
                      <Span key={index} className="space-y-7">
                        {paragraph}
                      </Span>
                    )
                )
              : intro}
          </P>
        )}

        {!isEmpty(children) && (
          <Div className={cn('mt-16 sm:mt-20', className)}>{children}</Div>
        )}
      </Aside>
    )
  }
)

ContentAsideLayout.displayName = 'ContentAsideLayout'

/**
 * Render the simple content layout component.
 * @param title - The title of the simple content layout.
 * @param intro - The introduction of the simple content layout.
 * @param children - The children of the simple content layout.
 * @param rest - The rest of the props of the simple content layout.
 * @returns The rendered simple content layout component.
 */
const ContentSimpleLayout = forwardRef<ContentLayoutRef, ContentLayoutProps>(
  ({ title, intro, className, children, ...rest }, ref) => {
    const pathname = usePathname()

    return (
      <BaseContainer ref={ref} className="mt-9" {...rest}>
        <Div className="max-w-2xl">
          {!isEmpty(title) && (
            <Heading
              as="h1"
              className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            >
              {title}
            </Heading>
          )}

          {!isEmpty(intro) && (
            <P className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              {isArrayType(intro)
                ? intro.map(
                    (paragraph: string, index: number) =>
                      !isEmpty(paragraph) &&
                      isStringType(paragraph) && (
                        <Span key={index} className="space-y-7">
                          {paragraph}
                        </Span>
                      )
                  )
                : intro}
            </P>
          )}
        </Div>

        {!isEmpty(children) && (
          <Div className={cn(pathname !== '/' && 'mt-16 sm:mt-20', className)}>
            {children}
          </Div>
        )}
      </BaseContainer>
    )
  }
)

ContentSimpleLayout.displayName = 'ContentSimpleLayout'

/**
 * Render the content layout component.
 * @param as - The element type of the content layout.
 * @param title - The title of the content layout.
 * @param intro - The introduction of the content layout.
 * @param layout - The layout of the content layout.
 * @param children - The children of the content layout.
 * @param rest - The rest of the props of the content layout.
 * @returns The rendered content layout component.
 */
const ContentLayout = forwardRef<ContentLayoutRef, ContentLayoutProps>(
  ({ as: Component = Div, children, ...rest }, ref) => {
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
