'use client'

import { StyleHTMLAttributes } from 'react'

export type StyleRef = HTMLStyleElement
export type StyleProps = StyleHTMLAttributes<StyleRef>

/**
 * Render the style component.
 * @param children - The children of the style.
 * @param rest - The rest of the props of the style.
 * @returns The rendered style component.
 */
const Style = ({ children, ...rest }: StyleProps) => {
  return <style {...rest}>{children}</style>
}

Style.displayName = 'Style'

export default Style
