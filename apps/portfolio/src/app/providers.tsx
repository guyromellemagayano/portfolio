'use client'

import { ReactNode, createContext } from 'react'

import { usePrevious } from '@uidotdev/usehooks'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'

import { ApolloWrapperProvider, ThemeWatcher } from '@portfolio/providers'

// App context that provides the previous pathname to the application.
export const AppContext = createContext<{ previousPathname?: string }>({})

export type TProvidersProps = {
  children?: ReactNode
}

/**
 * Providers app that provides the application with the previous pathname and theme.
 * @param {TProvidersProps} props - The app props
 * @returns The rendered providers app
 */
const Providers = ({ children }: TProvidersProps) => {
  const pathname = usePathname()
  const previousPathname = usePrevious(pathname)

  return (
    <ApolloWrapperProvider>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        <AppContext.Provider value={{ previousPathname }}>
          {children}
        </AppContext.Provider>
      </ThemeProvider>
    </ApolloWrapperProvider>
  )
}

Providers.displayName = 'Providers'

export default Providers
