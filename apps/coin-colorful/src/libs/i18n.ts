import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Internationalization locales
export const locales = ['en', 'de']

export type GetRequestConfigProps = {
  locale: string
}

/**
 * Retrieves the request configuration for the specified locale.
 * @param locale - The locale for which to retrieve the request configuration.
 * @returns A promise that resolves to the request configuration object.
 * @throws Throws an error if the specified locale is not found.
 */
export default getRequestConfig(async ({ locale }: GetRequestConfigProps) => {
  if (!locales.includes(locale)) notFound()

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
