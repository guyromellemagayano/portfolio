import { HTMLAttributes, forwardRef } from 'react'

export type SmallRef = HTMLElement
export type SmallProps = HTMLAttributes<SmallRef>

/**
 * Render the small component.
 * @param {SmallProps} props - The small component properties.
 * @param {SmallRef} ref - The small component reference.
 * @returns The rendered small component.
 */
const Small = forwardRef<SmallRef, SmallProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <small ref={ref} {...rest}>
      {children}
    </small>
  )
})

Small.displayName = 'Small'

export default Small
