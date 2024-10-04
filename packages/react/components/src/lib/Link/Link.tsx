import React from 'react'

export type TLinkRef = HTMLLinkElement
export type TLinkProps = React.LinkHTMLAttributes<TLinkRef>

/**
 * Render the link component
 * @param {TLinkProps} props - The link component properties
 * @returns The rendered link component
 */
export const Link = (props: TLinkProps) => {
  const { ...rest } = props

  return <link {...rest} />
}

Link.displayName = 'Link'

export default Link
