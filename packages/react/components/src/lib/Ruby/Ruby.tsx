'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type RubyRef = HTMLElement
export type RubyProps = HTMLAttributes<RubyRef>

/**
 * Render the ruby annotation component.
 * @param children - The children of the ruby annotation.
 * @param rest - The rest of the props of the ruby annotation.
 * @returns The rendered ruby annotation component.
 */
export const Ruby = forwardRef<RubyRef, RubyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ruby ref={ref} {...rest}>
        {children}
      </ruby>
    )
  }
)

Ruby.displayName = 'Ruby'

export default Ruby
