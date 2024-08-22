import { forwardRef, memo } from 'react'

import {
  Nav,
  type NavigationProps,
  type NavigationRef
} from '@guy-romelle-magayano/react-components/server'

import { isEmpty, isValidData } from '@guy-romelle-magayano/react-utils'

import {
  NavigationList,
  NavigationListItem
} from '@guy-romelle-magayano/portfolio/components'
import { PagesData } from '@guy-romelle-magayano/portfolio/types'

export type DesktopNavigationRef = NavigationRef
export type DesktopNavigationProps = NavigationProps & {
  data: Array<PagesData>
}

/**
 * Renders the desktop navigation component.
 * @param {DesktopNavigationProps} props - The component props
 * @param {DesktopNavigationRef} ref - The component reference
 * @returns The rendered JSX component.
 */
const DesktopNavigation = memo(
  forwardRef<DesktopNavigationRef, DesktopNavigationProps>(
    ({ data, ...rest }, ref) => {
      const validData =
        data?.filter((item): item is PagesData =>
          isValidData(item, 'object')
        ) || null

      if (!validData || validData?.length === 0) {
        return null
      }

      return (
        <Nav ref={ref} {...rest}>
          <NavigationList className="dark:ring-white/10' flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200">
            {validData
              .filter(({ link, title }) => !isEmpty(link) && !isEmpty(title))
              .map(({ id, link, title }) => {
                return (
                  <NavigationListItem key={id} href={link}>
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
