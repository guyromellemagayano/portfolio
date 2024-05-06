import { forwardRef, memo } from 'react'

import {
  Nav,
  type NavigationProps,
  type NavigationRef
} from '@guy-romelle-magayano/react-components/server'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import { NavigationListItem } from '@guy-romelle-magayano/portfolio/components/lists/items/navigation'
import { NavigationList } from '@guy-romelle-magayano/portfolio/components/lists/navigation'
import { PagesData } from '@guy-romelle-magayano/portfolio/types'

export type DesktopNavigationRef = NavigationRef
export type DesktopNavigationProps = NavigationProps & {
  menu: Array<PagesData>
}

/**
 * Renders the desktop navigation component.
 * @param menu - The menu data.
 * @param rest - The rest of the desktop navigation props.
 * @returns The rendered desktop navigation component.
 */
const DesktopNavigation = memo(
  forwardRef<DesktopNavigationRef, DesktopNavigationProps>(
    ({ menu, ...rest }, ref) => {
      return (
        !isEmpty(menu) &&
        isArrayType(menu) && (
          <Nav ref={ref} {...rest}>
            <NavigationList className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
              {menu?.map(
                ({ link, title }, index: number) =>
                  !isEmpty(link) &&
                  isStringType(link) &&
                  !isEmpty(title) &&
                  isStringType(title) && (
                    <NavigationListItem key={index} href={link}>
                      {title}
                    </NavigationListItem>
                  )
              )}
            </NavigationList>
          </Nav>
        )
      )
    }
  )
)

DesktopNavigation.displayName = 'DesktopNavigation'

export default DesktopNavigation
