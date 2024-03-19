import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type TableBodyRef = HTMLTableSectionElement
export type TableBodyProps = HTMLAttributes<TableBodyRef>

/**
 * Render the table body component.
 * @param children - The children of the table body.
 * @param rest - The rest of the props of the table body.
 * @returns The rendered table body component.
 */
const TableBody = forwardRef<TableBodyRef, TableBodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tbody ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export default TableBody
