import React from 'react'

export type DivisionRef = HTMLDivElement
export type DivisionProps = React.HTMLAttributes<DivisionRef>

/**
 * Render the division component.
 * @param {DivisionProps} props - The division component properties
 * @param {DivisionRef} ref - The division component reference
 * @returns The rendered division component
 */
const Division = React.forwardRef<DivisionRef, DivisionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        {children}
      </div>
    )
  }
)

Division.displayName = 'Division'

export default Division
