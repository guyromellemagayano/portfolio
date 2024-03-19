import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type TableRowRef = HTMLTableRowElement
export type TableRowProps = HTMLAttributes<TableRowRef>

/**
 * Render the table row component.
 * @param children - The children of the table row.
 * @param rest - The rest of the props of the table row.
 * @returns The rendered table row component.
 */
const TableRow = forwardRef<TableRowRef, TableRowProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tr ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'

export default TableRow
