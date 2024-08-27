import React from 'react'

export type TimeRef = HTMLTimeElement
export type TimeProps = React.TimeHTMLAttributes<TimeRef>

/**
 * Render the time component
 * @param {TimeProps} props - The time component properties
 * @param {TimeRef} ref - The time component reference
 * @returns The rendered time component
 */
const Time = React.forwardRef<TimeRef, TimeProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <time ref={ref} {...rest}>
      {children}
    </time>
  )
})

Time.displayName = 'Time'

export default Time
