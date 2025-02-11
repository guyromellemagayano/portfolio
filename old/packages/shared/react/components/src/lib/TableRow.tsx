import React from 'react'

export type TTableRowRef = HTMLTableRowElement
export type TTableRowProps = React.HTMLAttributes<TTableRowRef>

/**
 * Render the table row component.
 * @param {TTableRowProps} props - The table row component properties
 * @param {TTableRowRef} ref - The table row component reference
 * @returns The rendered table row component
 */
const TableRow = React.forwardRef<TTableRowRef, TTableRowProps>(
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
