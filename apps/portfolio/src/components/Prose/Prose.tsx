import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type ProseRef = DivisionRef
export type ProseProps = DivisionProps

// Dynamic Imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)

/**
 * Renders the prose component.
 * @param children - The children of the prose.
 * @param className - The class name of the prose.
 * @param rest - The rest of the prose props.
 * @returns The rendered prose component.
 */
export const Prose = forwardRef<ProseRef, ProseProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <Div
        ref={ref}
        className={cn('prose dark:prose-invert', className)}
        {...rest}
      >
        {children}
      </Div>
    )
  }
)

Prose.displayName = 'Prose'

export default Prose
