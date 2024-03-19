import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type DescriptionDetailsRef = HTMLElement
export type DescriptionDetailsProps = HTMLAttributes<DescriptionDetailsRef>

/**
 * Render the description details component.
 * @param children - The children of the description details.
 * @param rest - The rest of the props of the description details.
 * @returns The rendered description details component.
 */
const DescriptionDetails = forwardRef<
  DescriptionDetailsRef,
  DescriptionDetailsProps
>(({ children, ...rest }, ref) => {
  return (
    <dd ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </dd>
  )
})

DescriptionDetails.displayName = 'DescriptionDetails'

export default DescriptionDetails
