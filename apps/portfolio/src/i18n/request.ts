import * as Sentry from '@sentry/nextjs'
import { IntlErrorCode } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routingDefaults } from './routing'

// Update `getRequestConfig` settings
export default getRequestConfig(async () => {
  return {
    locale: routingDefaults.defaultLocale,
    messages: (
      await import(`../../messages/${routingDefaults.defaultLocale}.json`)
    ).default,
    onError(error) {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error(error)
      } else {
        Sentry.captureException(error)
      }
    },
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter(part => part != null).join('.')

      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + ' is not yet translated'
      } else {
        return 'Dear developer, please fix this message: ' + path
      }
    }
  }
})