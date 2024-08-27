import React from 'react'

export type TableRef = HTMLTableElement
export type TableProps = React.TableHTMLAttributes<TableRef>

/**
 * Render the table component
 * @param {TableProps} props - The table component properties
 * @param {TableRef} ref - The table component reference
 * @returns The rendered table component
 */
const Table = React.forwardRef<TableRef, TableProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <table ref={ref} {...rest}>
      {children}
    </table>
  )
})

Table.displayName = 'Table'

export default Table
