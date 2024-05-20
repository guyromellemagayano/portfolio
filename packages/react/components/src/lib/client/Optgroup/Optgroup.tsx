'use client'

import { OptgroupHTMLAttributes, forwardRef } from 'react'

export type OptgroupRef = HTMLOptGroupElement
export type OptgroupProps = OptgroupHTMLAttributes<OptgroupRef>

/**
 * Render the optgroup component.
 * @param {OptgroupProps} props - The optgroup component properties.
 * @param {OptgroupRef} ref - The optgroup component reference.
 * @returns The rendered optgroup component.
 */
const Optgroup = forwardRef<OptgroupRef, OptgroupProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <optgroup ref={ref} {...rest}>
      {children}
    </optgroup>
  )
})

Optgroup.displayName = 'Optgroup'

export default Optgroup
