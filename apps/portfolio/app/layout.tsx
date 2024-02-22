/* eslint-disable no-irregular-whitespace */
import { FC } from 'react'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'

import { Providers } from '@/app/providers'
import { StyledComponentsRegistry } from '@/app/registry'

import {
  NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GA_MEASUREMENT_URL
} from '@/configs/env'

import FooterLayout from '@/components/layouts/Footer'
import HeaderLayout from '@/components/layouts/Header'

import type { TNavigationData } from '@/data/navigation'
import NavigationData from '@/data/navigation'

import { TWithChildren } from '@/types/common'

import '@/styles/tailwind.css'

import 'focus-visible'

export type TRootLayout = TWithChildren

/**
 * RootLayout component that serves as the main layout for the application.
 * @param children - The children of the layout.
 * @returns The rendered RootLayout component.
 */
const RootLayout: FC<TRootLayout> = ({ children }) => {
  const { footerNav, copyright }: TNavigationData = NavigationData()

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
          <StyledComponentsRegistry>
            <div className="flex w-full">
              <div className="relative flex w-full flex-col">
                <HeaderLayout />
                <main className="flex-auto">
                  {children}
                  <SpeedInsights />
                  <Analytics />
                </main>
                <FooterLayout
                  className="mt-32"
                  footerNav={footerNav}
                  copyright={copyright}
                />
              </div>
            </div>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
