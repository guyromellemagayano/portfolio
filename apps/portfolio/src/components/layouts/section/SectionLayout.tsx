import { forwardRef } from 'react'

import {
  Div,
  Heading,
  Section,
  SectionProps,
  SectionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type SectionLayoutRef = SectionRef
export type SectionLayoutProps = SectionProps & {
  title?: string
  decorate?: boolean
}

/**
 * Renders the section layout component.
 * @param {SectionLayoutProps} props - The props of the section layout.
 * @param {SectionLayoutRef} ref - The reference of the section layout.
 * @returns The rendered section layout component.
 */
const SectionLayout = forwardRef<SectionLayoutRef, SectionLayoutProps>(
  ({ title, decorate, className, children, ...rest }, ref) => {
    return (
      <Section
        {...rest}
        ref={ref}
        className={cn(
          decorate &&
            'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40',
          className
        )}
      >
        <Div className="md:grid md:grid-cols-4 md:items-baseline">
          {title && title?.length > 0 && (
            <Heading
              as="h2"
              className="text-sm font-semibold text-zinc-400 dark:text-zinc-500"
            >
              {title}
            </Heading>
          )}

          {children && (
            <Div className="group relative flex flex-col items-start md:col-span-3">
              {children}
            </Div>
          )}
        </Div>
      </Section>
    )
  }
)

SectionLayout.displayName = 'SectionLayout'

export default SectionLayout
