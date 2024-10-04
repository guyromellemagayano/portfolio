import React from 'react'

export type TTableBodyRef = HTMLTableSectionElement
export type TTableBodyProps = React.HTMLAttributes<TTableBodyRef>

/**
 * Render the table body component.
 * @param {TTableBodyProps} props - The table body component properties
 * @param {TTableBodyRef} ref - The table body component reference
 * @returns The rendered table body component
 */
const TableBody = React.forwardRef<TTableBodyRef, TTableBodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tbody ref={ref} {...rest}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export default TableBody
