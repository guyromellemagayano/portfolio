import { forwardRef } from 'react'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isEmpty } from '@guy-romelle-magayano/react-utils'

export type ProseRef = DivisionRef
export type ProseProps = DivisionProps

/**
 * Renders the prose component.
 * @param children - The children of the prose.
 * @param className - The class name of the prose.
 * @param rest - The rest of the prose props.
 * @returns The rendered prose component.
 */
const Prose = forwardRef<ProseRef, ProseProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      !isEmpty(children) && (
        <Div
          ref={ref}
          {...rest}
          className={cn('prose dark:prose-invert', className)}
        >
          {children}
        </Div>
      )
    )
  }
)

Prose.displayName = 'Prose'

export default Prose
