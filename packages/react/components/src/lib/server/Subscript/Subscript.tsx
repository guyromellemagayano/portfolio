import { HTMLAttributes, forwardRef } from 'react'

export type SubscriptRef = HTMLElement
export type SubscriptProps = HTMLAttributes<SubscriptRef>

/**
 * Render the subscript component.
 * @param {SubscriptProps} props - The subscript component properties.
 * @param {SubscriptRef} ref - The subscript component reference.
 * @returns The rendered subscript component.
 */
const Subscript = forwardRef<SubscriptRef, SubscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sub ref={ref} {...rest}>
        {children}
      </sub>
    )
  }
)

Subscript.displayName = 'Subscript'

export default Subscript
