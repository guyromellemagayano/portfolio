import React from 'react'

export type NavigationRef = HTMLElement
export type NavigationProps = React.HTMLAttributes<NavigationRef>

/**
 * Render the navigation component.
 * @param {NavigationProps} props - The navigation component properties
 * @param {NavigationRef} ref - The navigation component reference
 * @returns The rendered navigation component
 */
const Navigation = React.forwardRef<NavigationRef, NavigationProps>(
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
