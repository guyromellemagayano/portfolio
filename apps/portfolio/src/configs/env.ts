import { isEmpty } from '@guy-romelle-magayano/react-utils'

// Site Information
export const SITE_URL: string = process.env.SITE_URL || ''

// Sentry
export const SENTRY_DSN: string = process.env.SENTRY_DSN || ''
export const SENTRY_AUTH_TOKEN: string = process.env.SENTRY_AUTH_TOKEN || ''
export const SENTRY_ORG: string = process.env.SENTRY_ORG || ''
export const SENTRY_PROJECT: string = process.env.SENTRY_PROJECT || ''
export const SENTRY_ENVIRONMENT: string = process.env.SENTRY_ENVIRONMENT || ''

// Google Analytics
export const GOOGLE_ANALYTICS_MEASUREMENT_ID: string =
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || ''
export const GOOGLE_ANALYTICS_MEASUREMENT_URL: string =
  `https://www.googletagmanager.com/gtag/js` +
  !isEmpty(GOOGLE_ANALYTICS_MEASUREMENT_ID)
    ? `?id=${process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID}`
    : ''

// Google Adsense
export const GOOGLE_ADSENSE_CLIENT_ID: string =
  process.env.GOOGLE_ADSENSE_CLIENT_ID || ''
export const GOOGLE_ADSENSE_MEASUREMENT_URL: string =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` +
  !isEmpty(GOOGLE_ADSENSE_CLIENT_ID)
    ? `?client=${process.env.GOOGLE_ADSENSE_CLIENT_ID}`
    : ''
