import { HTMLAttributes, forwardRef } from 'react'

export type RubyRef = HTMLElement
export type RubyProps = HTMLAttributes<RubyRef>

/**
 * Render the ruby annotation component.
 * @param {RubyProps} props - The ruby annotation component properties.
 * @param {RubyRef} ref - The ruby annotation component reference.
 * @returns The rendered ruby annotation component.
 */
const Ruby = forwardRef<RubyRef, RubyProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <ruby ref={ref} {...rest}>
      {children}
    </ruby>
  )
})

Ruby.displayName = 'Ruby'

export default Ruby
