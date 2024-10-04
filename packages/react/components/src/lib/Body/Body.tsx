import React from 'react'

export type TBodyRef = HTMLBodyElement
export type TBodyProps = React.HTMLAttributes<TBodyRef>

/**
 * Render the body component.
 * @param {TBodyProps} props - The body component properties
 * @param {TBodyRef} ref - The body component reference
 * @returns The rendered body component
 */
const Body = React.forwardRef<TBodyRef, TBodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <body ref={ref} {...rest}>
        {children}
      </body>
    )
  }
)

Body.displayName = 'Body'

export default Body
