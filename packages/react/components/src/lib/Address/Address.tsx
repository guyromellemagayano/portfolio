import React from 'react'

export type TAddressRef = HTMLElement
export type TAddressProps = React.HTMLAttributes<TAddressRef>

/**
 * Render the address component.
 * @param {TAddressProps} props - The address component properties
 * @param {TAddressRef} ref - The address component reference
 * @returns The rendered address component
 */
const Address = React.forwardRef<TAddressRef, TAddressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <address ref={ref} {...rest}>
        {children}
      </address>
    )
  }
)

Address.displayName = 'Address'

export default Address
