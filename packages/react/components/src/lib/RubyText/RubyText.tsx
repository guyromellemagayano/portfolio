'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type RubyTextRef = HTMLElement
export type RubyTextProps = HTMLAttributes<RubyTextRef>

/**
 * Render the ruby text component.
 * @param children - The children of the ruby text.
 * @param rest - The rest of the props of the ruby text.
 * @returns The rendered ruby text component.
 */
export const RubyText = forwardRef<RubyTextRef, RubyTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rt ref={ref} {...rest}>
        {children}
      </rt>
    )
  }
)

RubyText.displayName = 'RubyText'

export default RubyText
