import React from 'react'

export type TNavigationRef = HTMLElement
export type TNavigationProps = React.HTMLAttributes<TNavigationRef>

/**
 * Render the navigation component.
 * @param {TNavigationProps} props - The navigation component properties
 * @param {TNavigationRef} ref - The navigation component reference
 * @returns The rendered navigation component
 */
const Navigation = React.forwardRef<TNavigationRef, TNavigationProps>(
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
