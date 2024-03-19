import { OptgroupHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type OptgroupRef = HTMLOptGroupElement
export type OptgroupProps = OptgroupHTMLAttributes<OptgroupRef>

/**
 * Render the optgroup component.
 * @param children - The children of the optgroup.
 * @param rest - The rest of the props of the optgroup.
 * @returns The rendered optgroup component.
 */
const Optgroup = forwardRef<OptgroupRef, OptgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <optgroup ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </optgroup>
    )
  }
)

Optgroup.displayName = 'Optgroup'

export default Optgroup
