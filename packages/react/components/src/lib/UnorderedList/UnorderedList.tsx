import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type UnorderedListRef = HTMLUListElement
export type UnorderedListProps = HTMLAttributes<UnorderedListRef>

/**
 * Render the unordered list component.
 * @param children - The children of the unordered list.
 * @param rest - The rest of the props of the unordered list.
 * @returns The rendered unordered list component.
 */
const UnorderedList = forwardRef<UnorderedListRef, UnorderedListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ul ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </ul>
    )
  }
)

UnorderedList.displayName = 'UnorderedList'

export default UnorderedList
