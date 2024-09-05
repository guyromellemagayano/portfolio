'use client'

import React from 'react'

export type MenuRef = HTMLElement
export type MenuProps = React.HTMLAttributes<MenuRef>

/**
 * Render the menu component.
 * @param {MenuProps} props - The menu component properties
 * @param {MenuRef} ref - The menu component reference
 * @returns The rendered menu component
 */
const Menu = React.forwardRef<MenuRef, MenuProps>(
  ({ children, ...rest }, ref) => {
    return (
      <menu ref={ref} {...rest}>
        {children}
      </menu>
    )
  }
)

Menu.displayName = 'Menu'

export default Menu
