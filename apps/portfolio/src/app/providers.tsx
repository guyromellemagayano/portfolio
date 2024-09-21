'use client'

import { createContext } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { usePrevious } from '@uidotdev/usehooks'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'

import type { TBaseLayoutProps } from '@portfolio/components'
import { IS_DEV } from '@portfolio/configs'
// import { usePathname } from '@portfolio/i18n/routing'
import { getQueryClient } from '@portfolio/libs'
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

  const queryClient = getQueryClient()

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <CtfProvider>
        <CtfLivePreviewProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
              position="bottom"
              buttonPosition="bottom-left"
              initialIsOpen={IS_DEV}
            />
            <ThemeProvider attribute="class" disableTransitionOnChange>
              <ThemeWatcherProvider />
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </CtfLivePreviewProvider>
      </CtfProvider>
    </AppContext.Provider>
  )
}

Providers.displayName = 'Providers'

export default Providers
