import { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import {
  Body,
  Div,
  Head,
  Html,
  Main
} from '@guy-romelle-magayano/react-components/server'

import { Providers } from '@guy-romelle-magayano/portfolio/app/providers'
import { FooterLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Footer'
import { HeaderLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Header'
import {
  GA_MEASUREMENT_ID,
  GA_MEASUREMENT_URL
} from '@guy-romelle-magayano/portfolio/configs/env'
import { navigationData } from '@guy-romelle-magayano/portfolio/utils/server'

import '@guy-romelle-magayano/portfolio/styles/tailwind.css'

import 'focus-visible'

export type BaseLayoutProps = {
  children: ReactNode
}

/**
 * Render the base layout component.
 * @param children - The children of the base layout.
 * @returns The rendered base layout component.
 */
const BaseLayout = async ({ children }: BaseLayoutProps) => {
  const { headerMenu, footerMenu } = await navigationData()

  return (
    <Html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <Head>
        <Script strategy="afterInteractive" src={GA_MEASUREMENT_URL} />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', "${GA_MEASUREMENT_ID}");
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
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9210279170204135"
          crossOrigin="anonymous"
        />
      </Head>

      <Body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <Div className="flex w-full">
            <Div className="relative flex w-full flex-col">
              <HeaderLayout pages={headerMenu} />
              <Main className="flex-auto">{children}</Main>
              <FooterLayout pages={footerMenu} />
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
