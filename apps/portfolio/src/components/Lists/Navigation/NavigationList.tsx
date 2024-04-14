import { forwardRef } from 'react'

import {
  Ul,
  UnorderedListProps,
  UnorderedListRef
} from '@guy-romelle-magayano/react-components/server'

import { isEmpty } from '@guy-romelle-magayano/react-utils'

export type NavigationListRef = UnorderedListRef
export type NavigationListProps = UnorderedListProps

/**
 * Renders the navigation list component.
 * @param children - The children of the navigation list.
 * @param rest - The rest of the props of the navigation list.
 * @returns The rendered navigation list component.
 */
const NavigationList = forwardRef<NavigationListRef, NavigationListProps>(
  ({ children, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <Ul ref={ref} {...rest}>
          {children}
        </Ul>
      )
    )
  }
)

NavigationList.displayName = 'NavigationList'

export default NavigationList
