import React from 'react'

export type TOptgroupRef = HTMLOptGroupElement
export type TOptgroupProps = React.OptgroupHTMLAttributes<TOptgroupRef>

/**
 * Render the optgroup component.
 * @param {TOptgroupProps} props - The optgroup component properties
 * @param {TOptgroupRef} ref - The optgroup component reference
 * @returns The rendered optgroup component
 */
const Optgroup = React.forwardRef<TOptgroupRef, TOptgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <optgroup ref={ref} {...rest}>
        {children}
      </optgroup>
    )
  }
)

Optgroup.displayName = 'Optgroup'

export default Optgroup
