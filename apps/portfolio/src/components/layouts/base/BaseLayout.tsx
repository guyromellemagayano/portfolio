import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import {
  Body,
  type CommonComponentsProps,
  Div,
  Head,
  Html,
  Main
} from '@react-components'

import { cn } from '@react-utils'

import type { TLocaleLayoutParams } from '@portfolio/app/[locale]/layout'
import Providers from '@portfolio/app/[locale]/providers'
import { FooterLayout, HeaderLayout } from '@portfolio/components'
import {
  GOOGLE_ADSENSE_MEASUREMENT_URL,
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  GOOGLE_TAG_MANAGER_CONTAINER_ID
} from '@portfolio/configs'
import { routingDefaults } from '@portfolio/i18n/routing'
import { navigationData } from '@portfolio/utils'

import '@portfolio/styles/tailwind.css'

import 'focus-visible'

export type TBaseLayoutProps = Pick<CommonComponentsProps, 'children'> &
  TLocaleLayoutParams

/**
 * Render the base layout component.
 * @param {TBaseLayoutProps} props - The component props
 * @returns The rendered base layout component
 */
const BaseLayout = async ({
  children,
  locale = routingDefaults.defaultLocale
}: TBaseLayoutProps) => {
  const { headerMenu, footerMenu } = await navigationData()

  return (
    <Html
      lang={locale}
      className={cn('h-full antialiased')}
      suppressHydrationWarning
    >
      <Head>
        {GOOGLE_ANALYTICS_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={GOOGLE_ANALYTICS_MEASUREMENT_ID} />
        )}

        {GOOGLE_TAG_MANAGER_CONTAINER_ID && (
          <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_CONTAINER_ID} />
        )}

        {GOOGLE_ADSENSE_MEASUREMENT_URL && (
          <Script
            id="gads"
            src={GOOGLE_ADSENSE_MEASUREMENT_URL}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </Head>
      <Body className={cn('flex h-full bg-zinc-50 dark:bg-black')}>
        <Providers>
          <Div className={cn('flex w-full')}>
            <Div className={cn('relative flex w-full flex-col')}>
              <HeaderLayout data={headerMenu} />
              <Main className={cn('flex-auto')}>{children}</Main>
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

BaseLayout.displayName = 'BaseLayout'

export default BaseLayout
