import React from 'react'

export type TTableHeaderRef = HTMLTableCellElement
export type TTableHeaderProps = React.ThHTMLAttributes<TTableHeaderRef>

/**
 * Render the table header component.
 * @param {TTableHeaderProps} props - The table header component properties
 * @param {TTableHeaderRef} ref - The table header component reference
 * @returns The rendered table header component
 */
const TableHeader = React.forwardRef<TTableHeaderRef, TTableHeaderProps>(
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
