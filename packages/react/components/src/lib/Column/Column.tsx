import React from 'react'

export type TColumnRef = HTMLTableColElement
export type TColumnProps = React.ColHTMLAttributes<TColumnRef>

/**
 * Render the column component.
 * @param {TColumnProps} props - The column component properties
 * @param {TColumnRef} ref - The column component reference
 * @returns The rendered column component
 */
const Column = React.forwardRef<TColumnRef, TColumnProps>(
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
