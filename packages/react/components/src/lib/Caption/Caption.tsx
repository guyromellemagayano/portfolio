'use client'

import { TableHTMLAttributes, forwardRef } from 'react'

export type CaptionRef = HTMLTableCaptionElement
export type CaptionProps = TableHTMLAttributes<CaptionRef>

/**
 * Render the caption component.
 * @param children - The children of the caption.
 * @param rest - The rest of the props of the caption.
 * @returns The rendered caption component.
 */
export const Caption = forwardRef<CaptionRef, CaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <caption ref={ref} {...rest}>
        {children}
      </caption>
    )
  }
)

Caption.displayName = 'Caption'

export default Caption
