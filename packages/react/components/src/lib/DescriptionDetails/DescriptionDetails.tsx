import React from 'react'

export type TDescriptionDetailsRef = HTMLElement
export type TDescriptionDetailsProps =
  React.HTMLAttributes<TDescriptionDetailsRef>

/**
 * Render the description details component.
 * @param {TDescriptionDetailsProps} props - The description details component properties
 * @param {TDescriptionDetailsRef} ref - The description details component reference
 * @returns The rendered description details component
 */
const DescriptionDetails = React.forwardRef<
  TDescriptionDetailsRef,
  TDescriptionDetailsProps
>(({ children, ...rest }, ref) => {
  return (
    <dd ref={ref} {...rest}>
      {children}
    </dd>
  )
})

DescriptionDetails.displayName = 'DescriptionDetails'

export default DescriptionDetails
