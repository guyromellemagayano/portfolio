'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type VariableRef = HTMLElement
export type VariableProps = HTMLAttributes<VariableRef>

/**
 * Render the variable component.
 * @param children - The children of the variable.
 * @param rest - The rest of the props of the variable.
 * @returns The rendered variable component.
 */
export const Variable = forwardRef<VariableRef, VariableProps>(
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
