import { HTMLAttributes, forwardRef } from 'react'

export type NavigationRef = HTMLElement
export type NavigationProps = HTMLAttributes<NavigationRef>

/**
 * Render the navigation component.
 * @param {NavigationProps} props - The navigation component properties.
 * @param {NavigationRef} ref - The navigation component reference.
 * @returns The rendered navigation component.
 */
const Navigation = forwardRef<NavigationRef, NavigationProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <nav ref={ref} {...rest}>
      {children}
    </nav>
  )
})

Navigation.displayName = 'Navigation'

export default Navigation
