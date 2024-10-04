import { forwardRef, memo } from 'react'

import {
  Nav,
  type TNavigationProps,
  type TNavigationRef
} from '@react-components'

import { NavigationList, NavigationListItem } from '@portfolio/components'
import { PagesData } from '@portfolio/types'

export type DesktopNavigationRef = TNavigationRef
export type DesktopNavigationProps = TNavigationProps & {
  data: Array<PagesData>
}

/**
 * Renders the desktop navigation component.
 * @param {DesktopNavigationProps} props - The component props
 * @param {DesktopNavigationRef} ref - The component reference
 * @returns The rendered desktop navigation component
 */
const DesktopNavigation = memo(
  forwardRef<DesktopNavigationRef, DesktopNavigationProps>(
    ({ data, ...rest }, ref) => {
      if (!data) return null

      return (
        <Nav ref={ref} {...rest}>
          <NavigationList className="dark:ring-white/10' flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
            {data.map(({ id, link, title }) => {
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

export default DesktopNavigation
