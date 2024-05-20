'use client'

import { OutputHTMLAttributes, forwardRef } from 'react'

export type OutputRef = HTMLOutputElement
export type OutputProps = OutputHTMLAttributes<OutputRef>

/**
 * Render the output component.
 * @param {OutputProps} props - The output component properties.
 * @param {OutputRef} ref - The output component reference.
 * @returns The rendered output component.
 */
const Output = forwardRef<OutputRef, OutputProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <output ref={ref} {...rest}>
      {children}
    </output>
  )
})

Output.displayName = 'Output'

export default Output
