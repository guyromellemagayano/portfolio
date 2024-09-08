'use client'

import { forwardRef, useEffect, useMemo, useState } from 'react'

import { useTheme } from 'next-themes'

import { Button, type ButtonProps, type ButtonRef } from '@react-components'

import { cn } from '@react-utils'

import { MoonSvg, SunSvg } from '@portfolio/components'

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
    const otherTheme = useMemo(
      () => (resolvedTheme === 'dark' ? 'light' : 'dark'),
      [resolvedTheme]
    )
    const ariaLabel = useMemo(
      () => (mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'),
      [mounted, otherTheme]
    )

    const buttonClass = cn(
      'group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
      className
    )
    const sunSvgClass = cn(
      'h-6 w-6 fill-zinc-100 stroke-zinc-500 transition dark:hidden',
      '[prefers-color-scheme:dark]:fill-zinc-50',
      '[prefers-color-scheme:dark]:stroke-zinc-500',
      '[prefers-color-scheme:dark]:group-hover:fill-zinc-50',
      '[prefers-color-scheme:dark]:group-hover:stroke-zinc-600'
    )
    const moonSvgClass = cn(
      'hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block',
      '[prefers-color-scheme:dark]:group-hover:stroke-zinc-400',
      '[prefers-color-scheme:not_(dark)]:fill-zinc-400/10',
      '[prefers-color-scheme:not_(dark)]:stroke-zinc-500'
    )

    return (
      <Button
        ref={ref}
        className={buttonClass}
        onClick={() => setTheme(otherTheme)}
        aria-label={ariaLabel}
        {...rest}
      >
        <SunSvg className={sunSvgClass} />
        <MoonSvg className={moonSvgClass} />
      </Button>
    )
  }
)

DarkModeButton.displayName = 'DarkModeButton'

export default DarkModeButton
