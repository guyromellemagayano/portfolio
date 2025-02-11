import React from 'react'

export type TRubyRef = HTMLElement
export type TRubyProps = React.HTMLAttributes<TRubyRef>

/**
 * Render the ruby annotation component.
 * @param {TRubyProps} props - The ruby annotation component properties
 * @param {TRubyRef} ref - The ruby annotation component reference
 * @returns The rendered ruby annotation component
 */
const Ruby = React.forwardRef<TRubyRef, TRubyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ruby ref={ref} {...rest}>
        {children}
      </ruby>
    )
  }
)

Ruby.displayName = 'Ruby'

export default Ruby
