'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type DescriptionDetailsRef = HTMLElement
export type DescriptionDetailsProps = HTMLAttributes<DescriptionDetailsRef>

/**
 * Render the description details component.
 * @param children - The children of the description details.
 * @param rest - The rest of the props of the description details.
 * @returns The rendered description details component.
 */
export const DescriptionDetails = forwardRef<
  DescriptionDetailsRef,
  DescriptionDetailsProps
>(({ children, ...rest }, ref) => {
  return (
    <dd ref={ref} {...rest}>
      {children}
    </dd>
  )
})

DescriptionDetails.displayName = 'DescriptionDetails'

export default DescriptionDetails
