import React from 'react'

export type THeaderRef = HTMLElement
export type THeaderProps = React.HTMLAttributes<THeaderRef>

/**
 * Render the header component.
 * @param {THeaderProps} props - The header component properties
 * @param {THeaderRef} ref - The header component reference
 * @returns The rendered header component
 */
const Header = React.forwardRef<THeaderRef, THeaderProps>(
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
