import { HTMLAttributes, forwardRef } from 'react'

export type VariableRef = HTMLElement
export type VariableProps = HTMLAttributes<VariableRef>

/**
 * Render the variable component.
 * @param {VariableProps} props - The variable component properties.
 * @param {VariableRef} ref - The variable component reference.
 * @returns The rendered variable component.
 */
const Variable = forwardRef<VariableRef, VariableProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <var ref={ref} {...rest}>
      {children}
    </var>
  )
})

Variable.displayName = 'Variable'

export default Variable
