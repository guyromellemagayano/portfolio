'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type SuperscriptRef = HTMLElement
export type SuperscriptProps = HTMLAttributes<SuperscriptRef>

/**
 * Render the superscript component.
 * @param {SuperscriptProps} props - The superscript component properties.
 * @param {SuperscriptRef} ref - The superscript component reference.
 * @returns The rendered superscript component.
 */
const Superscript = forwardRef<SuperscriptRef, SuperscriptProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <sup ref={ref} {...rest}>
        {children}
      </sup>
    )
  }
)

Superscript.displayName = 'Superscript'

export default Superscript
