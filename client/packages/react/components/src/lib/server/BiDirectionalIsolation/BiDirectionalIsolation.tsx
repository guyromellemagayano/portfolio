import { HTMLAttributes, forwardRef } from 'react'

export type BiDirectionalIsolationRef = HTMLElement
export type BiDirectionalIsolationProps =
  HTMLAttributes<BiDirectionalIsolationRef>

/**
 * Render the bi-directional isolation component.
 * @param children - The children of the bi-directional isolation.
 * @param rest - The rest of the props of the bi-directional isolation.
 * @returns The rendered bi-directional isolation component.
 */
export const BiDirectionalIsolation = forwardRef<
  BiDirectionalIsolationRef,
  BiDirectionalIsolationProps
>(({ children, ...rest }, ref) => {
  return (
    <bdi ref={ref} {...rest}>
      {children}
    </bdi>
  )
})

BiDirectionalIsolation.displayName = 'BiDirectionalIsolation'

export default BiDirectionalIsolation
