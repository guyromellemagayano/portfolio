import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type MarkRef = HTMLElement
export type MarkProps = HTMLAttributes<MarkRef>

/**
 * Render the mark component.
 * @param children - The children of the mark.
 * @param rest - The rest of the props of the mark.
 * @returns The rendered mark component.
 */
const Mark = forwardRef<MarkRef, MarkProps>(({ children, ...rest }, ref) => {
  return (
    <mark ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </mark>
  )
})

Mark.displayName = 'Mark'

export default Mark
