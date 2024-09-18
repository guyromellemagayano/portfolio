'use client'

import { createContext } from 'react'

import { usePrevious } from '@uidotdev/usehooks'
import { ThemeProvider } from 'next-themes'

import { TBaseLayoutProps } from '@portfolio/components'
import { usePathname } from '@portfolio/i18n/routing'
import {
  CtfLivePreviewProvider,
  CtfProvider,
  ThemeWatcherProvider
} from '@portfolio/providers'

// App context that provides the previous pathname to the application.
export const AppContext = createContext<{ previousPathname?: string }>({})

export type TProvidersProps = Pick<TBaseLayoutProps, 'children'>

/**
 * Providers app that provides the application with the previous pathname and theme.
 * @param {TProvidersProps} props - The app props
 * @returns The rendered providers app
 */
const Providers = ({ children }: TProvidersProps) => {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <CtfProvider>
        <CtfLivePreviewProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <ThemeWatcherProvider />
            {children}
          </ThemeProvider>
        </CtfLivePreviewProvider>
      </CtfProvider>
    </AppContext.Provider>
  )
}

Providers.displayName = 'Providers'

export default Providers
