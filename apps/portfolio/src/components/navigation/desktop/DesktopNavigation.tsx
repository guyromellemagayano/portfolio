import { forwardRef, memo } from 'react'

import {
  Nav,
  type NavigationProps,
  type NavigationRef
} from '@guy-romelle-magayano/react-components/server'

import {
  NavigationList,
  NavigationListItem
} from '@guy-romelle-magayano/portfolio/components'
import { PagesData } from '@guy-romelle-magayano/portfolio/types'

export type DesktopNavigationRef = NavigationRef
export type DesktopNavigationProps = NavigationProps & {
  menu: Array<PagesData>
}

/**
 * Renders the desktop navigation component.
 * @param {DesktopNavigationProps} props - The properties to render the desktop navigation component.
 * @param {DesktopNavigationRef} ref - The reference of the desktop navigation component.
 * @returns The rendered desktop navigation component.
 */
const DesktopNavigation = memo(
  forwardRef<DesktopNavigationRef, DesktopNavigationProps>(
    ({ menu, ...rest }, ref) => {
      return (
        <Nav {...rest} ref={ref}>
          {menu && menu?.length > 0 && (
            <NavigationList className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
              {menu.map(
                ({ link, title }, index: number) =>
                  link &&
                  link?.length > 0 &&
                  title &&
                  title?.length > 0 && (
                    <NavigationListItem key={index} href={link}>
                      {title}
                    </NavigationListItem>
                  )
              )}
            </NavigationList>
          )}
        </Nav>
      )
    }
  )
)

DesktopNavigation.displayName = 'DesktopNavigation'

export default DesktopNavigation
