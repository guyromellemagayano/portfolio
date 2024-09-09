import React from 'react'

export type SpanRef = HTMLSpanElement
export type SpanProps = React.HTMLAttributes<SpanRef>

/**
 * Render the span component.
 * @param {SpanProps} props - The span component properties
 * @param {SpanRef} ref - The span component reference
 * @returns The rendered span component
 */
const Span = React.forwardRef<SpanRef, SpanProps>(
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
