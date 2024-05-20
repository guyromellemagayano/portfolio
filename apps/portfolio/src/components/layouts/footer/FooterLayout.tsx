'use client'

import { forwardRef, memo } from 'react'

import {
  Div,
  Footer,
  P,
  type FooterProps,
  type FooterRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

import {
  BaseContainer,
  NavigationLink
} from '@guy-romelle-magayano/portfolio/components'
import { type PagesData } from '@guy-romelle-magayano/portfolio/types'

export type FooterLayoutRef = FooterRef
export type FooterLayoutProps = FooterProps & {
  pages: Array<PagesData>
}

/**
 * Render the footer layout component.
 * @param {FooterLayoutProps} props - The props of the footer layout.
 * @param {FooterLayoutRef} ref - The reference of the footer layout.
 * @returns The rendered footer layout component.
 */
const FooterLayout = memo(
  forwardRef<FooterLayoutRef, FooterLayoutProps>(
    ({ pages, className, ...rest }, ref) => {
      const yearNow = new Date().getFullYear(),
        copyrightText = `${yearNow} Guy Romelle Magayano`

      return (
        <Footer {...rest} ref={ref} className={cn('mt-32', className)}>
          <BaseContainer.Outer>
            <Div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
              <BaseContainer.Inner>
                <Div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <Div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {pages &&
                      pages?.length > 0 &&
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
              </BaseContainer.Inner>
            </Div>
          </BaseContainer.Outer>
        </Footer>
      )
    }
  )
)

FooterLayout.displayName = 'FooterLayout'

export default FooterLayout
