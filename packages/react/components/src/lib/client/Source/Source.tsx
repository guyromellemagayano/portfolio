'use client'

import { SourceHTMLAttributes, forwardRef } from 'react'

export type SourceRef = HTMLSourceElement
export type SourceProps = SourceHTMLAttributes<SourceRef>

/**
 * Render the source component.
 * @param {SourceProps} props - The source component properties.
 * @param {SourceRef} ref - The source component reference.
 * @returns The rendered source component.
 */
const Source = forwardRef<SourceRef, SourceProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <source ref={ref} {...rest}>
      {children}
    </source>
  )
})

Source.displayName = 'Source'

export default Source
