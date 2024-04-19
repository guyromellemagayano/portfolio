import { HTMLAttributes, forwardRef } from 'react'

export type DetailsRef = HTMLDetailsElement
export type DetailsProps = HTMLAttributes<DetailsRef>

/**
 * Render the details component.
 * @param children - The children of the details.
 * @param rest - The rest of the props of the details.
 * @returns The rendered details component.
 */
export const Details = forwardRef<DetailsRef, DetailsProps>(
  ({ children, ...rest }, ref) => {
    return (
      <details ref={ref} {...rest}>
        {children}
      </details>
    )
  }
)

Details.displayName = 'Details'

export default Details
