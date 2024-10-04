import React from 'react'

export type THyperlinkRef = HTMLAnchorElement
export type THyperlinkProps = React.AnchorHTMLAttributes<THyperlinkRef>

/**
 * Render the hyperlink component
 * @param {THyperlinkProps} props - The hyperlink component properties
 * @param {THyperlinkRef} ref - The hyperlink component reference
 * @returns The rendered hyperlink component
 */
const Hyperlink = React.forwardRef<THyperlinkRef, THyperlinkProps>(
  ({ href = '#', children, ...rest }, ref) => {
    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    )
  }
)

Hyperlink.displayName = 'Hyperlink'

export default Hyperlink
