import React from 'react'

export type TTableFooterRef = HTMLTableSectionElement
export type TTableFooterProps = React.HTMLAttributes<TTableFooterRef>

/**
 * Render the table footer component.
 * @param {TTableFooterProps} props - The table footer component properties
 * @param {TTableFooterRef} ref - The table footer component reference
 * @returns The rendered table footer component
 */
const TableFooter = React.forwardRef<TTableFooterRef, TTableFooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tfoot ref={ref} {...rest}>
        {children}
      </tfoot>
    )
  }
)

TableFooter.displayName = 'TableFooter'

export default TableFooter
