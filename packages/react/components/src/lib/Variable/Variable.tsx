import React from 'react'

export type VariableRef = HTMLElement
export type VariableProps = React.HTMLAttributes<VariableRef>

/**
 * Render the variable component.
 * @param {VariableProps} props - The variable component properties
 * @param {VariableRef} ref - The variable component reference
 * @returns The rendered variable component
 */
const Variable = React.forwardRef<VariableRef, VariableProps>(
  ({ children, ...rest }, ref) => {
    return (
      <var ref={ref} {...rest}>
        {children}
      </var>
    )
  }
)

Variable.displayName = 'Variable'

export default Variable
