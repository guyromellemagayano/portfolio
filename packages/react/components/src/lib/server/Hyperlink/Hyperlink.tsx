import { AnchorHTMLAttributes, forwardRef } from 'react'

import dynamic from 'next/dynamic'

export const NextLink = dynamic(() => import('next/link'))

export type HyperlinkRef = HTMLAnchorElement
export type HyperlinkProps = AnchorHTMLAttributes<HyperlinkRef>

/**
 * Render the hyperlink component.
 * @param {HyperlinkProps} props - The hyperlink component properties.
 * @param {HyperlinkRef} ref - The hyperlink component reference.
 * @returns The rendered hyperlink component.
 */
const Hyperlink = forwardRef<HyperlinkRef, HyperlinkProps>((props, ref) => {
  const { href = '#', children, ...rest } = props

  return (
    <a ref={ref} href={href} {...rest}>
      {children}
    </a>
  )
})

Hyperlink.displayName = 'Hyperlink'

export default Hyperlink
