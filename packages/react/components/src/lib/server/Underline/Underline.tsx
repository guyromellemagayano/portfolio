import { HTMLAttributes, forwardRef } from 'react'

export type UnderlineRef = HTMLElement
export type UnderlineProps = HTMLAttributes<UnderlineRef>

/**
 * Render the underline component.
 * @param {UnderlineProps} props - The underline component properties.
 * @param {UnderlineRef} ref - The underline component reference.
 * @returns The rendered underline component.
 */
const Underline = forwardRef<UnderlineRef, UnderlineProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <u ref={ref} {...rest}>
      {children}
    </u>
  )
})

Underline.displayName = 'Underline'

export default Underline
