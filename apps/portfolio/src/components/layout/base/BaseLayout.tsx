'use client'

import { ReactNode, useId } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import { Providers } from '@guy-romelle-magayano/portfolio/app/providers'
import { HeaderLayout } from '@guy-romelle-magayano/portfolio/components/layout/header'
import {
  NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GA_MEASUREMENT_URL
} from '@guy-romelle-magayano/portfolio/configs/env'

import { SharedReactComponent } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/utils'

export type TBaseLayoutProps = {
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
    <SharedReactComponent.Layout
      as="html"
      lang="en"
      className={cn('h-full antialiased')}
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

      <SharedReactComponent.Layout
        as="body"
        className={cn('flex h-full bg-zinc-50 dark:bg-black')}
      >
        <Providers>
          <div id={customId} className={cn('flex w-full')}>
            <SharedReactComponent.Layout
              className={cn('relative flex w-full flex-col')}
            >
              <HeaderLayout />
              <SharedReactComponent.Layout
                as="main"
                className={cn('flex-auto')}
              >
                {children}
                <SpeedInsights />
                <Analytics />
              </SharedReactComponent.Layout>
              <SharedReactComponent.Layout
                as="footer"
                className={cn('mt-32')}
              />
            </SharedReactComponent.Layout>
          </div>
        </Providers>
      </SharedReactComponent.Layout>
    </SharedReactComponent.Layout>
  )
}

BaseLayout.displayName = 'BaseLayout'

export default BaseLayout
