import React from 'react'

export type HyperlinkRef = HTMLAnchorElement
export type HyperlinkProps = React.AnchorHTMLAttributes<HyperlinkRef>

/**
 * Render the hyperlink component
 * @param {HyperlinkProps} props - The hyperlink component properties
 * @param {HyperlinkRef} ref - The hyperlink component reference
 * @returns The rendered hyperlink component
 */
const Hyperlink = React.forwardRef<HyperlinkRef, HyperlinkProps>(
  (props, ref) => {
    const { href = '#', children, ...rest } = props

    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    )
  }
)

Hyperlink.displayName = 'Hyperlink'

export default Hyperlink
