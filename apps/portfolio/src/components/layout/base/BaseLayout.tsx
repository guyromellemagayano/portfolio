'use client'

import { ReactNode, useId } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import { Providers } from '@guy-romelle-magayano/portfolio/app/providers'
import { FooterLayout } from '@guy-romelle-magayano/portfolio/components/layout/footer'
import { HeaderLayout } from '@guy-romelle-magayano/portfolio/components/layout/header'
import {
  NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GA_MEASUREMENT_URL
} from '@guy-romelle-magayano/portfolio/configs/env'

import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'

import '@guy-romelle-magayano/portfolio/styles/tailwind.css'

import 'focus-visible'

type TBaseLayoutProps = {
  children: ReactNode
}

/**
 * Render the base layout component.
 * @param children - The children of the base layout.
 * @returns The rendered base layout component.
 */
const BaseLayout = ({ children }: TBaseLayoutProps) => {
  const customId = useId()

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={NEXT_PUBLIC_GA_MEASUREMENT_URL}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', "${NEXT_PUBLIC_GA_MEASUREMENT_ID}");
            `
          }}
        />
      </head>

      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <SharedReactComponent.Layout id={customId} className="flex w-full">
            <SharedReactComponent.Layout className="relative flex w-full flex-col">
              <HeaderLayout />
              <SharedReactComponent.Layout as="main" className="flex-auto">
                {children}
                <SpeedInsights />
                <Analytics />
              </SharedReactComponent.Layout>
              <FooterLayout />
            </SharedReactComponent.Layout>
          </SharedReactComponent.Layout>
        </Providers>
      </body>
    </html>
  )
}

BaseLayout.displayName = 'BaseLayout'

export default BaseLayout
