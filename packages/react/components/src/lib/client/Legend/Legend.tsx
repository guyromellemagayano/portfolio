'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type LegendRef = HTMLLegendElement
export type LegendProps = HTMLAttributes<LegendRef>

/**
 * Render the legend component.
 * @param children - The children of the legend.
 * @param rest - The rest of the props of the legend.
 * @returns The rendered legend component.
 */
export const Legend = forwardRef<LegendRef, LegendProps>(
  ({ children, ...rest }, ref) => {
    return (
      <legend ref={ref} {...rest}>
        {children}
      </legend>
    )
  }
)

Legend.displayName = 'Legend'

export default Legend
