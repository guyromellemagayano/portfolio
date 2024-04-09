'use client'

import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  FooterProps,
  FooterRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isEmpty } from '@guy-romelle-magayano/react-utils'

import { PagesData } from '@guy-romelle-magayano/portfolio/types/data'

// Dynamic imports
const Footer = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Footer
  )
)
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const P = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.P)
)
const BaseContainerOuter = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Containers/Base').then(
    mod => mod.BaseContainer.Outer
  )
)
const BaseContainerInner = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Containers/Base').then(
    mod => mod.BaseContainer.Inner
  )
)
const NavigationLink = dynamic(
  () =>
    import(
      '@guy-romelle-magayano/portfolio/components/Links/Navigation/NavigationLink'
    )
)

export type FooterLayoutRef = FooterRef
export type FooterLayoutProps = FooterProps & {
  pages: Array<PagesData>
}

/**
 * Render the footer layout component.
 * @param pages - The pages data.
 * @param className - The class name of the footer layout.
 * @param rest - The rest of the footer layout props.
 * @returns The rendered footer layout component.
 */
const FooterLayout = forwardRef<FooterLayoutRef, FooterLayoutProps>(
  async ({ pages, className, ...rest }, ref) => {
    const yearNow = new Date().getFullYear(),
      copyrightText = `${yearNow} Guy Romelle Magayano`

    return (
      <Footer ref={ref} {...rest} className={cn('mt-32', className)}>
        <BaseContainerOuter>
          <Div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
            <BaseContainerInner>
              <Div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <Div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {!isEmpty(pages) &&
                    pages.map((item, index) => (
                      <NavigationLink key={index} href={item.link}>
                        {item.title}
                      </NavigationLink>
                    ))}
                </Div>
                <P className="text-sm text-zinc-600 dark:text-zinc-300">
                  &copy; {copyrightText}
                </P>
              </Div>
            </BaseContainerInner>
          </Div>
        </BaseContainerOuter>
      </Footer>
    )
  }
)

FooterLayout.displayName = 'FooterLayout'

export default FooterLayout
