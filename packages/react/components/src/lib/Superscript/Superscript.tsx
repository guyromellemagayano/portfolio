import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type SuperscriptRef = HTMLElement
export type SuperscriptProps = HTMLAttributes<SuperscriptRef>

/**
 * Render the superscript component.
 * @param children - The children of the superscript.
 * @param rest - The rest of the props of the superscript.
 * @returns The rendered superscript component.
 */
const Superscript = forwardRef<SuperscriptRef, SuperscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sup ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </sup>
    )
  }
)

Superscript.displayName = 'Superscript'

export default Superscript
