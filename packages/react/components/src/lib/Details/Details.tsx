import React from 'react'

export type TDetailsRef = HTMLDetailsElement
export type TDetailsProps = React.HTMLAttributes<TDetailsRef>

/**
 * Render the details component
 * @param {TDetailsProps} props - The details component properties
 * @param {TDetailsRef} ref - The details component reference
 * @returns The rendered details component
 */
const Details = React.forwardRef<TDetailsRef, TDetailsProps>(
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
