'use client'

import { InsHTMLAttributes, forwardRef } from 'react'

export type InsertedTextRef = HTMLModElement
export type InsertedTextProps = InsHTMLAttributes<InsertedTextRef>

/**
 * Render the inserted text component.
 * @param children - The children of the inserted text.
 * @param rest - The rest of the props of the inserted text.
 * @returns The rendered inserted text component.
 */
export const InsertedText = forwardRef<InsertedTextRef, InsertedTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ins ref={ref} {...rest}>
        {children}
      </ins>
    )
  }
)

InsertedText.displayName = 'InsertedText'

export default InsertedText
