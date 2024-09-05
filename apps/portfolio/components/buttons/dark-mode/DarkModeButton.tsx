'use client'

import { forwardRef, useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

import { Button, ButtonProps, ButtonRef } from '@react-components'

import { cn } from '@react-utils'

import { MoonSvg, SunSvg } from '@portfolio/components/svg'

export type DarkModeButtonRef = ButtonRef
export type DarkModeButtonProps = ButtonProps

/**
 * Renders dark mode button component.
 * @param {DarkModeButtonProps} props - The component props
 * @param {DarkModeButtonRef} ref - The component reference
 * @returns The rendered dark mode button component
 */
const DarkModeButton = forwardRef<DarkModeButtonRef, DarkModeButtonProps>(
  ({ className, ...rest }, ref) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    const { resolvedTheme, setTheme } = useTheme()
    const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

    return (
      <Button
        ref={ref}
        className={cn(
          className,
          'group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
        )}
        aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
        {...rest}
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
