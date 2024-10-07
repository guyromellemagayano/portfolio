import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import Script from 'next/script'

import {
  Body,
  Div,
  Head,
  Html,
  Main,
  type TCommonComponentsProps
} from '@react-components'

import Providers from '@portfolio/app/providers'
import { FooterLayout, HeaderLayout } from '@portfolio/components'
import {
  GOOGLE_ADSENSE_MEASUREMENT_URL,
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  GOOGLE_TAG_MANAGER_CONTAINER_ID
} from '@portfolio/configs'
import { iconsData } from '@portfolio/data'
import { navigationData } from '@portfolio/utils'

import '@portfolio/styles/tailwind.css'
import 'focus-visible'

export type TRootLayoutProps = Pick<TCommonComponentsProps, 'children'>

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { manifest, icons } = iconsData

  return {
    manifest,
    icons
  }
}

/**
 * Renders the root layout app.
 * @param {TRootLayoutProps} props - The app props
 * @returns The rendered root layout app
 */
const RootLayout = async ({ children }: TRootLayoutProps) => {
  const { headerMenu, footerMenu } = navigationData()

  return (
    <Html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <Head>
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
              <HeaderLayout data={headerMenu} />
              <Main className="flex-auto">{children}</Main>
              <FooterLayout data={footerMenu} />
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
