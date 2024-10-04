import React from 'react'

export type TStyleRef = HTMLStyleElement
export type TStyleProps = React.StyleHTMLAttributes<TStyleRef>

/**
 * Render the style component
 * @param {TStyleProps} props - The style component properties
 * @returns The rendered style component
 */
const Style = ({ children, ...rest }: TStyleProps) => {
  return <style {...rest}>{children}</style>
}

Style.displayName = 'Style'

export default Style
