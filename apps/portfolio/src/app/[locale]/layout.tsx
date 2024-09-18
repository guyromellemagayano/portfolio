import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

import { CommonComponentsProps } from '@react-components'

import { BaseLayout } from '@portfolio/components'
import { routing } from '@portfolio/i18n/routing'

export const generateStaticParams = () =>
  routing.locales.map(locale => ({ locale }))

export type TRootLayoutProps = Pick<CommonComponentsProps, 'children'> & {
  params: TRootLayoutParams
}
export type TRootLayoutParams = {
  locale: string
}

/**
 * Renders the root layout app.
 * @param {TRootLayoutProps} props - The app props
 * @returns The rendered root layout app
 */
const RootLayout = async ({ children, params }: TRootLayoutProps) => {
  unstable_setRequestLocale(params.locale)

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
