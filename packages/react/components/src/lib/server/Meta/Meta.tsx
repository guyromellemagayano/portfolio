import { MetaHTMLAttributes } from 'react'

export type MetaRef = HTMLMetaElement
export type MetaProps = MetaHTMLAttributes<MetaRef>

/**
 * Render the meta component.
 * @param {MetaProps} props - The meta component properties.
 * @returns The rendered meta component.
 */
const Meta = (props: MetaProps) => {
  const { children, ...rest } = props

  return <meta {...rest}>{children}</meta>
}

Meta.displayName = 'Meta'

export default Meta
