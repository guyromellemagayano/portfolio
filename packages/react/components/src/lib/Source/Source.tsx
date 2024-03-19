import { SourceHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type SourceRef = HTMLSourceElement
export type SourceProps = SourceHTMLAttributes<SourceRef>

/**
 * Render the source component.
 * @param children - The children of the source.
 * @param rest - The rest of the props of the source.
 * @returns The rendered source component.
 */
const Source = forwardRef<SourceRef, SourceProps>(
  ({ children, ...rest }, ref) => {
    return (
      <source ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </source>
    )
  }
)

Source.displayName = 'Source'

export default Source
