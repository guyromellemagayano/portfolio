import React from 'react'

export type TableHeaderRef = HTMLTableCellElement
export type TableHeaderProps = React.ThHTMLAttributes<TableHeaderRef>

/**
 * Render the table header component.
 * @param {TableHeaderProps} props - The table header component properties
 * @param {TableHeaderRef} ref - The table header component reference
 * @returns The rendered table header component
 */
const TableHeader = React.forwardRef<TableHeaderRef, TableHeaderProps>(
  ({ children, ...rest }, ref) => {
    return (
      <th ref={ref} {...rest}>
        {children}
      </th>
    )
  }
)

TableHeader.displayName = 'TableHeader'

export default TableHeader
