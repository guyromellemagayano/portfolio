import { HTMLAttributes } from 'react'

export type HeadRef = HTMLHeadElement
export type HeadProps = HTMLAttributes<HeadRef>

/**
 * Render the head component.
 * @param children - The children of the head.
 * @param rest - The rest of the props of the head.
 * @returns The rendered head component.
 */
const Head = ({ children, ...rest }: HeadProps) => {
  return <head {...rest}>{children}</head>
}

Head.displayName = 'Head'

export default Head
