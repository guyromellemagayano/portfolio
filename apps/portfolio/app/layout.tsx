/* eslint-disable no-irregular-whitespace */
import { Providers } from '@app/providers'
import { StyledComponentsRegistry } from '@app/registry'
import { FooterLayout, HeaderLayout } from '@components/layouts'
import '@styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import 'focus-visible'
import Script from 'next/script'

export default function RootLayout({ children }: { children: JSX.Element }) {
  const gtmSrc = `https://www.googletagmanager.com/gtag/js?id=${process.env.nextPublicGaMeasurementId}`

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
              gtag('config', "${process.env.nextPublicGaMeasurementId}");
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
