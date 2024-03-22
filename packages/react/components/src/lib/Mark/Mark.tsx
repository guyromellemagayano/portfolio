'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type MarkRef = HTMLElement
export type MarkProps = HTMLAttributes<MarkRef>

/**
 * Render the mark component.
 * @param children - The children of the mark.
 * @param rest - The rest of the props of the mark.
 * @returns The rendered mark component.
 */
export const Mark = forwardRef<MarkRef, MarkProps>(
  ({ children, ...rest }, ref) => {
    return (
      <mark ref={ref} {...rest}>
        {children}
      </mark>
    )
  }
)

Mark.displayName = 'Mark'

export default Mark
