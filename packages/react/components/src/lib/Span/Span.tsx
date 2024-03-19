import { HTMLAttributes, forwardRef } from 'react'

export type SpanRef = HTMLSpanElement
export type SpanProps = HTMLAttributes<SpanRef>

/**
 * Render the span component.
 * @param children - The children of the span.
 * @param rest - The rest of the props of the span.
 * @returns The rendered span component.
 */
const Span = forwardRef<SpanRef, SpanProps>(({ children, ...rest }, ref) => {
  return (
    <span ref={ref} {...rest}>
      {children}
    </span>
  )
})

Span.displayName = 'Span'

export default Span
