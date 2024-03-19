import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type CodeRef = HTMLElement
export type CodeProps = HTMLAttributes<CodeRef>

/**
 * Render the code component.
 * @param children - The children of the code.
 * @param rest - The rest of the props of the code.
 * @returns The rendered code component.
 */
const Code = forwardRef<CodeRef, CodeProps>(({ children, ...rest }, ref) => {
  return (
    <code ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </code>
  )
})

Code.displayName = 'Code'

export default Code
