import React from 'react'

export type UnorderedListRef = HTMLUListElement
export type UnorderedListProps = React.HTMLAttributes<UnorderedListRef>

/**
 * Render the unordered list component.
 * @param {UnorderedListProps} props - The unordered list component properties
 * @param {UnorderedListRef} ref - The unordered list component reference
 * @returns The rendered unordered list component
 */
const UnorderedList = React.forwardRef<UnorderedListRef, UnorderedListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ul ref={ref} {...rest}>
        {children}
      </ul>
    )
  }
)

UnorderedList.displayName = 'UnorderedList'

export default UnorderedList
