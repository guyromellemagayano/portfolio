'use client'

import React from 'react'

export type ScriptRef = HTMLScriptElement
export type ScriptProps = React.ScriptHTMLAttributes<ScriptRef>

/**
 * Render the script component
 * @param {ScriptProps} props - The script component properties
 * @returns The rendered script component
 */
const Script = (props: ScriptProps) => {
  const { children, ...rest } = props

  return <script {...rest}>{children}</script>
}

Script.displayName = 'Script'

export default Script
