import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  SectionProps,
  SectionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

// Dynamic imports
const Heading = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Heading
  )
)
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const Section = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Section
  )
)

export type SectionLayoutRef = SectionRef
export type SectionLayoutProps = SectionProps & {
  title?: string
  decorate?: boolean
}

/**
 * Renders the section layout component.
 * @param title - The title of the section.
 * @param decorate - The decoration of the section.
 * @param className - The class name of the section.
 * @param children - The children of the section.
 * @param rest - The rest of the props.
 * @returns The rendered section layout component.
 */
const SectionLayout = forwardRef<SectionLayoutRef, SectionLayoutProps>(
  ({ title, decorate, className, children, ...rest }, ref) => {
    return (
      (title || children) && (
        <Section
          ref={ref}
          {...rest}
          className={cn(
            decorate &&
              'md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40',
            className
          )}
        >
          <Div className="md:grid md:grid-cols-4 md:items-baseline">
            {title && (
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
    )
  }
)

SectionLayout.displayName = 'SectionLayout'

export default SectionLayout
