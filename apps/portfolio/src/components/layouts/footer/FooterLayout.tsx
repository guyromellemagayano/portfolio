'use client'

import { forwardRef, memo } from 'react'

import {
  Div,
  Footer,
  P,
  type FooterProps,
  type FooterRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isValidData } from '@guy-romelle-magayano/react-utils'

import {
  BaseContainer,
  NavigationLink
} from '@guy-romelle-magayano/portfolio/components'
import { type PagesData } from '@guy-romelle-magayano/portfolio/types'

export type FooterLayoutRef = FooterRef
export type FooterLayoutProps = FooterProps & {
  data: PagesData[]
}

/**
 * Render the footer layout component.
 * @param {FooterLayoutProps} props - The component props
 * @param {FooterLayoutRef} ref - The component reference
 * @returns The rendered JSX element
 */
const FooterLayout = memo(
  forwardRef<FooterLayoutRef, FooterLayoutProps>(
    ({ data, className, ...rest }, ref) => {
      const yearNow = new Date().getFullYear()
      const copyrightText = `${yearNow} Guy Romelle Magayano`

      const validData =
        data?.filter((item): item is PagesData =>
          isValidData(item, 'object')
        ) || null

      return (
        <Footer ref={ref} className={cn('mt-32', className)} {...rest}>
          <BaseContainer.Outer>
            <Div className="mx-auto w-full max-w-2xl border-t border-zinc-300 pb-16 pt-10 lg:max-w-4xl dark:border-zinc-700">
              <BaseContainer.Inner className="lg:px-4">
                <Div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <Div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {validData &&
                      data.map(({ id, title, link, ...rest }) => (
                        <NavigationLink key={id} href={link} {...rest}>
                          {title}
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
