'use client'

import { useEffect } from 'react'

import { useTheme } from 'next-themes'

/**
 * `ThemeWatcher` component that watches for changes in the system theme and updates the theme accordingly.
 * @returns The rendered `ThemeWatcher` component
 */
export const ThemeWatcher = (): null => {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onMediaChange = () => {
      const systemTheme = media.matches ? 'dark' : 'light'

      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

ThemeWatcher.displayName = 'ThemeWatcher'
