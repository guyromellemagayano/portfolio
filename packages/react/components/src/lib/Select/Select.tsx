import { SelectHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type SelectRef = HTMLSelectElement
export type SelectProps = SelectHTMLAttributes<SelectRef>

/**
 * Render the select component.
 * @param children - The children of the select.
 * @param rest - The rest of the props of the select.
 * @returns The rendered select component.
 */
const Select = forwardRef<SelectRef, SelectProps>(
  ({ children, ...rest }, ref) => {
    return (
      <select ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

export default Select
