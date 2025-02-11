import React from 'react'

export type TStrikethroughRef = HTMLElement
export type TStrikethroughProps = React.HTMLAttributes<TStrikethroughRef>

/**
 * Render the strikethrough component.
 * @param {TStrikethroughProps} props - The strikethrough component properties
 * @param {TStrikethroughRef} ref - The strikethrough component reference
 * @returns The rendered strikethrough component
 */
const Strikethrough = React.forwardRef<TStrikethroughRef, TStrikethroughProps>(
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
