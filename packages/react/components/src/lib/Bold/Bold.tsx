import React from 'react'

export type BoldRef = HTMLElement
export type BoldProps = React.HTMLAttributes<BoldRef>

/**
 * Render the bold component.
 * @param {BoldProps} props - The bold component properties
 * @param {BoldRef} ref - The bold component reference
 * @returns The rendered bold component
 */
const Bold = React.forwardRef<BoldRef, BoldProps>(
  ({ children, ...rest }, ref) => {
    return (
      <b ref={ref} {...rest}>
        {children}
      </b>
    )
  }
)

Bold.displayName = 'Bold'

export default Bold
