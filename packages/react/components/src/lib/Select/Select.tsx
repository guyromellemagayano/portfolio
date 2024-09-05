import React from 'react'

export type SelectRef = HTMLSelectElement
export type SelectProps = React.SelectHTMLAttributes<SelectRef>

/**
 * Render the select component
 * @param {SelectProps} props - The select component properties
 * @param {SelectRef} ref - The select component reference
 * @returns The rendered select component
 */
const Select = React.forwardRef<SelectRef, SelectProps>(
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
