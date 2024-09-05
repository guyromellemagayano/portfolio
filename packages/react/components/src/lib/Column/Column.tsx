import React from 'react'

export type ColumnRef = HTMLTableColElement
export type ColumnProps = React.ColHTMLAttributes<ColumnRef>

/**
 * Render the column component.
 * @param {ColumnProps} props - The column component properties
 * @param {ColumnRef} ref - The column component reference
 * @returns The rendered column component
 */
const Column = React.forwardRef<ColumnRef, ColumnProps>(
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
