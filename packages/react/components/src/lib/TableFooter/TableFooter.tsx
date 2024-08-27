import React from 'react'

export type TableFooterRef = HTMLTableSectionElement
export type TableFooterProps = React.HTMLAttributes<TableFooterRef>

/**
 * Render the table footer component
 * @param {TableFooterProps} props - The table footer component properties
 * @param {TableFooterRef} ref - The table footer component reference
 * @returns The rendered table footer component
 */
const TableFooter = React.forwardRef<TableFooterRef, TableFooterProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <tfoot ref={ref} {...rest}>
        {children}
      </tfoot>
    )
  }
)

TableFooter.displayName = 'TableFooter'

export default TableFooter
