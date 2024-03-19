'use client'

import { HTMLAttributes, forwardRef } from 'react'

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
    <nav ref={ref} {...rest}>
      {children}
    </nav>
  )
})

Nav.displayName = 'Nav'

export default Nav
