import { LiHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type ListRef = HTMLLIElement
export type ListProps = LiHTMLAttributes<ListRef>

/**
 * Render the list component.
 * @param children - The children of the list.
 * @param rest - The rest of the props of the list.
 * @returns The rendered list component.
 */
const List = forwardRef<ListRef, ListProps>(({ children, ...rest }, ref) => {
  return (
    <li ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </li>
  )
})

List.displayName = 'List'

export default List
