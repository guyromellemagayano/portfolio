import React from 'react'

export type TMetaRef = HTMLMetaElement
export type TMetaProps = React.MetaHTMLAttributes<TMetaRef>

/**
 * Render the meta component.
 * @param {TMetaProps} props - The meta component properties
 * @returns The rendered meta component
 */
const Meta = ({ children, ...rest }: TMetaProps) => {
  return <meta {...rest}>{children}</meta>
}

Meta.displayName = 'Meta'

export default Meta
