import { NextIntlClientProvider } from 'next-intl'
import {
  getLocale,
  getMessages,
  unstable_setRequestLocale
} from 'next-intl/server'

import { CommonComponentsProps } from '@react-components'

import { BaseLayout } from '@portfolio/components'
import { routing } from '@portfolio/i18n/routing'
import { notFound } from 'next/navigation'

export const generateStaticParams = () =>
  routing.locales.map(locale => ({ locale }))

export type RootLayoutProps = Pick<CommonComponentsProps, 'children'> & {
  params: RootLayoutParamsData
}

export type RootLayoutParamsData = {
  locale: string
}

/**
 * Renders the root app layout.
 * @param {RootLayoutProps} props - The component props
 * @returns The rendered JSX component
 */
const RootLayout = async ({ children, params }: RootLayoutProps) => {
  const locale = await getLocale()

  if (params.locale !== locale) notFound()

  unstable_setRequestLocale(params.locale)

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <BaseLayout locale={params.locale} messages={messages}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </BaseLayout>
  )
}

RootLayout.displayName = 'RootLayout'

export default RootLayout
