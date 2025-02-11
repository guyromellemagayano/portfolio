import React from 'react'

export type TMarkRef = HTMLElement
export type TMarkProps = React.HTMLAttributes<TMarkRef>

/**
 * Render the mark component.
 * @param {TMarkProps} props - The mark component properties
 * @param {TMarkRef} ref - The mark component reference
 * @returns The rendered mark component
 */
const Mark = React.forwardRef<TMarkRef, TMarkProps>(
  ({ children, ...rest }, ref) => {
    return (
      <mark ref={ref} {...rest}>
        {children}
      </mark>
    )
  }
)

Mark.displayName = 'Mark'

export default Mark
