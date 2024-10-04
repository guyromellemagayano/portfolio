import React from 'react'

export type TSuperscriptRef = HTMLElement
export type TSuperscriptProps = React.HTMLAttributes<TSuperscriptRef>

/**
 * Render the superscript component.
 * @param {TSuperscriptProps} props - The superscript component properties
 * @param {TSuperscriptRef} ref - The superscript component reference
 * @returns The rendered superscript component
 */
const Superscript = React.forwardRef<TSuperscriptRef, TSuperscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sup ref={ref} {...rest}>
        {children}
      </sup>
    )
  }
)

Superscript.displayName = 'Superscript'

export default Superscript
