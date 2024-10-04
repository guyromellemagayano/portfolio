/* eslint-disable @next/next/no-head-element */
import React from 'react'

export type THeadRef = HTMLHeadElement
export type THeadProps = React.HTMLAttributes<THeadRef>

/**
 * Render the head component.
 * @param {THeadProps} props - The head component properties
 * @returns The rendered head component
 */
const Head = ({ children, ...rest }: THeadProps) => {
  return <head {...rest}>{children}</head>
}

Head.displayName = 'Head'

export default Head
