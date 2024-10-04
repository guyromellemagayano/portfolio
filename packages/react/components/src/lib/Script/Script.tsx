import React from 'react'

export type TScriptRef = HTMLScriptElement
export type TScriptProps = React.ScriptHTMLAttributes<TScriptRef>

/**
 * Render the script component.
 * @param {TScriptProps} props - The script component properties
 * @returns The rendered script component
 */
const Script = ({ children, ...rest }: TScriptProps) => {
  return <script {...rest}>{children}</script>
}

Script.displayName = 'Script'

export default Script
