import React from 'react'

export type TBiDirectionalIsolationRef = HTMLElement
export type TBiDirectionalIsolationProps =
  React.HTMLAttributes<TBiDirectionalIsolationRef>

/**
 * Render the bi-directional isolation component.
 * @param {TBiDirectionalIsolationProps} props - The bi-directional isolation component properties
 * @param {TBiDirectionalIsolationRef} ref - The bi-directional isolation component reference
 * @returns The rendered bi-directional isolation component
 */
const BiDirectionalIsolation = React.forwardRef<
  TBiDirectionalIsolationRef,
  TBiDirectionalIsolationProps
>(({ children, ...rest }, ref) => {
  return (
    <bdi ref={ref} {...rest}>
      {children}
    </bdi>
  )
})

BiDirectionalIsolation.displayName = 'BiDirectionalIsolation'

export default BiDirectionalIsolation
