import { OlHTMLAttributes, forwardRef } from 'react'

export type OrderedListRef = HTMLOListElement
export type OrderedListProps = OlHTMLAttributes<OrderedListRef>

/**
 * Render the ordered list component.
 * @param {OrderedListProps} props - The ordered list component properties.
 * @param {OrderedListRef} ref - The ordered list component reference.
 * @returns The rendered ordered list component.
 */
const OrderedList = forwardRef<OrderedListRef, OrderedListProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <ol ref={ref} {...rest}>
        {children}
      </ol>
    )
  }
)

OrderedList.displayName = 'OrderedList'

export default OrderedList
