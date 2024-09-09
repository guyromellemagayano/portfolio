import { forwardRef } from 'react'

import {
  Ul,
  type UnorderedListProps,
  type UnorderedListRef
} from '@react-components'

export type NavigationListRef = UnorderedListRef
export type NavigationListProps = UnorderedListProps

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
