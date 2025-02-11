import React from 'react'

export type TTimeRef = HTMLTimeElement
export type TTimeProps = React.TimeHTMLAttributes<TTimeRef>

/**
 * Render the time component.
 * @param {TTimeProps} props - The time component properties
 * @param {TTimeRef} ref - The time component reference
 * @returns The rendered time component
 */
const Time = React.forwardRef<TTimeRef, TTimeProps>(
  ({ children, ...rest }, ref) => {
    return (
      <time ref={ref} {...rest}>
        {children}
      </time>
    )
  }
)

Time.displayName = 'Time'

export default Time
