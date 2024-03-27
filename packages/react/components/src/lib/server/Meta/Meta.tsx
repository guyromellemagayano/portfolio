import { MetaHTMLAttributes } from 'react'

export type MetaRef = HTMLMetaElement
export type MetaProps = MetaHTMLAttributes<MetaRef>

/**
 * Render the meta component.
 * @param children - The children of the meta.
 * @param rest - The rest of the props of the meta.
 * @returns The rendered meta component.
 */
export const Meta = ({ children, ...rest }: MetaProps) => {
  return <meta {...rest}>{children}</meta>
}

Meta.displayName = 'Meta'

export default Meta
