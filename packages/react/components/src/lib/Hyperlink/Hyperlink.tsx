'use client'

import { AnchorHTMLAttributes, forwardRef } from 'react'

import dynamic from 'next/dynamic'

const NextLink = dynamic(() => import('next/link'))

export type HyperlinkRef = HTMLAnchorElement
export type HyperlinkProps = AnchorHTMLAttributes<HyperlinkRef> & {
  isNextLink?: boolean
}

/**
 * Render the hyperlink component.
 * @param href - The URL of the hyperlink.
 * @param isNextLink - The flag to use the next link.
 * @param children - The children of the hyperlink.
 * @param rest - The rest of the props of the hyperlink.
 * @returns The rendered hyperlink component.
 */
const Hyperlink = forwardRef<HyperlinkRef, HyperlinkProps>(
  ({ href = '#', isNextLink = false, children, ...rest }, ref) => {
    if (isNextLink) {
      return (
        <NextLink ref={ref} href={href} {...rest}>
          {children}
        </NextLink>
      )
    }

    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    )
  }
)

Hyperlink.displayName = 'Hyperlink'

export default Hyperlink
