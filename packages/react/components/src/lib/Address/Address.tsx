import React from 'react'

export type AddressRef = HTMLElement
export type AddressProps = React.HTMLAttributes<AddressRef>

/**
 * Render the address component.
 * @param {AddressProps} props - The address component properties
 * @param {AddressRef} ref - The address component reference
 * @returns The rendered address component
 */
const Address = React.forwardRef<AddressRef, AddressProps>(
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
