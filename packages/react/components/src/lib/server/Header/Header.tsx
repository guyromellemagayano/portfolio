import { HTMLAttributes, forwardRef } from 'react'

export type HeaderRef = HTMLElement
export type HeaderProps = HTMLAttributes<HeaderRef>

/**
 * Render the header component.
 * @param {HeaderProps} props - The header component properties.
 * @param {HeaderRef} ref - The header component reference.
 * @returns The rendered header component.
 */
const Header = forwardRef<HeaderRef, HeaderProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <header ref={ref} {...rest}>
      {children}
    </header>
  )
})

Header.displayName = 'Header'

export default Header
