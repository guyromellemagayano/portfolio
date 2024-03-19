'use client'

import { LinkHTMLAttributes } from 'react'

export type LinkRef = HTMLLinkElement
export type LinkProps = LinkHTMLAttributes<LinkRef>

/**
 * Render the link component.
 * @param rest - The rest of the props of the link.
 * @returns The rendered link component.
 */
const Link = ({ ...rest }: LinkProps) => {
  return <link {...rest} />
}

Link.displayName = 'Link'

export default Link
