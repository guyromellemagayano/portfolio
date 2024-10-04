import React from 'react'

export type TRubyTextRef = HTMLElement
export type TRubyTextProps = React.HTMLAttributes<TRubyTextRef>

/**
 * Render the ruby text component.
 * @param {TRubyTextProps} props - The ruby text component properties
 * @param {TRubyTextRef} ref - The ruby text component reference
 * @returns The rendered ruby text component
 */
const RubyText = React.forwardRef<TRubyTextRef, TRubyTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rt ref={ref} {...rest}>
        {children}
      </rt>
    )
  }
)

RubyText.displayName = 'RubyText'

export default RubyText
