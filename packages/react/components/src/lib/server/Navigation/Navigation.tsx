import { HTMLAttributes, forwardRef } from 'react'

export type NavigationRef = HTMLElement
export type NavigationProps = HTMLAttributes<NavigationRef>

/**
 * Render the navigation component.
 * @param children - The children of the navigation.
 * @param rest - The rest of the props of the navigation.
 * @returns The rendered navigation component.
 */
export const Navigation = forwardRef<NavigationRef, NavigationProps>(
  ({ children, ...rest }, ref) => {
    return (
      <nav ref={ref} {...rest}>
        {children}
      </nav>
    )
  }
)

Navigation.displayName = 'Navigation'

export default Navigation
