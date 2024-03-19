import { ThHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type TableHeaderRef = HTMLTableCellElement
export type TableHeaderProps = ThHTMLAttributes<TableHeaderRef>

/**
 * Render the table header component.
 * @param children - The children of the table header.
 * @param rest - The rest of the props of the table header.
 * @returns The rendered table header component.
 */
const TableHeader = forwardRef<TableHeaderRef, TableHeaderProps>(
  ({ children, ...rest }, ref) => {
    return (
      <th ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </th>
    )
  }
)

TableHeader.displayName = 'TableHeader'

export default TableHeader
