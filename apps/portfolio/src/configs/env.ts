import { isEmpty, isNotNullOrUndefined } from '@guy-romelle-magayano/shared'

export const LAZY_LOADING_DURATION: number = 1000

// Sentry
export const SENTRY_DSN: string = process.env.SENTRY_DSN || ''
export const SENTRY_AUTH_TOKEN: string = process.env.SENTRY_AUTH_TOKEN || ''
export const SENTRY_ORG: string = process.env.SENTRY_ORG || ''
export const SENTRY_PROJECT: string = process.env.SENTRY_PROJECT || ''
export const SENTRY_ENVIRONMENT: string = process.env.SENTRY_ENVIRONMENT || ''

// Next.js
export const NEXT_PUBLIC_GA_MEASUREMENT_ID: string =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
export const NEXT_PUBLIC_GA_MEASUREMENT_URL: string =
  `https://www.googletagmanager.com/gtag/js` +
    isNotNullOrUndefined(NEXT_PUBLIC_GA_MEASUREMENT_ID) &&
  !isEmpty(NEXT_PUBLIC_GA_MEASUREMENT_ID)
    ? `?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`
    : ''
