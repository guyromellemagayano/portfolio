import React from 'react'

export type FooterRef = HTMLElement
export type FooterProps = React.HTMLAttributes<FooterRef>

/**
 * Render the footer component
 * @param {FooterProps} props - The footer component properties
 * @param {FooterRef} ref - The footer component reference
 * @returns The rendered footer component
 */
const Footer = React.forwardRef<FooterRef, FooterProps>(
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
