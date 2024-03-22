'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type BodyRef = HTMLBodyElement
export type BodyProps = HTMLAttributes<BodyRef>

/**
 * Render the body component.
 * @param children - The children of the body.
 * @param rest - The rest of the props of the body.
 * @returns The rendered body component.
 */
export const Body = forwardRef<BodyRef, BodyProps>(
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
