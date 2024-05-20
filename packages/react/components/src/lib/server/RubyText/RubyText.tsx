import { HTMLAttributes, forwardRef } from 'react'

export type RubyTextRef = HTMLElement
export type RubyTextProps = HTMLAttributes<RubyTextRef>

/**
 * Render the ruby text component.
 * @param {RubyTextProps} props - The ruby text component properties.
 * @param {RubyTextRef} ref - The ruby text component reference.
 * @returns The rendered ruby text component.
 */
const RubyText = forwardRef<RubyTextRef, RubyTextProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <rt ref={ref} {...rest}>
      {children}
    </rt>
  )
})

RubyText.displayName = 'RubyText'

export default RubyText
