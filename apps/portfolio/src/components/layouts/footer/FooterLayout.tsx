import { forwardRef, memo } from 'react'

import dayjs from 'dayjs'
import dynamic from 'next/dynamic'

import {
  Div,
  Footer,
  P,
  type TFooterProps,
  type TFooterRef
} from '@react-components'

import { cn } from '@react-utils'

import { pageFilterMap } from '@portfolio/components'
import { navPageFilter } from '@portfolio/configs'
import { commonData } from '@portfolio/data'
import type { PagesDataQuery } from '@portfolio/graphql'

// Dynamic imports
const BaseContainerInner = dynamic(() =>
  import('@portfolio/components').then(mod => mod.BaseContainer.Inner)
)
const BaseContainerOuter = dynamic(() =>
  import('@portfolio/components').then(mod => mod.BaseContainer.Outer)
)
const NavigationLink = dynamic(() =>
  import('@portfolio/components').then(mod => mod.NavigationLink)
)

export type TFooterLayoutRef = TFooterRef
export type TFooterLayoutProps = TFooterProps & {
  data: PagesDataQuery
}

/**
 * Render the footer layout component.
 * @param {TFooterLayoutProps} props - The component props
 * @param {TFooterLayoutRef} ref - The component reference
 * @returns The rendered footer layout component
 */
const FooterLayout = memo(
  forwardRef<TFooterLayoutRef, TFooterLayoutProps>(
    ({ data, className, ...rest }, ref) => {
      const yearNow = dayjs().year()
      const copyrightText = `${yearNow} ${data?.common?.siteName || commonData.siteName}`

      return (
        <Footer ref={ref} className={cn('mt-32', className)} {...rest}>
          <BaseContainerOuter>
            <Div className="mx-auto w-full max-w-2xl border-t border-zinc-300 pb-16 pt-10 lg:max-w-4xl dark:border-zinc-700">
              <BaseContainerInner className="lg:px-4">
                <Div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <Div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {data?.pages?.links
                      ?.filter(({ slug }) =>
                        navPageFilter.footer.includes(slug)
                      )
                      ?.sort((a, b) =>
                        pageFilterMap(navPageFilter.footer, a, b)
                      )
                      ?.map(({ id, title, link, ...rest }) => (
                        <NavigationLink key={id} href={link} {...rest}>
                          {title}
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
)

FooterLayout.displayName = 'FooterLayout'

export default FooterLayout
