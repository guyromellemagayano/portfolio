import React from 'react'

export type BodyRef = HTMLBodyElement
export type BodyProps = React.HTMLAttributes<BodyRef>

/**
 * Render the body component.
 * @param {BodyProps} props - The body component properties
 * @param {BodyRef} ref - The body component reference
 * @returns The rendered body component
 */
const Body = React.forwardRef<BodyRef, BodyProps>(
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
