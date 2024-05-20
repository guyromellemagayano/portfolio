import { forwardRef } from 'react'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type ProseRef = DivisionRef
export type ProseProps = DivisionProps

/**
 * Renders the prose component.
 * @param {ProseProps} props - The properties to render the prose component.
 * @param {ProseRef} ref - The reference of the prose component.
 * @returns The rendered prose component.
 */
const Prose = forwardRef<ProseRef, ProseProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      children && (
        <Div
          {...rest}
          ref={ref}
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
