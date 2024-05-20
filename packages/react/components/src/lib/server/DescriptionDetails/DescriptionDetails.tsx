import { HTMLAttributes, forwardRef } from 'react'

export type DescriptionDetailsRef = HTMLElement
export type DescriptionDetailsProps = HTMLAttributes<DescriptionDetailsRef>

/**
 * Render the description details component.
 * @param {DescriptionDetailsProps} props - The description details component properties.
 * @param {DescriptionDetailsRef} ref - The description details component reference.
 * @returns The rendered description details component.
 */
const DescriptionDetails = forwardRef<
  DescriptionDetailsRef,
  DescriptionDetailsProps
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <dd ref={ref} {...rest}>
      {children}
    </dd>
  )
})

DescriptionDetails.displayName = 'DescriptionDetails'

export default DescriptionDetails
