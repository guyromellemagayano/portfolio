import React from 'react'

export type RubyParenthesesRef = HTMLElement
export type RubyParenthesesProps = React.HTMLAttributes<RubyParenthesesRef>

/**
 * Render the ruby parentheses component.
 * @param {RubyParenthesesProps} props - The ruby parentheses component properties
 * @param {RubyParenthesesRef} ref - The ruby parentheses component reference
 * @returns The rendered ruby parentheses component
 */
const RubyParentheses = React.forwardRef<
  RubyParenthesesRef,
  RubyParenthesesProps
>(({ children, ...rest }, ref) => {
  return (
    <rp ref={ref} {...rest}>
      {children}
    </rp>
  )
})

RubyParentheses.displayName = 'RubyParentheses'

export default RubyParentheses
