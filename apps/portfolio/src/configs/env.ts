// Bundle Analyzer
export const BUNDLE_ANALYZE: string | boolean =
  process.env.BUNDLE_ANALYZE || false

// Contentful
export const CONTENTFUL_ACCESS_TOKEN: string =
  process.env.CONTENTFUL_ACCESS_TOKEN || ''
export const CONTENTFUL_SPACE_ID: string = process.env.CONTENTFUL_SPACE_ID || ''
export const CONTENTFUL_PREVIEW_ACCESS_TOKEN: string =
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || ''

// Crowdin
export const CROWDIN_BASE_PATH: string = process.env.CROWDIN_BASE_PATH || ''
export const CROWDIN_BASE_URL: string = process.env.CROWDIN_BASE_URL || ''
export const CROWDIN_PERSONAL_TOKEN: string =
  process.env.CROWDIN_PERSONAL_TOKEN || ''
export const CROWDIN_PROJECT_ID: string = process.env.CROWDIN_PROJECT_ID || ''

// Google Adsense
export const GOOGLE_ADSENSE_CLIENT_ID: string =
  process.env.GOOGLE_ADSENSE_CLIENT_ID || ''
export const GOOGLE_ADSENSE_MEASUREMENT_URL: string =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js${
    GOOGLE_ADSENSE_CLIENT_ID ? `?client=${GOOGLE_ADSENSE_CLIENT_ID}` : ''
  }` || ''

// Google Analytics
export const GOOGLE_ANALYTICS_MEASUREMENT_ID: string =
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || ''

// Google Tag Manager
export const GOOGLE_TAG_MANAGER_CONTAINER_ID: string =
  process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID || ''

// Site Information
export const PORTFOLIO_SITE_URL: string = process.env.PORTFOLIO_SITE_URL || ''

// Sentry
export const SENTRY_DSN: string = process.env.SENTRY_DSN || ''
export const SENTRY_AUTH_TOKEN: string = process.env.SENTRY_AUTH_TOKEN || ''
export const SENTRY_ORG: string = process.env.SENTRY_ORG || ''
export const SENTRY_PROJECT: string = process.env.SENTRY_PROJECT || ''
export const SENTRY_ENVIRONMENT: string = process.env.SENTRY_ENVIRONMENT || ''
