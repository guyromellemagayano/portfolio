/* eslint-disable no-irregular-whitespace */
import { FooterLayout, HeaderLayout } from '@components/layouts'
import { Analytics } from '@vercel/analytics/react'
import 'focus-visible'
import Script from 'next/script'

import '@styles/tailwind.css'
import { Providers } from './providers'
import { StyledComponentsRegistry } from './registry'

export default function RootLayout({ children }: { children: JSX.Element }) {
  const gtmSrc = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script strategy="afterInteractive" src={gtmSrc} />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', "${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}");
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
                  <Analytics />
                </main>
                <FooterLayout />
              </div>
            </div>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  )
}
