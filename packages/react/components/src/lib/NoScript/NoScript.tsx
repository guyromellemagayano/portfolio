import { ScriptHTMLAttributes, forwardRef } from 'react'

export type NoscriptRef = HTMLScriptElement
export type NoscriptProps = ScriptHTMLAttributes<NoscriptRef>

/**
 * Render the noscript component
 * @param children - The children of the noscript.
 * @param rest - The rest of the props of the noscript.
 * @returns The rendered noscript component.
 */
const Noscript = forwardRef<NoscriptRef, NoscriptProps>(
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
