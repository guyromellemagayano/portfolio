import React from 'react'

export type TVariableRef = HTMLElement
export type TVariableProps = React.HTMLAttributes<TVariableRef>

/**
 * Render the variable component.
 * @param {TVariableProps} props - The variable component properties
 * @param {TVariableRef} ref - The variable component reference
 * @returns The rendered variable component
 */
const Variable = React.forwardRef<TVariableRef, TVariableProps>(
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
