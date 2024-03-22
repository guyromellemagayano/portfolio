'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type SubscriptRef = HTMLElement
export type SubscriptProps = HTMLAttributes<SubscriptRef>

/**
 * Render the subscript component.
 * @param children - The children of the subscript.
 * @param rest - The rest of the props of the subscript.
 * @returns The rendered subscript component.
 */
export const Subscript = forwardRef<SubscriptRef, SubscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sub ref={ref} {...rest}>
        {children}
      </sub>
    )
  }
)

Subscript.displayName = 'Subscript'

export default Subscript
