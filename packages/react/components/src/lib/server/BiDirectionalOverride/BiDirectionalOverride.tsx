import { HTMLAttributes, forwardRef } from 'react'

export type BiDirectionalOverrideRef = HTMLElement
export type BiDirectionalOverrideProps =
  HTMLAttributes<BiDirectionalOverrideRef>

/**
 * Render the bi-directional override component.
 * @param {BiDirectionalOverrideProps} props - The bi-directional override component properties.
 * @param {BiDirectionalOverrideRef} ref - The bi-directional override component reference.
 * @returns The rendered bi-directional override component.
 */
const BiDirectionalOverride = forwardRef<
  BiDirectionalOverrideRef,
  BiDirectionalOverrideProps
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <bdo ref={ref} {...rest}>
      {children}
    </bdo>
  )
})

BiDirectionalOverride.displayName = 'BiDirectionalOverride'

export default BiDirectionalOverride
