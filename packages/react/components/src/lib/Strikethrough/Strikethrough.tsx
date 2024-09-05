import React from 'react'

export type StrikethroughRef = HTMLElement
export type StrikethroughProps = React.HTMLAttributes<StrikethroughRef>

/**
 * Render the strikethrough component.
 * @param {StrikethroughProps} props - The strikethrough component properties
 * @param {StrikethroughRef} ref - The strikethrough component reference
 * @returns The rendered strikethrough component
 */
const Strikethrough = React.forwardRef<StrikethroughRef, StrikethroughProps>(
  ({ children, ...rest }, ref) => {
    return (
      <s ref={ref} {...rest}>
        {children}
      </s>
    )
  }
)

Strikethrough.displayName = 'Strikethrough'

export default Strikethrough
