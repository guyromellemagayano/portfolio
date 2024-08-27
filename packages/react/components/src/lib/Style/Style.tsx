'use client'

import React from 'react'

export type StyleRef = HTMLStyleElement
export type StyleProps = React.StyleHTMLAttributes<StyleRef>

/**
 * Render the style component
 * @param {StyleProps} props - The style component properties
 * @returns The rendered style component
 */
const Style = ({ children, ...rest }: StyleProps) => {
  return <style {...rest}>{children}</style>
}

Style.displayName = 'Style'

export default Style
