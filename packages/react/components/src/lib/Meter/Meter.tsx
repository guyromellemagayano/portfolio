import React from 'react'

export type TMeterRef = HTMLMeterElement
export type TMeterProps = React.MeterHTMLAttributes<TMeterRef>

/**
 * Render the meter component.
 * @param {TMeterProps} props - The meter component properties
 * @param {TMeterRef} ref - The meter component reference
 * @returns The rendered meter component
 */
const Meter = React.forwardRef<TMeterRef, TMeterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <meter ref={ref} {...rest}>
        {children}
      </meter>
    )
  }
)

Meter.displayName = 'Meter'

export default Meter
