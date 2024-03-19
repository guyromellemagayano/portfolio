'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type MenuRef = HTMLElement
export type MenuProps = HTMLAttributes<MenuRef>

/**
 * Render the menu component.
 * @param children - The children of the menu.
 * @param rest - The rest of the props of the menu.
 * @returns The rendered menu component.
 */
const Menu = forwardRef<MenuRef, MenuProps>(({ children, ...rest }, ref) => {
  return (
    <menu ref={ref} {...rest}>
      {children}
    </menu>
  )
})

Menu.displayName = 'Menu'

export default Menu
