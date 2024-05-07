import { ReactNode } from 'react'

import { locales } from '@guy-romelle-magayano/coin-colorful/i18n'
import { unstable_setRequestLocale } from 'next-intl/server'

import './global.css'

export type RootLayoutProps = {
  children: ReactNode
  params: { locale: string }
}

/**
 * Generates static parameters for each locale.
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
 * @returns An array of objects containing the locale.
 */
export const generateStaticParams = () => locales.map(locale => ({ locale }))

/**
 * Serves as the root layout of the application.
 * @param children - The children of the root layout.
 * @param params - The parameters of the root layout.
 * @returns The rendered root layout component.
 */
const RootLayout = ({ children, params: { locale } }: RootLayoutProps) => {
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}

RootLayout.displayName = 'RootLayout'

export default RootLayout
