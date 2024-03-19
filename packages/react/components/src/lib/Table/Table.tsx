import { TableHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type TableRef = HTMLTableElement
export type TableProps = TableHTMLAttributes<TableRef>

/**
 * Render the table component.
 * @param children - The children of the table.
 * @param rest - The rest of the props of the table.
 * @returns The rendered table component.
 */
const Table = forwardRef<TableRef, TableProps>(({ children, ...rest }, ref) => {
  return (
    <table ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </table>
  )
})

Table.displayName = 'Table'

export default Table
