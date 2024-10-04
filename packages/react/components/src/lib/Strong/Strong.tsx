import React from 'react'

export type TStrongRef = HTMLElement
export type TStrongProps = React.HTMLAttributes<TStrongRef>

/**
 * Render the strong component.
 * @param {TStrongProps} props - The strong component properties
 * @param {TStrongRef} ref - The strong component reference
 * @returns The rendered strong component
 */
const Strong = React.forwardRef<TStrongRef, TStrongProps>(
  ({ children, ...rest }, ref) => {
    return (
      <strong ref={ref} {...rest}>
        {children}
      </strong>
    )
  }
)

Strong.displayName = 'Strong'

export default Strong
