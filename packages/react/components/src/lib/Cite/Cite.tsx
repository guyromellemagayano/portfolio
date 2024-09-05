import React from 'react'

export type CiteRef = HTMLQuoteElement
export type CiteProps = React.HTMLAttributes<CiteRef>

/**
 * Render the cite component.
 * @param {CiteProps} props - The cite component properties
 * @param {CiteRef} ref - The cite component reference
 * @returns The rendered cite component
 */
const Cite = React.forwardRef<CiteRef, CiteProps>(
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
