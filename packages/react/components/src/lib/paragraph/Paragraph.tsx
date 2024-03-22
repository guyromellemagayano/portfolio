'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type ParagraphRef = HTMLParagraphElement
export type ParagraphProps = HTMLAttributes<ParagraphRef>

/**
 * Render the paragraph component.
 * @param children - The children of the paragraph.
 * @param rest - The rest of the props of the paragraph.
 * @returns The rendered paragraph component.
 */
export const Paragraph = forwardRef<ParagraphRef, ParagraphProps>(
  ({ children, ...rest }, ref) => {
    return (
      <p ref={ref} {...rest}>
        {children}
      </p>
    )
  }
)

Paragraph.displayName = 'Paragraph'

export default Paragraph
