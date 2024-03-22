'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type TableBodyRef = HTMLTableSectionElement
export type TableBodyProps = HTMLAttributes<TableBodyRef>

/**
 * Render the table body component.
 * @param children - The children of the table body.
 * @param rest - The rest of the props of the table body.
 * @returns The rendered table body component.
 */
export const TableBody = forwardRef<TableBodyRef, TableBodyProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tbody ref={ref} {...rest}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export default TableBody
