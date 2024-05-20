'use client'

import { ScriptHTMLAttributes, forwardRef } from 'react'

export type NoscriptRef = HTMLScriptElement
export type NoscriptProps = ScriptHTMLAttributes<NoscriptRef>

/**
 * Render the noscript component
 * @param {NoscriptProps} props - The noscript component properties.
 * @param {NoscriptRef} ref - The noscript component reference.
 * @returns The rendered noscript component.
 */
const Noscript = forwardRef<NoscriptRef, NoscriptProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <noscript ref={ref} {...rest}>
      {children}
    </noscript>
  )
})

Noscript.displayName = 'Noscript'

export default Noscript
