// Bundle Analyzer
export const BUNDLE_ANALYZE: string | boolean =
  process.env.BUNDLE_ANALYZE || false

// Contentful
export const CONTENTFUL_ACCESS_TOKEN: string | null =
  process.env.CONTENTFUL_ACCESS_TOKEN || null
export const CONTENTFUL_SPACE_ID: string | null =
  process.env.CONTENTFUL_SPACE_ID || null
export const CONTENTFUL_PREVIEW_ACCESS_TOKEN: string | null =
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || null

// Crowdin
export const CROWDIN_BASE_PATH: string | null =
  process.env.CROWDIN_BASE_PATH || null
export const CROWDIN_BASE_URL: string | null =
  process.env.CROWDIN_BASE_URL || null
export const CROWDIN_PERSONAL_TOKEN: string | null =
  process.env.CROWDIN_PERSONAL_TOKEN || null
export const CROWDIN_PROJECT_ID: string | null =
  process.env.CROWDIN_PROJECT_ID || null

// Google Adsense
export const GOOGLE_ADSENSE_CLIENT_ID: string | null =
  process.env.GOOGLE_ADSENSE_CLIENT_ID || null
export const GOOGLE_ADSENSE_MEASUREMENT_URL: string | null =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js${
    GOOGLE_ADSENSE_CLIENT_ID ? `?client=${GOOGLE_ADSENSE_CLIENT_ID}` : ''
  }` || null

// Google Analytics
export const GOOGLE_ANALYTICS_MEASUREMENT_ID: string | null =
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || null

// Google Tag Manager
export const GOOGLE_TAG_MANAGER_CONTAINER_ID: string | null =
  process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID || null

// Site Information
export const PORTFOLIO_SITE_URL: string | null =
  process.env.PORTFOLIO_SITE_URL || null

// Sentry
export const SENTRY_DSN: string | null = process.env.SENTRY_DSN || null
export const SENTRY_AUTH_TOKEN: string | null =
  process.env.SENTRY_AUTH_TOKEN || null
export const SENTRY_ORG: string | null = process.env.SENTRY_ORG || null
export const SENTRY_PROJECT: string | null = process.env.SENTRY_PROJECT || null
export const SENTRY_ENVIRONMENT: string | null =
  process.env.SENTRY_ENVIRONMENT || null
