'use client'

import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

import MoonSvg from '@guy-romelle-magayano/portfolio/components/svg/Moon'
import SunSvg from '@guy-romelle-magayano/portfolio/components/svg/Sun'

import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

/**
 * Renders dark mode button component.
 * @returns The dark mode button component.
 */
const DarkModeButton = () => {
  const { resolvedTheme, setTheme } = useTheme(),
    [mounted, setMounted] = useState(false),
    otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <SharedReactComponent.Button
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(otherTheme)}
    >
      <SunSvg className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-amber-50 [@media(prefers-color-scheme:dark)]:stroke-amber-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-amber-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-amber-600" />
      <MoonSvg className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-amber-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-amber-500" />
    </SharedReactComponent.Button>
  )
}

DarkModeButton.displayName = 'DarkModeButton'

export default DarkModeButton