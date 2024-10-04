import React from 'react'

export type TNoscriptRef = HTMLScriptElement
export type TNoscriptProps = React.ScriptHTMLAttributes<TNoscriptRef>

/**
 * Render the noscript component.
 * @param {TNoscriptProps} props - The noscript component properties
 * @param {TNoscriptRef} ref - The noscript component reference
 * @returns The rendered noscript component
 */
const Noscript = React.forwardRef<TNoscriptRef, TNoscriptProps>(
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
