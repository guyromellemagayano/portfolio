import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

import { Providers } from '@/app/providers'
import { StyledComponentsRegistry } from '@/app/registry'

import { FooterLayout, HeaderLayout } from '@/components'

import '@/styles/tailwind.css'

import 'focus-visible'

/**
 * RootLayout component that serves as the main layout for the application.
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The child elements to be rendered within the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
const RootLayout = ({ children }: { children: JSX.Element }) => {
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

export default RootLayout
