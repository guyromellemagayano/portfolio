import { HTMLAttributes, forwardRef } from 'react'

export type AddressRef = HTMLElement
export type AddressProps = HTMLAttributes<AddressRef>

/**
 * Render the address component.
 * @param {AddressProps} props - The address component properties.
 * @param {AddressRef} ref - The address component reference.
 * @returns The rendered address component.
 */
const Address = forwardRef<AddressRef, AddressProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <address ref={ref} {...rest}>
      {children}
    </address>
  )
})

Address.displayName = 'Address'

export default Address
