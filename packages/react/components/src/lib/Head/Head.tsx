import React from 'react'

export type HeadRef = HTMLHeadElement
export type HeadProps = React.HTMLAttributes<HeadRef>

/**
 * Render the head component.
 * @param {HeadProps} props - The head component properties
 * @returns The rendered head component
 */
const Head = ({ children, ...rest }: HeadProps) => {
  return <head {...rest}>{children}</head>
}

Head.displayName = 'Head'

export default Head
