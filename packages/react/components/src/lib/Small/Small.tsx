import React from 'react'

export type SmallRef = HTMLElement
export type SmallProps = React.HTMLAttributes<SmallRef>

/**
 * Render the small component.
 * @param {SmallProps} props - The small component properties
 * @param {SmallRef} ref - The small component reference
 * @returns The rendered small component
 */
const Small = React.forwardRef<SmallRef, SmallProps>(
  ({ children, ...rest }, ref) => {
    return (
      <small ref={ref} {...rest}>
        {children}
      </small>
    )
  }
)

Small.displayName = 'Small'

export default Small
