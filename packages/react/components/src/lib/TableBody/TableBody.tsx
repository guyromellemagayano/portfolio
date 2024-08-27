import React from 'react'

export type TableBodyRef = HTMLTableSectionElement
export type TableBodyProps = React.HTMLAttributes<TableBodyRef>

/**
 * Render the table body component
 * @param {TableBodyProps} props - The table body component properties
 * @param {TableBodyRef} ref - The table body component reference
 * @returns The rendered table body component
 */
const TableBody = React.forwardRef<TableBodyRef, TableBodyProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <tbody ref={ref} {...rest}>
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export default TableBody
