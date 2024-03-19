import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type RubyParenthesesRef = HTMLElement
export type RubyParenthesesProps = HTMLAttributes<RubyParenthesesRef>

/**
 * Render the ruby parentheses component.
 * @param children - The children of the ruby parentheses.
 * @param rest - The rest of the props of the ruby parentheses.
 * @returns The rendered ruby parentheses component.
 */
const RubyParentheses = forwardRef<RubyParenthesesRef, RubyParenthesesProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rp ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </rp>
    )
  }
)

RubyParentheses.displayName = 'RubyParentheses'

export default RubyParentheses
