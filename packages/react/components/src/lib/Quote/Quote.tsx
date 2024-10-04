import React from 'react'

export type TQuoteRef = HTMLQuoteElement
export type TQuoteProps = React.HTMLAttributes<TQuoteRef>

/**
 * Render the quote component.
 * @param {TQuoteProps} props - The quote component properties
 * @param {TQuoteRef} ref - The quote component reference
 * @returns The rendered quote component
 */
const Quote = React.forwardRef<TQuoteRef, TQuoteProps>(
  ({ children, ...rest }, ref) => {
    return (
      <q ref={ref} {...rest}>
        {children}
      </q>
    )
  }
)

Quote.displayName = 'Quote'

export default Quote
