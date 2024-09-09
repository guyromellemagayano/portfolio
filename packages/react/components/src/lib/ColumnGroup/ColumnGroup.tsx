import React from 'react'

export type ColumnGroupRef = HTMLTableColElement
export type ColumnGroupProps = React.ColgroupHTMLAttributes<ColumnGroupRef>

/**
 * Render the column group component.
 * @param {ColumnGroupProps} props - The column group component properties
 * @param {ColumnGroupRef} ref - The column group component reference
 * @returns The rendered column group component
 */
const ColumnGroup = React.forwardRef<ColumnGroupRef, ColumnGroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <colgroup ref={ref} {...rest}>
        {children}
      </colgroup>
    )
  }
)

ColumnGroup.displayName = 'ColumnGroup'

export default ColumnGroup
