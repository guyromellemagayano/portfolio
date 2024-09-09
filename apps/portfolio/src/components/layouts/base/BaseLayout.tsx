import { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import { Body, Div, Head, Html, Main } from '@react-components'

import { cn } from '@react-utils'

import { Providers } from '@portfolio/app/providers'
import { FooterLayout, HeaderLayout } from '@portfolio/components'
import {
  GOOGLE_ADSENSE_MEASUREMENT_URL,
  GOOGLE_ANALYTICS_MEASUREMENT_ID,
  GOOGLE_ANALYTICS_MEASUREMENT_URL
} from '@portfolio/configs'
import { navigationData } from '@portfolio/utils'

import '@portfolio/styles/tailwind.css'
import 'focus-visible'

export type BaseLayoutProps = {
  children: ReactNode
}

/**
 * Render the base layout component.
 * @param {BaseLayoutProps} props - The component props
 * @returns The rendered base layout component
 */
const BaseLayout = async ({ children }: BaseLayoutProps) => {
  const { headerMenu, footerMenu } = await navigationData()

  return (
    <Html
      lang="en"
      className={cn('h-full antialiased')}
      suppressHydrationWarning
    >
      <Head>
        <Script
          src={GOOGLE_ANALYTICS_MEASUREMENT_URL}
          strategy="afterInteractive"
          async
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', "${GOOGLE_ANALYTICS_MEASUREMENT_ID}");
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
              });
            `
          }}
        />
        <Script
          id="google-adsense"
          src={GOOGLE_ADSENSE_MEASUREMENT_URL}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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
