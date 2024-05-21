import createMiddleware from 'next-intl/middleware'

import { locales } from './i18n'

/**
 * Creates a middleware with the specified locales and default locale.
 * @param locales - The locales to be used by the middleware.
 * @param defaultLocale - The default locale to be used by the middleware.
 * @returns The created middleware.
 */
export default createMiddleware({ locales, defaultLocale: 'en' })

// Configuration object for the middleware.
export const config = {
  matcher: ['/', '/(de|en)/:path*']
}
