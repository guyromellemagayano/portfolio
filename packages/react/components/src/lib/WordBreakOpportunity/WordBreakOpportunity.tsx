import React from 'react'

export type TWordBreakOpportunityRef = HTMLElement
export type TWordBreakOpportunityProps =
  React.HTMLAttributes<TWordBreakOpportunityRef>

/**
 * Render the word break opportunity component.
 * @param {TWordBreakOpportunityProps} props - The word break opportunity component properties
 * @param {TWordBreakOpportunityRef} ref - The word break opportunity component reference
 * @returns The rendered word break opportunity component
 */
const WordBreakOpportunity = React.forwardRef<
  TWordBreakOpportunityRef,
  TWordBreakOpportunityProps
>(({ children, ...rest }, ref) => {
  return (
    <wbr ref={ref} {...rest}>
      {children}
    </wbr>
  )
})

WordBreakOpportunity.displayName = 'WordBreakOpportunity'

export default WordBreakOpportunity
