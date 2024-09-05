import React from 'react'

export type TableDataRef = HTMLTableCellElement
export type TableDataProps = React.TdHTMLAttributes<TableDataRef>

/**
 * Render the table data component.
 * @param {TableDataProps} props - The table data component properties
 * @param {TableDataRef} ref - The table data component reference
 * @returns The rendered table data component
 */
const TableData = React.forwardRef<TableDataRef, TableDataProps>(
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
