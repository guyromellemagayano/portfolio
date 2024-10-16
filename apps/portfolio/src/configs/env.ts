// Environments
export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const IS_TEST = process.env.NODE_ENV === 'test'

// Bundle Analyzer
export const BUNDLE_ANALYZE = process.env.BUNDLE_ANALYZE || false

// Contentful
export const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
export const CONTENTFUL_MANAGEMENT_TOKEN =
  process.env.CONTENTFUL_MANAGEMENT_TOKEN
export const CONTENTFUL_PREVIEW_ACCESS_TOKEN =
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
export const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID

// Google Adsense
export const GOOGLE_ADSENSE_CLIENT_ID = process.env.GOOGLE_ADSENSE_CLIENT_ID
export const GOOGLE_ADSENSE_MEASUREMENT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js${
  GOOGLE_ADSENSE_CLIENT_ID ? `?client=${GOOGLE_ADSENSE_CLIENT_ID}` : ''
}`

// Google Analytics
export const GOOGLE_ANALYTICS_MEASUREMENT_ID =
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID

// Google Tag Manager
export const GOOGLE_TAG_MANAGER_CONTAINER_ID =
  process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID

// Site Information
export const PORTFOLIO_SITE_URL = IS_PROD
  ? process.env.PORTFOLIO_SITE_URL
  : 'http://localhost:3000'
export const PORTFOLIO_SITE_GRAPHQL_API_URL = `${PORTFOLIO_SITE_URL}/api/graphql`

// Sentry
export const SENTRY_DSN = process.env.SENTRY_DSN
export const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN
export const SENTRY_ORG = process.env.SENTRY_ORG
export const SENTRY_PROJECT = process.env.SENTRY_PROJECT
export const SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT
