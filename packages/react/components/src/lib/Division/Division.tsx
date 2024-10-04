import React from 'react'

export type TDivisionRef = HTMLDivElement
export type TDivisionProps = React.HTMLAttributes<TDivisionRef>

/**
 * Render the division component.
 * @param {TDivisionProps} props - The division component properties
 * @param {TDivisionRef} ref - The division component reference
 * @returns The rendered division component
 */
const Division = React.forwardRef<TDivisionRef, TDivisionProps>(
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
