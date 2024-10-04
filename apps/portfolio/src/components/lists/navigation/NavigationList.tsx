import { forwardRef } from 'react'

import {
  Ul,
  type TUnorderedListProps,
  type TUnorderedListRef
} from '@react-components'

export type NavigationListRef = TUnorderedListRef
export type NavigationListProps = TUnorderedListProps

/**
 * Renders the navigation list component.
 * @param {NavigationListProps} props - The properties to render the navigation list component.
 * @param {NavigationListRef} ref - The reference of the navigation list component.
 * @returns The rendered navigation list component.
 */
const NavigationList = forwardRef<NavigationListRef, NavigationListProps>(
  ({ children, ...rest }, ref) => {
    return (
      children && (
        <Ul {...rest} ref={ref}>
          {children}
        </Ul>
      )
    )
  }
)

NavigationList.displayName = 'NavigationList'

export default NavigationList
