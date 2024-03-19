import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type LegendRef = HTMLLegendElement
export type LegendProps = HTMLAttributes<LegendRef>

/**
 * Render the legend component.
 * @param children - The children of the legend.
 * @param rest - The rest of the props of the legend.
 * @returns The rendered legend component.
 */
const Legend = forwardRef<LegendRef, LegendProps>(
  ({ children, ...rest }, ref) => {
    return (
      <legend ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </legend>
    )
  }
)

Legend.displayName = 'Legend'

export default Legend
