import React from 'react'

export type CodeRef = HTMLElement
export type CodeProps = React.HTMLAttributes<CodeRef>

/**
 * Render the code component.
 * @param {CodeProps} props - The code component properties
 * @param {CodeRef} ref - The code component reference
 * @returns The rendered code component
 */
const Code = React.forwardRef<CodeRef, CodeProps>(
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
