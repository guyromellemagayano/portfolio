'use client'

import { OlHTMLAttributes, forwardRef } from 'react'

export type OrderedListRef = HTMLOListElement
export type OrderedListProps = OlHTMLAttributes<OrderedListRef>

/**
 * Render the ordered list component.
 * @param children - The children of the ordered list.
 * @param rest - The rest of the props of the ordered list.
 * @returns The rendered ordered list component.
 */
export const OrderedList = forwardRef<OrderedListRef, OrderedListProps>(
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
