'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type MenuRef = HTMLElement
export type MenuProps = HTMLAttributes<MenuRef>

/**
 * Render the menu component.
 * @param {MenuProps} props - The menu component properties.
 * @param {MenuRef} ref - The menu component reference.
 * @returns The rendered menu component.
 */
const Menu = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <menu ref={ref} {...rest}>
      {children}
    </menu>
  )
})

Menu.displayName = 'Menu'

export default Menu
