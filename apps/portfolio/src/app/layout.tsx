import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import type { CommonComponentsProps } from '@react-components'

import { BaseLayout } from '@portfolio/components'
// import { routing } from '@portfolio/i18n/routing'
import type { TCtfContextValue } from '@portfolio/providers'

// export const generateStaticParams = () =>
//   routing.locales.map(locale => ({ locale }))

export type TLocaleLayoutProps = Pick<CommonComponentsProps, 'children'> & {
  params: TLocaleLayoutParams
}
export type TLocaleLayoutParams = Pick<TCtfContextValue, 'locale'>

/**
 * Renders the locale layout app.
 * @param {TLocaleLayoutProps} props - The app props
 * @returns The rendered locale layout app
 */
const LocaleLayout = async ({ children }: TLocaleLayoutProps) => {
  const locale = await getLocale()

  // unstable_setRequestLocale(params.locale)

  const messages = await getMessages()

  return (
    <BaseLayout locale={locale}>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </BaseLayout>
  )
}

LocaleLayout.displayName = 'LocaleLayout'

export default LocaleLayout
