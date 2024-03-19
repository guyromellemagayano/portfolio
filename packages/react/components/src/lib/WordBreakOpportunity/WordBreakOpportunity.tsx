import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type WordBreakOpportunityRef = HTMLElement
export type WordBreakOpportunityProps = HTMLAttributes<WordBreakOpportunityRef>

/**
 * Render the word break opportunity component.
 * @param children - The children of the word break opportunity.
 * @param rest - The rest of the props of the word break opportunity.
 * @returns The rendered word break opportunity component.
 */
const WordBreakOpportunity = forwardRef<
  WordBreakOpportunityRef,
  WordBreakOpportunityProps
>(({ children, ...rest }, ref) => {
  return (
    <var ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </var>
  )
})

WordBreakOpportunity.displayName = 'WordBreakOpportunity'

export default WordBreakOpportunity
