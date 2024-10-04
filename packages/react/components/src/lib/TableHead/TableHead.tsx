import React from 'react'

export type TTableHeadRef = HTMLTableSectionElement
export type TTableHeadProps = React.HTMLAttributes<TTableHeadRef>

/**
 * Render the table head component.
 * @param {TTableHeadProps} props - The table head component properties
 * @param {TTableHeadRef} ref - The table head component reference
 * @returns The rendered table head component
 */
const TableHead = React.forwardRef<TTableHeadRef, TTableHeadProps>(
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
