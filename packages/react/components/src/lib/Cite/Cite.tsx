import React from 'react'

export type TCiteRef = HTMLQuoteElement
export type TCiteProps = React.HTMLAttributes<TCiteRef>

/**
 * Render the cite component.
 * @param {TCiteProps} props - The cite component properties
 * @param {TCiteRef} ref - The cite component reference
 * @returns The rendered cite component
 */
const Cite = React.forwardRef<TCiteRef, TCiteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <cite ref={ref} {...rest}>
        {children}
      </cite>
    )
  }
)

Cite.displayName = 'Cite'

export default Cite
