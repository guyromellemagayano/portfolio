import React from 'react'

export type TOrderedListRef = HTMLOListElement
export type TOrderedListProps = React.OlHTMLAttributes<TOrderedListRef>

/**
 * Render the ordered list component.
 * @param {TOrderedListProps} props - The ordered list component properties
 * @param {TOrderedListRef} ref - The ordered list component reference
 * @returns The rendered ordered list component
 */
const OrderedList = React.forwardRef<TOrderedListRef, TOrderedListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ol ref={ref} {...rest}>
        {children}
      </ol>
    )
  }
)

OrderedList.displayName = 'OrderedList'

export default OrderedList
