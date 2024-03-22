'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type StrongRef = HTMLElement
export type StrongProps = HTMLAttributes<StrongRef>

/**
 * Render the strong component.
 * @param children - The children of the strong.
 * @param rest - The rest of the props of the strong.
 * @returns The rendered strong component.
 */
export const Strong = forwardRef<StrongRef, StrongProps>(
  ({ children, ...rest }, ref) => {
    return (
      <strong ref={ref} {...rest}>
        {children}
      </strong>
    )
  }
)

Strong.displayName = 'Strong'

export default Strong
