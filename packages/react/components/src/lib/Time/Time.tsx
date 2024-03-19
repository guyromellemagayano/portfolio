'use client'

import { TimeHTMLAttributes, forwardRef } from 'react'

export type TimeRef = HTMLTimeElement
export type TimeProps = TimeHTMLAttributes<TimeRef>

/**
 * Render the time component.
 * @param children - The children of the time.
 * @param rest - The rest of the props of the time.
 * @returns The rendered time component.
 */
const Time = forwardRef<TimeRef, TimeProps>(({ children, ...rest }, ref) => {
  return (
    <time ref={ref} {...rest}>
      {children}
    </time>
  )
})

Time.displayName = 'Time'

export default Time
