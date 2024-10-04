import { forwardRef, memo } from 'react'

import { Div, type TDivisionProps, type TDivisionRef } from '@react-components'

import { cn } from '@react-utils'

export type ProseRef = TDivisionRef
export type ProseProps = TDivisionProps

/**
 * Renders the prose component.
 * @param {ProseProps} props - The component props
 * @param {ProseRef} ref - The component reference
 * @returns The rendered prose component
 */
const Prose = memo(
  forwardRef<ProseRef, ProseProps>(({ children, className, ...rest }, ref) => {
    if (!children) return null

    return (
      <Div
        ref={ref}
        className={cn('prose dark:prose-invert', className)}
        {...rest}
      >
        {children}
      </Div>
    )
  })
)

Prose.displayName = 'Prose'

export default Prose
