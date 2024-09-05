import React from 'react'

export type OrderedListRef = HTMLOListElement
export type OrderedListProps = React.OlHTMLAttributes<OrderedListRef>

/**
 * Render the ordered list component.
 * @param {OrderedListProps} props - The ordered list component properties
 * @param {OrderedListRef} ref - The ordered list component reference
 * @returns The rendered ordered list component
 */
const OrderedList = React.forwardRef<OrderedListRef, OrderedListProps>(
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
