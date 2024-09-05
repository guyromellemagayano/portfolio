'use client'

import React from 'react'

export type NoscriptRef = HTMLScriptElement
export type NoscriptProps = React.ScriptHTMLAttributes<NoscriptRef>

/**
 * Render the noscript component.
 * @param {NoscriptProps} props - The noscript component properties
 * @param {NoscriptRef} ref - The noscript component reference
 * @returns The rendered noscript component
 */
const Noscript = React.forwardRef<NoscriptRef, NoscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <noscript ref={ref} {...rest}>
        {children}
      </noscript>
    )
  }
)

Noscript.displayName = 'Noscript'

export default Noscript
