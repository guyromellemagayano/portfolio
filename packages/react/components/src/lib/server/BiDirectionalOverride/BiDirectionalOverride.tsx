import { HTMLAttributes, forwardRef } from 'react'

export type BiDirectionalOverrideRef = HTMLElement
export type BiDirectionalOverrideProps =
  HTMLAttributes<BiDirectionalOverrideRef>

/**
 * Render the bi-directional override component.
 * @param children - The children of the bi-directional override.
 * @param rest - The rest of the props of the bi-directional override.
 * @returns The rendered bi-directional override component.
 */
export const BiDirectionalOverride = forwardRef<
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
