import { ThHTMLAttributes, forwardRef } from 'react'

export type TableHeaderRef = HTMLTableCellElement
export type TableHeaderProps = ThHTMLAttributes<TableHeaderRef>

/**
 * Render the table header component.
 * @param children - The children of the table header.
 * @param rest - The rest of the props of the table header.
 * @returns The rendered table header component.
 */
export const TableHeader = forwardRef<TableHeaderRef, TableHeaderProps>(
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
