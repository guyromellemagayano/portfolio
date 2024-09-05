import React from 'react'

export type ListItemRef = HTMLLIElement
export type ListItemProps = React.LiHTMLAttributes<ListItemRef>

/**
 * Render the list item component.
 * @param {ListItemProps} props - The list item component properties
 * @param {ListItemRef} ref - The list item component reference
 * @returns The rendered list item component
 */
const ListItem = React.forwardRef<ListItemRef, ListItemProps>(
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
