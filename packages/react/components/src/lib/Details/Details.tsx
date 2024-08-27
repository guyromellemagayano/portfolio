import React from 'react'

export type DetailsRef = HTMLDetailsElement
export type DetailsProps = React.HTMLAttributes<DetailsRef>

/**
 * Render the details component
 * @param {DetailsProps} props - The details component properties
 * @param {DetailsRef} ref - The details component reference
 * @returns The rendered details component
 */
const Details = React.forwardRef<DetailsRef, DetailsProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <details ref={ref} {...rest}>
      {children}
    </details>
  )
})

Details.displayName = 'Details'

export default Details
