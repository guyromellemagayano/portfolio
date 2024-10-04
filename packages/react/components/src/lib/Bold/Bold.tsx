import React from 'react'

export type TBoldRef = HTMLElement
export type TBoldProps = React.HTMLAttributes<TBoldRef>

/**
 * Render the bold component.
 * @param {TBoldProps} props - The bold component properties
 * @param {TBoldRef} ref - The bold component reference
 * @returns The rendered bold component
 */
const Bold = React.forwardRef<TBoldRef, TBoldProps>(
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
