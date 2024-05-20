import { ColgroupHTMLAttributes, forwardRef } from 'react'

export type ColumnGroupRef = HTMLTableColElement
export type ColumnGroupProps = ColgroupHTMLAttributes<ColumnGroupRef>

/**
 * Render the column group component.
 * @param {ColumnGroupProps} props - The column group component properties.
 * @param {ColumnGroupRef} ref - The column group component reference.
 * @returns The rendered column group component.
 */
const ColumnGroup = forwardRef<ColumnGroupRef, ColumnGroupProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <colgroup ref={ref} {...rest}>
        {children}
      </colgroup>
    )
  }
)

ColumnGroup.displayName = 'ColumnGroup'

export default ColumnGroup
