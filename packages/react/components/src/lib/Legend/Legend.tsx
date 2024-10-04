import React from 'react'

export type TLegendRef = HTMLLegendElement
export type TLegendProps = React.HTMLAttributes<TLegendRef>

/**
 * Render the legend component.
 * @param {TLegendProps} props - The legend component properties
 * @param {TLegendRef} ref - The legend component reference
 * @returns The rendered legend component
 */
const Legend = React.forwardRef<TLegendRef, TLegendProps>(
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
