import { HTMLAttributes, forwardRef } from 'react'

export type HeaderRef = HTMLElement
export type HeaderProps = HTMLAttributes<HeaderRef>

/**
 * Render the header component.
 * @param children - The children of the header.
 * @param rest - The rest of the props of the header.
 * @returns The rendered header component.
 */
const Header = forwardRef<HeaderRef, HeaderProps>(
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
