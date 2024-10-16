import { forwardRef, memo } from 'react'

import dynamic from 'next/dynamic'

import {
  Nav,
  type TNavigationProps,
  type TNavigationRef
} from '@react-components'

import { type THeaderLayoutProps } from '@portfolio/components'

// Dynamic imports
const NavigationList = dynamic(() =>
  import('@portfolio/components').then(mod => mod.NavigationList)
)
const NavigationListItem = dynamic(() =>
  import('@portfolio/components').then(mod => mod.NavigationListItem)
)

// Map to sort pages based on pre-defined page filter
export const pageFilterMap = (
  dataArr: TDesktopNavigationProps['pageFilter'],
  a: TDesktopNavigationProps['pages'][0],
  b: TDesktopNavigationProps['pages'][0]
): number => {
  const reducedFilter = dataArr.reduce<Record<string, number>>(
    (acc: Record<string, number>, slug: string, index: number) => {
      acc[slug] = index
      return acc
    },
    {}
  )

  return reducedFilter[a.slug] - reducedFilter[b.slug]
}

export type TDesktopNavigationRef = TNavigationRef
export type TDesktopNavigationProps = TNavigationProps & {
  pageFilter: string[]
  pages: THeaderLayoutProps['data']['pages']['links']
}

/**
 * Renders the desktop navigation component.
 * @param {TDesktopNavigationProps} props - The component props
 * @param {TDesktopNavigationRef} ref - The component reference
 * @returns The rendered desktop navigation component
 */
const DesktopNavigation = memo(
  forwardRef<TDesktopNavigationRef, TDesktopNavigationProps>(
    ({ pageFilter, pages, ...rest }, ref) => {
      if (!pages && !pageFilter) return null

      return (
        <Nav ref={ref} {...rest}>
          <NavigationList className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
            {pages
              .filter(({ slug }) => pageFilter.includes(slug))
              .sort((a, b) => pageFilterMap(pageFilter, a, b))
              .map(({ id, link, title, ...rest }) => {
                return (
                  <NavigationListItem key={id} href={link} {...rest}>
                    {title}
                  </NavigationListItem>
                )
              })}
          </NavigationList>
        </Nav>
      )
    }
  )
)

DesktopNavigation.displayName = 'DesktopNavigation'

export default DesktopNavigation
