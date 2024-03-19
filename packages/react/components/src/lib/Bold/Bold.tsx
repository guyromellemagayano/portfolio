'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type BoldRef = HTMLElement
export type BoldProps = HTMLAttributes<BoldRef>

/**
 * Render the bold component.
 * @param children - The children of the bold.
 * @param rest - The rest of the props of the bold.
 * @returns The rendered bold component.
 */
const Bold = forwardRef<BoldRef, BoldProps>(({ children, ...rest }, ref) => {
  return (
    <b ref={ref} {...rest}>
      {children}
    </b>
  )
})

Bold.displayName = 'Bold'

export default Bold
