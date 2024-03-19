import { OlHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type OrderedListRef = HTMLOListElement
export type OrderedListProps = OlHTMLAttributes<OrderedListRef>

/**
 * Render the ordered list component.
 * @param children - The children of the ordered list.
 * @param rest - The rest of the props of the ordered list.
 * @returns The rendered ordered list component.
 */
const OrderedList = forwardRef<OrderedListRef, OrderedListProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ol ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </ol>
    )
  }
)

OrderedList.displayName = 'OrderedList'

export default OrderedList
