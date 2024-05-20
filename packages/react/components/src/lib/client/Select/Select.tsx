'use client'

import { SelectHTMLAttributes, forwardRef } from 'react'

export type SelectRef = HTMLSelectElement
export type SelectProps = SelectHTMLAttributes<SelectRef>

/**
 * Render the select component.
 * @param {SelectProps} props - The select component properties.
 * @param {SelectRef} ref - The select component reference.
 * @returns The rendered select component.
 */
const Select = forwardRef<SelectRef, SelectProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <select ref={ref} {...rest}>
      {children}
    </select>
  )
})

Select.displayName = 'Select'

export default Select
