import { TimeHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

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
    <time ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </time>
  )
})

Time.displayName = 'Time'

export default Time
