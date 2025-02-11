import React from 'react'

export type TSmallRef = HTMLElement
export type TSmallProps = React.HTMLAttributes<TSmallRef>

/**
 * Render the small component.
 * @param {TSmallProps} props - The small component properties
 * @param {TSmallRef} ref - The small component reference
 * @returns The rendered small component
 */
const Small = React.forwardRef<TSmallRef, TSmallProps>(
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
