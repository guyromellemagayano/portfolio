import { ReactNode } from 'react'

import { locales } from '@guy-romelle-magayano/coin-colorful/libs/i18n'

import { BaseLayout } from '@guy-romelle-magayano/coin-colorful/components'

import './global.css'

/**
 * Generates static parameters for each locale.
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
 * @returns An array of objects containing the locale.
 */
export const generateStaticParams = () => locales.map(locale => ({ locale }))

export type RootLayoutProps<T> = {
  children: ReactNode
  params: T
}

/**
 * Serves as the root layout of the application.
 * @param {RootLayoutProps} props - The properties of the root layout.
 * @returns The rendered root layout component.
 */
const RootLayout = <T extends { locale: string }>(
  props: RootLayoutProps<T>
) => {
  const {
    children,
    params: { locale }
  } = props

  return <BaseLayout lang={locale}>{children}</BaseLayout>
}

RootLayout.displayName = 'RootLayout'

export default RootLayout
