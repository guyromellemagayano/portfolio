'use client'

import { forwardRef, memo, useEffect, useMemo, useState } from 'react'

import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

import { Button, type TButtonProps, type TButtonRef } from '@react-components'

import { cn } from '@react-utils'

// Dynamic imports
const MoonSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.MoonSvg)
)
const SunSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.SunSvg)
)

export type TDarkModeButtonRef = TButtonRef
export type TDarkModeButtonProps = TButtonProps

/**
 * Renders dark mode button component.
 * @param {TDarkModeButtonProps} props - The component props
 * @param {TDarkModeButtonRef} ref - The component reference
 * @returns The rendered dark mode button component
 */
const DarkModeButton = memo(
  forwardRef<TDarkModeButtonRef, TDarkModeButtonProps>(
    ({ className, ...rest }, ref) => {
      const [mounted, setMounted] = useState(false)

      useEffect(() => {
        setMounted(true)
      }, [])

      const { resolvedTheme, setTheme } = useTheme()
      const otherTheme = useMemo(
        () => (resolvedTheme === 'dark' ? 'light' : 'dark'),
        [resolvedTheme]
      )
      const ariaLabel = useMemo(
        () => (mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'),
        [mounted, otherTheme]
      )

      return (
        <Button
          ref={ref}
          className={cn(
            'group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
            className
          )}
          onClick={() => setTheme(otherTheme)}
          aria-label={ariaLabel}
          {...rest}
        >
          <SunSvg
            className={cn(
              'h-6 w-6 fill-zinc-100 stroke-zinc-500 transition dark:hidden',
              '[prefers-color-scheme:dark]:fill-zinc-50',
              '[prefers-color-scheme:dark]:stroke-zinc-500',
              '[prefers-color-scheme:dark]:group-hover:fill-zinc-50',
              '[prefers-color-scheme:dark]:group-hover:stroke-zinc-600'
            )}
          />
          <MoonSvg
            className={cn(
              'hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block',
              '[prefers-color-scheme:dark]:group-hover:stroke-zinc-400',

              '[prefers-color-scheme:not_(dark)]:fill-zinc-400/10',
              '[prefers-color-scheme:not_(dark)]:stroke-zinc-500'
            )}
          />
        </Button>
      )
    }
  )
)

DarkModeButton.displayName = 'DarkModeButton'

export default DarkModeButton
