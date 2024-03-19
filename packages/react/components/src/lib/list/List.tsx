'use client'

import { LiHTMLAttributes, forwardRef } from 'react'

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
    <li ref={ref} {...rest}>
      {children}
    </li>
  )
})

List.displayName = 'List'

export default List
