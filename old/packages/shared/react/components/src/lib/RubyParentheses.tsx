import React from 'react'

export type TRubyParenthesesRef = HTMLElement
export type TRubyParenthesesProps = React.HTMLAttributes<TRubyParenthesesRef>

/**
 * Render the ruby parentheses component.
 * @param {TRubyParenthesesProps} props - The ruby parentheses component properties
 * @param {TRubyParenthesesRef} ref - The ruby parentheses component reference
 * @returns The rendered ruby parentheses component
 */
const RubyParentheses = React.forwardRef<
  TRubyParenthesesRef,
  TRubyParenthesesProps
>(({ children, ...rest }, ref) => {
  return (
    <rp ref={ref} {...rest}>
      {children}
    </rp>
  )
})

RubyParentheses.displayName = 'RubyParentheses'

export default RubyParentheses
