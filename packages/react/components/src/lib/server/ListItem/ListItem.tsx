import { LiHTMLAttributes, forwardRef } from 'react'

export type ListItemRef = HTMLLIElement
export type ListItemProps = LiHTMLAttributes<ListItemRef>

/**
 * Render the list item component.
 * @param children - The children of the list item.
 * @param rest - The rest of the props of the list item.
 * @returns The rendered list item component.
 */
export const ListItem = forwardRef<ListItemRef, ListItemProps>(
  ({ children, ...rest }, ref) => {
    return (
      <li ref={ref} {...rest}>
        {children}
      </li>
    )
  }
)

ListItem.displayName = 'ListItem'

export default ListItem
