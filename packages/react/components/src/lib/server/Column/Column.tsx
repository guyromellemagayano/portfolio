import { ColHTMLAttributes, forwardRef } from 'react'

export type ColumnRef = HTMLTableColElement
export type ColumnProps = ColHTMLAttributes<ColumnRef>

/**
 * Render the column component.
 * @param {ColumnProps} props - The column component properties.
 * @param {ColumnRef} ref - The column component reference.
 * @returns The rendered column component.
 */
const Column = forwardRef<ColumnRef, ColumnProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <col ref={ref} {...rest}>
      {children}
    </col>
  )
})

Column.displayName = 'Column'

export default Column
