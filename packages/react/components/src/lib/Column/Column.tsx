'use client'

import { ColHTMLAttributes, forwardRef } from 'react'

export type ColumnRef = HTMLTableColElement
export type ColumnProps = ColHTMLAttributes<ColumnRef>

/**
 * Render the column component.
 * @param children - The children of the column.
 * @param rest - The rest of the props of the column.
 * @returns The rendered column component.
 */
export const Column = forwardRef<ColumnRef, ColumnProps>(
  ({ children, ...rest }, ref) => {
    return (
      <col ref={ref} {...rest}>
        {children}
      </col>
    )
  }
)

Column.displayName = 'Column'

export default Column
