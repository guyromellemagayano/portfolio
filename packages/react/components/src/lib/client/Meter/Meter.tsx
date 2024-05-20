'use client'

import { MeterHTMLAttributes, forwardRef } from 'react'

export type MeterRef = HTMLMeterElement
export type MeterProps = MeterHTMLAttributes<MeterRef>

/**
 * Render the meter component.
 * @param {MeterProps} props - The meter component properties.
 * @param {MeterRef} ref - The meter component reference.
 * @returns The rendered meter component.
 */
const Meter = forwardRef<MeterRef, MeterProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <meter ref={ref} {...rest}>
      {children}
    </meter>
  )
})

Meter.displayName = 'Meter'

export default Meter
