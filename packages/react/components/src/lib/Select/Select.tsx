import React from 'react'

export type TSelectRef = HTMLSelectElement
export type TSelectProps = React.SelectHTMLAttributes<TSelectRef>

/**
 * Render the select component
 * @param {TSelectProps} props - The select component properties
 * @param {TSelectRef} ref - The select component reference
 * @returns The rendered select component
 */
const Select = React.forwardRef<TSelectRef, TSelectProps>(
  ({ children, ...rest }, ref) => {
    return (
      <select ref={ref} {...rest}>
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

export default Select
