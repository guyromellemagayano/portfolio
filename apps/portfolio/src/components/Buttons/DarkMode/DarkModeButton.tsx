'use client'

import { forwardRef, useEffect, useState } from 'react'

import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

import { ButtonProps, ButtonRef } from '@guy-romelle-magayano/react-components'

import { cn } from '@guy-romelle-magayano/react-utils'

// Dynamic imports
const Button = dynamic(() =>
  import('@guy-romelle-magayano/react-components').then(mod => mod.Button)
)
const SunSvg = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/SVG').then(
    mod => mod.SunSvg
  )
)
const MoonSvg = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/SVG').then(
    mod => mod.MoonSvg
  )
)

export type DarkModeButtonRef = ButtonRef
export type DarkModeButtonProps = ButtonProps

/**
 * Renders dark mode button component.
 * @param className - The class name of the dark mode button.
 * @param rest - The rest of the dark mode button props.
 * @returns The dark mode button component.
 */
const DarkModeButton = forwardRef<DarkModeButtonRef, DarkModeButtonProps>(
  ({ className, ...rest }, ref) => {
    const { resolvedTheme, setTheme } = useTheme(),
      [mounted, setMounted] = useState(false),
      otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

    useEffect(() => {
      setMounted(true)
    }, [])

    return (
      <Button
        ref={ref}
        {...rest}
        aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
        className={cn(
          className,
          'group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
        )}
        onClick={() => setTheme(otherTheme)}
      >
        <SunSvg className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-amber-50 [@media(prefers-color-scheme:dark)]:stroke-amber-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-amber-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-amber-600" />
        <MoonSvg className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-amber-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-amber-500" />
      </Button>
    )
  }
)

DarkModeButton.displayName = 'DarkModeButton'

export default DarkModeButton
