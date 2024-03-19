import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type TableFooterRef = HTMLTableSectionElement
export type TableFooterProps = HTMLAttributes<TableFooterRef>

/**
 * Render the table footer component.
 * @param children - The children of the table footer.
 * @param rest - The rest of the props of the table footer.
 * @returns The rendered table footer component.
 */
const TableFooter = forwardRef<TableFooterRef, TableFooterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tfoot ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </tfoot>
    )
  }
)

TableFooter.displayName = 'TableFooter'

export default TableFooter
