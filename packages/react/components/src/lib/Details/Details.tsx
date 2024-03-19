import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type DetailsRef = HTMLDetailsElement
export type DetailsProps = HTMLAttributes<DetailsRef>

/**
 * Render the details component.
 * @param children - The children of the details.
 * @param rest - The rest of the props of the details.
 * @returns The rendered details component.
 */
const Details = forwardRef<DetailsRef, DetailsProps>(
  ({ children, ...rest }, ref) => {
    return (
      <details ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </details>
    )
  }
)

Details.displayName = 'Details'

export default Details
