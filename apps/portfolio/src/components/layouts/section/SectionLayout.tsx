import { forwardRef, memo } from 'react'

import {
  Div,
  Heading,
  Section,
  type TSectionProps,
  type TSectionRef
} from '@react-components'

import { cn } from '@react-utils'

export type SectionLayoutRef = TSectionRef
export type SectionLayoutProps = TSectionProps & {
  title?: string
  decorate?: boolean
}

/**
 * Renders the section layout component.
 * @param {SectionLayoutProps} props - The component props
 * @param {SectionLayoutRef} ref - The component reference
 * @returns The rendered section layout component
 */
const SectionLayout = memo(
  forwardRef<SectionLayoutRef, SectionLayoutProps>(
    ({ title, decorate, className, children, ...rest }, ref) => {
      if (!title && !children) return null

      return (
        <Section
          ref={ref}
          className={cn(
            decorate &&
              'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40',
            className
          )}
          {...rest}
        >
          <Div className={cn('md:grid md:grid-cols-4 md:items-baseline')}>
            {title && (
              <Heading
                as="h2"
                className={cn(
                  'text-sm font-semibold text-zinc-400 dark:text-zinc-500'
                )}
              >
                {title}
              </Heading>
            )}

            {children && (
              <Div
                className={cn(
                  'group relative flex flex-col items-start md:col-span-3'
                )}
              >
                {children}
              </Div>
            )}
          </Div>
        </Section>
      )
    }
  )
)

SectionLayout.displayName = 'SectionLayout'

export default SectionLayout
