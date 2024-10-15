import { ReactNode } from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import 'focus-visible'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import { Body, Div, Head, Html, Link, Main, Meta } from '@react-components'

import {
  GOOGLE_ADSENSE_MEASUREMENT_URL,
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  GOOGLE_TAG_MANAGER_CONTAINER_ID
} from '@portfolio/configs'
import { getPagesDataQuery, PagesDataQuery } from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'
import '@portfolio/styles/tailwind.css'

export type TRootLayoutProps = {
  children?: ReactNode
}

// Dynamic imports
const Providers = dynamic(() =>
  import('@portfolio/app/providers').then(mod => mod.default)
)
const HeaderLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.HeaderLayout)
)
const FooterLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.FooterLayout)
)

/**
 * Renders the root layout app.
 * @param {TRootLayoutProps} props - The app props
 * @returns The rendered root layout app
 */
const RootLayout = async ({ children }: TRootLayoutProps) => {
  const { data } = (await getClient().query({
    query: getPagesDataQuery
  })) as ApolloQueryResult<PagesDataQuery>

  return (
    <Html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <Head>
        <Link
          rel="icon"
          type="image/png"
          href="/favicons/favicon-48x48.png"
          sizes="48x48"
        />
        <Link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <Link rel="shortcut icon" href="/favicons/favicon.ico" />
        <Link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <Meta name="apple-mobile-web-app-title" content="GRM" />
        <Link rel="manifest" href="/favicons/manifest.webmanifest" />

        {GOOGLE_ANALYTICS_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={GOOGLE_ANALYTICS_MEASUREMENT_ID} />
        )}

        {GOOGLE_TAG_MANAGER_CONTAINER_ID && (
          <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_CONTAINER_ID} />
        )}

        {GOOGLE_ADSENSE_MEASUREMENT_URL && (
          <Script
            id="gadsense"
            src={GOOGLE_ADSENSE_MEASUREMENT_URL}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </Head>
      <Body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <Div className="flex w-full">
            <Div className="relative flex w-full flex-col">
              <HeaderLayout data={data} />
              <Main className="flex-auto">{children}</Main>
              <FooterLayout data={data} />
            </Div>
          </Div>
          <SpeedInsights />
          <Analytics />
        </Providers>
      </Body>
    </Html>
  )
}

RootLayout.displayName = 'RootLayout'

export default RootLayout
