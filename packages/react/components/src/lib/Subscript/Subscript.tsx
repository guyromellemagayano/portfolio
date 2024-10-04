import React from 'react'

export type TSubscriptRef = HTMLElement
export type TSubscriptProps = React.HTMLAttributes<TSubscriptRef>

/**
 * Render the subscript component
 * @param {TSubscriptProps} props - The subscript component properties
 * @param {TSubscriptRef} ref - The subscript component reference
 * @returns The rendered subscript component
 */
const Subscript = React.forwardRef<TSubscriptRef, TSubscriptProps>(
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
