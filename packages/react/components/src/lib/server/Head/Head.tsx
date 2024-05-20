import { HTMLAttributes } from 'react'

export type HeadRef = HTMLHeadElement
export type HeadProps = HTMLAttributes<HeadRef>

/**
 * Render the head component.
 * @param {HeadProps} props - The head component properties.
 * @returns The rendered head component.
 */
const Head = (props: HeadProps) => {
  const { children, ...rest } = props

  return <head {...rest}>{children}</head>
}

Head.displayName = 'Head'

export default Head
