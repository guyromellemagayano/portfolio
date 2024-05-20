import { TdHTMLAttributes, forwardRef } from 'react'

export type TableDataRef = HTMLTableCellElement
export type TableDataProps = TdHTMLAttributes<TableDataRef>

/**
 * Render the table data component.
 * @param {TableDataProps} props - The table data component properties.
 * @param {TableDataRef} ref - The table data component reference.
 * @returns The rendered table data component.
 */
const TableData = forwardRef<TableDataRef, TableDataProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <td ref={ref} {...rest}>
      {children}
    </td>
  )
})

TableData.displayName = 'TableData'

export default TableData
