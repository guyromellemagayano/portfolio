import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type NavRef = HTMLElement
export type NavProps = HTMLAttributes<NavRef>

/**
 * Render the nav component.
 * @param children - The children of the nav.
 * @param rest - The rest of the props of the nav.
 * @returns The rendered nav component.
 */
const Nav = forwardRef<NavRef, NavProps>(({ children, ...rest }, ref) => {
  return (
    <nav ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </nav>
  )
})

Nav.displayName = 'Nav'

export default Nav