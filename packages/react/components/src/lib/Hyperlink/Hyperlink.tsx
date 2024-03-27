'use client'

import { AnchorHTMLAttributes, forwardRef } from 'react'

import dynamic from 'next/dynamic'

export const NextLink = dynamic(() => import('next/link'))

export type HyperlinkRef = HTMLAnchorElement
export type HyperlinkProps = AnchorHTMLAttributes<HyperlinkRef>

/**
 * Render the hyperlink component.
 * @param href - The URL of the hyperlink.
 * @param isNextLink - The flag to use the next link.
 * @param children - The children of the hyperlink.
 * @param rest - The rest of the props of the hyperlink.
 * @returns The rendered hyperlink component.
 */
export const Hyperlink = forwardRef<HyperlinkRef, HyperlinkProps>(
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
