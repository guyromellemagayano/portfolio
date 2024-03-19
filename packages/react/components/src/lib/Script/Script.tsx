import { ScriptHTMLAttributes, forwardRef } from 'react'

export type ScriptRef = HTMLScriptElement
export type ScriptProps = ScriptHTMLAttributes<ScriptRef>

/**
 * Render the script component
 * @param children - The children of the script.
 * @param rest - The rest of the props of the script.
 * @returns The rendered script component.
 */
const Script = forwardRef<ScriptRef, ScriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <script ref={ref} {...rest}>
        {children}
      </script>
    )
  }
)

Script.displayName = 'Script'

export default Script
