import React from 'react'

export type TListItemRef = HTMLLIElement
export type TListItemProps = React.LiHTMLAttributes<TListItemRef>

/**
 * Render the list item component.
 * @param {TListItemProps} props - The list item component properties
 * @param {TListItemRef} ref - The list item component reference
 * @returns The rendered list item component
 */
const ListItem = React.forwardRef<TListItemRef, TListItemProps>(
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
