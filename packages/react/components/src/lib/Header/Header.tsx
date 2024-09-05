import React from 'react'

export type HeaderRef = HTMLElement
export type HeaderProps = React.HTMLAttributes<HeaderRef>

/**
 * Render the header component.
 * @param {HeaderProps} props - The header component properties
 * @param {HeaderRef} ref - The header component reference
 * @returns The rendered header component
 */
const Header = React.forwardRef<HeaderRef, HeaderProps>(
  ({ children, ...rest }, ref) => {
    return (
      <header ref={ref} {...rest}>
        {children}
      </header>
    )
  }
)

Header.displayName = 'Header'

export default Header
