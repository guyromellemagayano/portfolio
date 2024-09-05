import React from 'react'

export type TableRowRef = HTMLTableRowElement
export type TableRowProps = React.HTMLAttributes<TableRowRef>

/**
 * Render the table row component.
 * @param {TableRowProps} props - The table row component properties
 * @param {TableRowRef} ref - The table row component reference
 * @returns The rendered table row component
 */
const TableRow = React.forwardRef<TableRowRef, TableRowProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tr ref={ref} {...rest}>
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'

export default TableRow
