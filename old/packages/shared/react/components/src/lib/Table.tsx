import React from 'react'

export type TTableRef = HTMLTableElement
export type TTableProps = React.TableHTMLAttributes<TTableRef>

/**
 * Render the table component.
 * @param {TTableProps} props - The table component properties
 * @param {TTableRef} ref - The table component reference
 * @returns The rendered table component
 */
const Table = React.forwardRef<TTableRef, TTableProps>(
  ({ children, ...rest }, ref) => {
    return (
      <table ref={ref} {...rest}>
        {children}
      </table>
    )
  }
)

Table.displayName = 'Table'

export default Table
