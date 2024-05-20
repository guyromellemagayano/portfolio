import { HTMLAttributes, forwardRef } from 'react'

export type BiDirectionalIsolationRef = HTMLElement
export type BiDirectionalIsolationProps =
  HTMLAttributes<BiDirectionalIsolationRef>

/**
 * Render the bi-directional isolation component.
 * @param {BiDirectionalIsolationProps} props - The bi-directional isolation component properties.
 * @param {BiDirectionalIsolationRef} ref - The bi-directional isolation component reference.
 * @returns The rendered bi-directional isolation component.
 */
const BiDirectionalIsolation = forwardRef<
  BiDirectionalIsolationRef,
  BiDirectionalIsolationProps
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <bdi ref={ref} {...rest}>
      {children}
    </bdi>
  )
})

BiDirectionalIsolation.displayName = 'BiDirectionalIsolation'

export default BiDirectionalIsolation
