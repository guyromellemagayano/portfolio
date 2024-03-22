'use client'

import { ColgroupHTMLAttributes, forwardRef } from 'react'

export type ColumnGroupRef = HTMLTableColElement
export type ColumnGroupProps = ColgroupHTMLAttributes<ColumnGroupRef>

/**
 * Render the column group component.
 * @param children - The children of the column group.
 * @param rest - The rest of the props of the column group.
 * @returns The rendered column group component.
 */
export const ColumnGroup = forwardRef<ColumnGroupRef, ColumnGroupProps>(
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
