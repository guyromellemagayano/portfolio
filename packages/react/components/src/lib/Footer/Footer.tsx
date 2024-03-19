'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type FooterRef = HTMLElement
export type FooterProps = HTMLAttributes<FooterRef>

/**
 * Render the footer component.
 * @param children - The children of the footer.
 * @param rest - The rest of the props of the footer.
 * @returns The rendered footer component.
 */
const Footer = forwardRef<FooterRef, FooterProps>(
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
