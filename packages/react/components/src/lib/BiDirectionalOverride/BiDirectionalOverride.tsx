import React from 'react'

export type BiDirectionalOverrideRef = HTMLElement
export type BiDirectionalOverrideProps =
  React.HTMLAttributes<BiDirectionalOverrideRef>

/**
 * Render the bi-directional override component.
 * @param {BiDirectionalOverrideProps} props - The bi-directional override component properties
 * @param {BiDirectionalOverrideRef} ref - The bi-directional override component reference
 * @returns The rendered bi-directional override component
 */
const BiDirectionalOverride = React.forwardRef<
  BiDirectionalOverrideRef,
  BiDirectionalOverrideProps
>(({ children, ...rest }, ref) => {
  return (
    <bdo ref={ref} {...rest}>
      {children}
    </bdo>
  )
})

BiDirectionalOverride.displayName = 'BiDirectionalOverride'

export default BiDirectionalOverride
