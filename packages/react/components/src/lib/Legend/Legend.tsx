'use client'

import React from 'react'

export type LegendRef = HTMLLegendElement
export type LegendProps = React.HTMLAttributes<LegendRef>

/**
 * Render the legend component.
 * @param {LegendProps} props - The legend component properties
 * @param {LegendRef} ref - The legend component reference
 * @returns The rendered legend component
 */
const Legend = React.forwardRef<LegendRef, LegendProps>(
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
