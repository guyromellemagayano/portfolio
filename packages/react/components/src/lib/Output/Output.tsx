import React from 'react'

export type OutputRef = HTMLOutputElement
export type OutputProps = React.OutputHTMLAttributes<OutputRef>

/**
 * Render the output component.
 * @param {OutputProps} props - The output component properties
 * @param {OutputRef} ref - The output component reference
 * @returns The rendered output component
 */
const Output = React.forwardRef<OutputRef, OutputProps>(
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
