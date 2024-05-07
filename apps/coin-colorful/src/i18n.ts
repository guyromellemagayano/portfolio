import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Internationalization locales
export const locales = ['en', 'de']

/**
 * Retrieves the request configuration for the specified locale.
 * @param {Object} options - The options for retrieving the request configuration.
 * @param {string} options.locale - The locale for which to retrieve the request configuration.
 * @returns {Promise<Object>} - A promise that resolves to the request configuration object.
 * @throws {Error} - Throws an error if the specified locale is not found.
 */
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  }
})
