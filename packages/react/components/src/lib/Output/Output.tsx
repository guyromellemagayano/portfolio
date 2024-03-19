import { OutputHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type OutputRef = HTMLOutputElement
export type OutputProps = OutputHTMLAttributes<OutputRef>

/**
 * Render the output component.
 * @param children - The children of the output.
 * @param rest - The rest of the props of the output.
 * @returns The rendered output component.
 */
const Output = forwardRef<OutputRef, OutputProps>(
  ({ children, ...rest }, ref) => {
    return (
      <output ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </output>
    )
  }
)

Output.displayName = 'Output'

export default Output
