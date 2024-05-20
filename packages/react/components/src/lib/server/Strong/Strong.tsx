import { HTMLAttributes, forwardRef } from 'react'

export type StrongRef = HTMLElement
export type StrongProps = HTMLAttributes<StrongRef>

/**
 * Render the strong component.
 * @param {StrongProps} props - The strong component properties.
 * @param {StrongRef} ref - The strong component reference.
 * @returns The rendered strong component.
 */
const Strong = forwardRef<StrongRef, StrongProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <strong ref={ref} {...rest}>
      {children}
    </strong>
  )
})

Strong.displayName = 'Strong'

export default Strong
