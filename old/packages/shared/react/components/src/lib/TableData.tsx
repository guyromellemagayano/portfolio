import React from 'react'

export type TTableDataRef = HTMLTableCellElement
export type TTableDataProps = React.TdHTMLAttributes<TTableDataRef>

/**
 * Render the table data component.
 * @param {TTableDataProps} props - The table data component properties
 * @param {TTableDataRef} ref - The table data component reference
 * @returns The rendered table data component
 */
const TableData = React.forwardRef<TTableDataRef, TTableDataProps>(
  ({ children, ...rest }, ref) => {
    return (
      <td ref={ref} {...rest}>
        {children}
      </td>
    )
  }
)

TableData.displayName = 'TableData'

export default TableData
