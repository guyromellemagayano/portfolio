import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type StrongRef = HTMLElement
export type StrongProps = HTMLAttributes<StrongRef>

/**
 * Render the strong component.
 * @param children - The children of the strong.
 * @param rest - The rest of the props of the strong.
 * @returns The rendered strong component.
 */
const Strong = forwardRef<StrongRef, StrongProps>(
  ({ children, ...rest }, ref) => {
    return (
      <strong ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </strong>
    )
  }
)

Strong.displayName = 'Strong'

export default Strong
