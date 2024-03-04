'use client'

import { ReactNode, useId } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import {
  NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GA_MEASUREMENT_URL
} from '@guy-romelle-magayano/portfolio/configs/env'

import { Providers } from '@guy-romelle-magayano/portfolio/app/providers'

import HeaderLayout from '@guy-romelle-magayano/portfolio/components/layout/Header'

import { SharedLayout } from '@guy-romelle-magayano/components/server'

interface BaseLayoutProps {
  children: ReactNode
}

/**
 * Render the base layout component.
 * @param children - The children of the base layout.
 * @returns The rendered base layout component.
 */
const BaseLayout = ({ children }: BaseLayoutProps) => {
  const customId = useId()

  return (
    <SharedLayout
      as="html"
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
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

      <SharedLayout as="body" className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div id={customId} className="flex w-full">
            <SharedLayout className="relative flex w-full flex-col">
              <HeaderLayout />
              <SharedLayout as="main" className="flex-auto">
                {children}
                <SpeedInsights />
                <Analytics />
              </SharedLayout>
              <SharedLayout as="footer" className="mt-32" />
            </SharedLayout>
          </div>
        </Providers>
      </SharedLayout>
    </SharedLayout>
  )
}

export default BaseLayout
