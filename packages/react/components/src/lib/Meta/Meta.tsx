import React from 'react'

export type MetaRef = HTMLMetaElement
export type MetaProps = React.MetaHTMLAttributes<MetaRef>

/**
 * Render the meta component.
 * @param {MetaProps} props - The meta component properties
 * @returns The rendered meta component
 */
const Meta = ({ children, ...rest }: MetaProps) => {
  return <meta {...rest}>{children}</meta>
}

Meta.displayName = 'Meta'

export default Meta
