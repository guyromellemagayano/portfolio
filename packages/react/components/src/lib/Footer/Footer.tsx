import React from 'react'

export type TFooterRef = HTMLElement
export type TFooterProps = React.HTMLAttributes<TFooterRef>

/**
 * Render the footer component
 * @param {TFooterProps} props - The footer component properties
 * @param {TFooterRef} ref - The footer component reference
 * @returns The rendered footer component
 */
const Footer = React.forwardRef<TFooterRef, TFooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <footer ref={ref} {...rest}>
        {children}
      </footer>
    )
  }
)

Footer.displayName = 'Footer'

export default Footer
