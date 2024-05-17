'use client'

import { CssBaseline, Theme } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { makeStyles } from '@mui/styles'
import { StyledEngineProvider, ThemeProvider } from '@mui/system'
import {
  HydrationBoundary,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRouter } from 'next/navigation'

import {
  BaseLayoutProps,
  FooterGqlCtfComponentFeature,
  HeaderTemplate,
  LayoutTemplate,
  MobileMenuGqlCtfComponentFeature,
  SettingsFeature
} from '@guy-romelle-magayano/coin-colorful/components'
import { colorfulTheme } from '@guy-romelle-magayano/coin-colorful/configs'
import {
  ContentfulContentProvider,
  LivePreviewProvider
} from '@guy-romelle-magayano/coin-colorful/contexts'
import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'
import { Div } from '@guy-romelle-magayano/react-components/server'
import { useState, useTransition } from 'react'

const appRouterCacheProviderSettings = {
  enableCssLayer: true
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    ...theme.typography.body1,
    flex: '1 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

export type ProvidersProps = Pick<
  BaseLayoutProps,
  'dehydratedState' | 'children'
>

/**
 * Providers component that provides the application with the previous pathname and theme.
 * @param {ProvidersProps} props - The properties of the Providers component.
 * @returns The rendered Providers component.
 */
const Providers = (props: ProvidersProps) => {
  const { children, dehydratedState } = props

  const [isMenuOpen, setMenuOpen] = useState(false),
    [isPending, startTransition] = useTransition(),
    classes = useStyles(),
    router = useRouter(),
    { previewActive } = useContentfulContext()

  const queryConfig = {
    queryCache: new QueryCache({
      // Callback function to handle errors.
      // Redirects to the '/404' page when an error occurs.
      onError: () => {
        router.push('/404')
      }
    }),

    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false
      }
    }
  }

  const queryClient = new QueryClient(queryConfig)

  startTransition(() => {
    setMenuOpen(false)
  })

  if (!isPending) {
    if (!document.activeElement) {
      return
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  return (
    <ContentfulContentProvider router={router}>
      <LivePreviewProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <StyledEngineProvider injectFirst>
            <AppRouterCacheProvider options={appRouterCacheProviderSettings}>
              <ThemeProvider theme={colorfulTheme}>
                <HydrationBoundary state={dehydratedState}>
                  <LayoutTemplate preview={previewActive}>
                    <CssBaseline />
                    <HeaderTemplate
                      isMenuOpen={isMenuOpen}
                      onMenuClick={() => setMenuOpen(true)}
                    />
                    <Div className={classes.content}>{children}</Div>
                    <FooterGqlCtfComponentFeature />
                    <MobileMenuGqlCtfComponentFeature
                      isOpen={isMenuOpen}
                      onOpenChange={(newOpen: boolean) => {
                        setMenuOpen(newOpen)
                      }}
                    />
                    <SettingsFeature />
                  </LayoutTemplate>
                </HydrationBoundary>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </StyledEngineProvider>
        </QueryClientProvider>
      </LivePreviewProvider>
    </ContentfulContentProvider>
  )
}

Providers.displayName = 'Providers'

export default Providers
