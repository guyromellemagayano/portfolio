import React from 'react'

export type QuoteRef = HTMLQuoteElement
export type QuoteProps = React.HTMLAttributes<QuoteRef>

/**
 * Render the quote component.
 * @param {QuoteProps} props - The quote component properties
 * @param {QuoteRef} ref - The quote component reference
 * @returns The rendered quote component
 */
const Quote = React.forwardRef<QuoteRef, QuoteProps>(
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
