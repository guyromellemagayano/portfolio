import { ReactNode } from 'react'

import { DehydratedState } from '@tanstack/react-query'
import { unstable_setRequestLocale } from 'next-intl/server'

import {
  Body,
  Head,
  Html,
  Link,
  Meta
} from '@guy-romelle-magayano/react-components/server'

import Providers from '@guy-romelle-magayano/coin-colorful/app/[locale]/providers'

export type BaseLayoutProps = {
  children: ReactNode
  lang: string
  dehydratedState?: DehydratedState
}

/**
 * Render the base layout component.
 * @param {BaseLayoutProps} props - The properties of the base layout.
 * @returns The rendered base layout component.
 */
const BaseLayout = (props: BaseLayoutProps) => {
  const { dehydratedState, children, lang } = props

  unstable_setRequestLocale(lang)

  return (
    <Html lang={lang} dir="ltr" suppressHydrationWarning>
      <Head>
        <Meta charSet="utf-8" />
        <Meta name="robots" content="noindex, nofollow" />

        {/* PWA primary color */}
        <Meta name="theme-color" content="#000" />

        <Link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <Link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Body>
        <Providers dehydratedState={dehydratedState} lang={lang}>
          {children}
        </Providers>
      </Body>
    </Html>
  )
}

BaseLayout.displayName = 'BaseLayout'

export default BaseLayout
