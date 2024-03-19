import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type DefinitionTermRef = HTMLElement
export type DefinitionTermProps = HTMLAttributes<DefinitionTermRef>

/**
 * Render the definition term component.
 * @param children - The children of the definition term.
 * @param rest - The rest of the props of the definition term.
 * @returns The rendered definition term component.
 */
const DefinitionTerm = forwardRef<DefinitionTermRef, DefinitionTermProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dfn ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </dfn>
    )
  }
)

DefinitionTerm.displayName = 'DefinitionTerm'

export default DefinitionTerm
