import React from 'react'

export type TCodeRef = HTMLElement
export type TCodeProps = React.HTMLAttributes<TCodeRef>

/**
 * Render the code component.
 * @param {TCodeProps} props - The code component properties
 * @param {TCodeRef} ref - The code component reference
 * @returns The rendered code component
 */
const Code = React.forwardRef<TCodeRef, TCodeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <code ref={ref} {...rest}>
        {children}
      </code>
    )
  }
)

Code.displayName = 'Code'

export default Code
