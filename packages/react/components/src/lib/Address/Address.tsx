import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type AddressRef = HTMLElement
export type AddressProps = HTMLAttributes<AddressRef>

/**
 * Render the address component.
 * @param children - The children of the address.
 * @param rest - The rest of the props of the address.
 * @returns The rendered address component.
 */
const Address = forwardRef<AddressRef, AddressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <address ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </address>
    )
  }
)

Address.displayName = 'Address'

export default Address