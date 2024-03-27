'use client'

import { SourceHTMLAttributes, forwardRef } from 'react'

export type SourceRef = HTMLSourceElement
export type SourceProps = SourceHTMLAttributes<SourceRef>

/**
 * Render the source component.
 * @param children - The children of the source.
 * @param rest - The rest of the props of the source.
 * @returns The rendered source component.
 */
export const Source = forwardRef<SourceRef, SourceProps>(
  ({ children, ...rest }, ref) => {
    return (
      <source ref={ref} {...rest}>
        {children}
      </source>
    )
  }
)

Source.displayName = 'Source'

export default Source
