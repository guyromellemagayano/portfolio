import { HTMLAttributes, forwardRef } from 'react'

export type RubyParenthesesRef = HTMLElement
export type RubyParenthesesProps = HTMLAttributes<RubyParenthesesRef>

/**
 * Render the ruby parentheses component.
 * @param {RubyParenthesesProps} props - The ruby parentheses component properties.
 * @param {RubyParenthesesRef} ref - The ruby parentheses component reference.
 * @returns The rendered ruby parentheses component.
 */
const RubyParentheses = forwardRef<RubyParenthesesRef, RubyParenthesesProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <rp ref={ref} {...rest}>
        {children}
      </rp>
    )
  }
)

RubyParentheses.displayName = 'RubyParentheses'

export default RubyParentheses
