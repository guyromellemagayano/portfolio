'use client'

import { ScriptHTMLAttributes } from 'react'

import dynamic from 'next/dynamic'

export const NextScript = dynamic(() => import('next/script'))

export type ScriptRef = HTMLScriptElement
export type ScriptProps = ScriptHTMLAttributes<ScriptRef>

/**
 * Render the script component
 * @param children - The children of the script.
 * @param rest - The rest of the props of the script.
 * @returns The rendered script component.
 */
export const Script = ({ children, ...rest }: ScriptProps) => {
  return <script {...rest}>{children}</script>
}

Script.displayName = 'Script'

export default Script
