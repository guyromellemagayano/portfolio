import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Internationalization locales
export const locales = ['en', 'de']

export type GetRequestConfigProps = {
  locale: string
}

/**
 * Retrieves the request configuration for the specified locale.
 * @param {GetRequestConfigProps} props - The properties of the request configuration.
 * @returns The request configuration for the specified locale.
 */
export default getRequestConfig(async ({ locale }: GetRequestConfigProps) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
