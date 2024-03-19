import { ColgroupHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type ColumnGroupRef = HTMLTableColElement
export type ColumnGroupProps = ColgroupHTMLAttributes<ColumnGroupRef>

/**
 * Render the column group component.
 * @param children - The children of the column group.
 * @param rest - The rest of the props of the column group.
 * @returns The rendered column group component.
 */
const ColumnGroup = forwardRef<ColumnGroupRef, ColumnGroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <colgroup ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </colgroup>
    )
  }
)

ColumnGroup.displayName = 'ColumnGroup'

export default ColumnGroup