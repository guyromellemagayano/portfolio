import React from 'react'

export type TUnorderedListRef = HTMLUListElement
export type TUnorderedListProps = React.HTMLAttributes<TUnorderedListRef>

/**
 * Render the unordered list component.
 * @param {TUnorderedListProps} props - The unordered list component properties
 * @param {TUnorderedListRef} ref - The unordered list component reference
 * @returns The rendered unordered list component
 */
const UnorderedList = React.forwardRef<TUnorderedListRef, TUnorderedListProps>(
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
