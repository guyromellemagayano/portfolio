import { HTMLAttributes, forwardRef } from 'react'

export type FooterRef = HTMLElement
export type FooterProps = HTMLAttributes<FooterRef>

/**
 * Render the footer component.
 * @param {FooterProps} props - The footer component properties.
 * @param {FooterRef} ref - The footer component reference.
 * @returns The rendered footer component.
 */
const Footer = forwardRef<FooterRef, FooterProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <footer ref={ref} {...rest}>
      {children}
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
