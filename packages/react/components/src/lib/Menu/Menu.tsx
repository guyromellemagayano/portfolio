import React from 'react'

export type TMenuRef = HTMLElement
export type TMenuProps = React.HTMLAttributes<TMenuRef>

/**
 * Render the menu component.
 * @param {TMenuProps} props - The menu component properties
 * @param {TMenuRef} ref - The menu component reference
 * @returns The rendered menu component
 */
const Menu = React.forwardRef<TMenuRef, TMenuProps>(
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
