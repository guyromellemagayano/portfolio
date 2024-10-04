import React from 'react'

export type TSpanRef = HTMLSpanElement
export type TSpanProps = React.HTMLAttributes<TSpanRef>

/**
 * Render the span component.
 * @param {TSpanProps} props - The span component properties
 * @param {TSpanRef} ref - The span component reference
 * @returns The rendered span component
 */
const Span = React.forwardRef<TSpanRef, TSpanProps>(
  ({ children, ...rest }, ref) => {
    return (
      <span ref={ref} {...rest}>
        {children}
      </span>
    )
  }
)

Span.displayName = 'Span'

export default Span
