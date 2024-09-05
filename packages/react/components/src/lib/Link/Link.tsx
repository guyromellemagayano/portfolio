'use client'

import React from 'react'

export type LinkRef = HTMLLinkElement
export type LinkProps = React.LinkHTMLAttributes<LinkRef>

/**
 * Render the link component
 * @param {LinkProps} props - The link component properties
 * @returns The rendered link component
 */
export const Link = (props: LinkProps) => {
  const { ...rest } = props

  return <link {...rest} />
}

Link.displayName = 'Link'

export default Link
