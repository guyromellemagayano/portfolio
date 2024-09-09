import React from 'react'

export type TableHeadRef = HTMLTableSectionElement
export type TableHeadProps = React.HTMLAttributes<TableHeadRef>

/**
 * Render the table head component.
 * @param {TableHeadProps} props - The table head component properties
 * @param {TableHeadRef} ref - The table head component reference
 * @returns The rendered table head component
 */
const TableHead = React.forwardRef<TableHeadRef, TableHeadProps>(
  ({ children, ...rest }, ref) => {
    return (
      <thead ref={ref} {...rest}>
        {children}
      </thead>
    )
  }
)

TableHead.displayName = 'TableHead'

export default TableHead
