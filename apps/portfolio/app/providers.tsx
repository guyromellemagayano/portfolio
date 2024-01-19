'use client'

import { createContext, useEffect, useRef } from 'react'

import { ThemeProvider, useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'

/**
 * Custom hook that returns the previous value of a given value.
 * @param value - The value to return the previous value of.
 * @returns The previous value of the given value.
 */
const usePrevious = <T,>(value: T): T | undefined => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

/**
 * ThemeWatcher component that watches for changes in the system theme and updates the theme accordingly.
 * @returns The rendered ThemeWatcher component.
 */
const ThemeWatcher = (): null => {
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

/**
 * AppContext that provides the previous pathname to the application.
 */
export const AppContext = createContext<{ previousPathname?: string }>({})

/**
 * Providers component that provides the application with the previous pathname and theme.
 * @param children - The child elements to be rendered within the layout.
 * @returns The rendered Providers component.
 */
export const Providers = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}
