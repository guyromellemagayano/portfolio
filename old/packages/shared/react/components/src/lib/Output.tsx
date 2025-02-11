import React from 'react'

export type TOutputRef = HTMLOutputElement
export type TOutputProps = React.OutputHTMLAttributes<TOutputRef>

/**
 * Render the output component.
 * @param {TOutputProps} props - The output component properties
 * @param {TOutputRef} ref - The output component reference
 * @returns The rendered output component
 */
const Output = React.forwardRef<TOutputRef, TOutputProps>(
  ({ children, ...rest }, ref) => {
    return (
      <output ref={ref} {...rest}>
        {children}
      </output>
    )
  }
)

Output.displayName = 'Output'

export default Output
