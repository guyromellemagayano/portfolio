'use client'

import React from 'react'

export type MeterRef = HTMLMeterElement
export type MeterProps = React.MeterHTMLAttributes<MeterRef>

/**
 * Render the meter component.
 * @param {MeterProps} props - The meter component properties
 * @param {MeterRef} ref - The meter component reference
 * @returns The rendered meter component
 */
const Meter = React.forwardRef<MeterRef, MeterProps>(
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
