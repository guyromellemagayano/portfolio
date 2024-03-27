import { HTMLAttributes, forwardRef } from 'react'

export type TableHeadRef = HTMLTableSectionElement
export type TableHeadProps = HTMLAttributes<TableHeadRef>

/**
 * Render the table head component.
 * @param children - The children of the table head.
 * @param rest - The rest of the props of the table head.
 * @returns The rendered table head component.
 */
export const TableHead = forwardRef<TableHeadRef, TableHeadProps>(
  ({ children, ...rest }, ref) => {
    return (
      <thead ref={ref} {...rest}>
        {children}
      </thead>
    )
  }
)

TableHead.displayName = 'TableHead'

export default TableHead
