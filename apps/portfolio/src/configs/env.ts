import {
  isEmpty,
  isNotNullOrUndefined
} from '@guy-romelle-magayano/react-utils'

// Site Information
export const SITE_URL: string = process.env.SITE_URL || ''

// Sentry
export const SENTRY_DSN: string = process.env.SENTRY_DSN || ''
export const SENTRY_AUTH_TOKEN: string = process.env.SENTRY_AUTH_TOKEN || ''
export const SENTRY_ORG: string = process.env.SENTRY_ORG || ''
export const SENTRY_PROJECT: string = process.env.SENTRY_PROJECT || ''
export const SENTRY_ENVIRONMENT: string = process.env.SENTRY_ENVIRONMENT || ''

// Next.js
export const GA_MEASUREMENT_ID: string = process.env.GA_MEASUREMENT_ID || ''
export const NEXT_PUBLIC_GA_MEASUREMENT_URL: string =
  `https://www.googletagmanager.com/gtag/js` +
    isNotNullOrUndefined(GA_MEASUREMENT_ID) && !isEmpty(GA_MEASUREMENT_ID)
    ? `?id=${process.env.GA_MEASUREMENT_ID}`
    : ''
