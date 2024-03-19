import { TdHTMLAttributes, forwardRef } from 'react'

export type TableDataRef = HTMLTableCellElement
export type TableDataProps = TdHTMLAttributes<TableDataRef>

/**
 * Render the table data component.
 * @param children - The children of the table data.
 * @param rest - The rest of the props of the table data.
 * @returns The rendered table data component.
 */
const TableData = forwardRef<TableDataRef, TableDataProps>(
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
