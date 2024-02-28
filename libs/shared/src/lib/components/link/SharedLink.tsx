'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

import Link from 'next/link'

type SharedLinkRef = HTMLAnchorElement & HTMLLinkElement

/* eslint-disable-next-line */
interface SharedLinkProps extends HTMLAttributes<SharedLinkRef> {
  href?: string
}

/**
 * Render the shared link component.
 * @param href - The URL of the shared link.
 * @param children - The children of the shared link.
 * @param rest - The rest of the props of the shared link.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared link component.
 */
export const SharedLink = forwardRef<SharedLinkRef, SharedLinkProps>(
  ({ href = '#', children, ...rest }, ref: ForwardedRef<SharedLinkRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Link ref={ref} href={href} {...rest} id={rest.id ?? customId}>
        {children}
      </Link>
    )
  }
)

SharedLink.displayName = 'SharedLink'
