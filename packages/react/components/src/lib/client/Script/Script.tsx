'use client'

import { ScriptHTMLAttributes } from 'react'

import dynamic from 'next/dynamic'

export const NextScript = dynamic(() => import('next/script'))

export type ScriptRef = HTMLScriptElement
export type ScriptProps = ScriptHTMLAttributes<ScriptRef>

/**
 * Render the script component
 * @param {ScriptProps} props - The script component properties.
 * @returns The rendered script component.
 */
const Script = (props: ScriptProps) => {
  const { children, ...rest } = props

  return <script {...rest}>{children}</script>
}

Script.displayName = 'Script'

export default Script
