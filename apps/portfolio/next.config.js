// @ts-check
const createMDX = require('@next/mdx')
const { composePlugins, withNx } = require('@nx/next')
const { withSentryConfig } = require('@sentry/nextjs')

// Security headers configuration
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer'
  }
]

/**
 * Returns an array of headers.
 * @returns {Promise<Array<Headers>>} The array of headers.
 */
const headers = async () => [
  {
    // @ts-ignore
    source: '/:path*',
    headers: securityHeaders
  }
]

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Nx plugin configuration
  nx: {
    svgr: false
  },

  pageExtensions: ['js', 'mdx', 'ts', 'tsx'],

  // Experimental features configuration
  experimental: {
    mdxRs: true,
    instrumentationHook: true
  },

  // Environment variables configuration
  env: {
    PORTFOLIO_SITE_URL: process.env.PORTFOLIO_SITE_URL || '',
    GOOGLE_ANALYTICS_MEASUREMENT_ID:
      process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || '',
    GOOGLE_ADSENSE_CLIENT_ID: process.env.GOOGLE_ADSENSE_CLIENT_ID || '',
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN || '',
    SENTRY_ORG: process.env.SENTRY_ORG || '',
    SENTRY_PROJECT: process.env.SENTRY_PROJECT || '',
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || ''
  },

  // React compiler configuration
  compiler: {
    removeConsole: {
      exclude: ['error', 'log']
    }
  },

  // @ts-ignore
  // Site headers configuration
  headers
}

// Sentry plugin configuration
const sentryPluginOptions = {
  org: process.env.SENTRY_ORG || '',
  project: process.env.SENTRY_PROJECT || '',
  authToken: process.env.SENTRY_AUTH_TOKEN || '',
  silent: process.env.NODE_ENV === 'development',
  hideSourceMaps: process.env.NODE_ENV === 'production',
  automaticVercelMonitors: process.env.NODE_ENV === 'production',
  disableLogger: process.env.NODE_ENV === 'production',
  widenClientFileUpload: process.env.NODE_ENV === 'production',
  autoInstrumentServerFunctions: false
}

// MDX configuration
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

// PWA configuration
const withPWA = require('@ducanh2912/next-pwa').default({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  publicExcludes: ['!favicon/**/*']
})

// Next.js plugins
const plugins = [withNx, withMDX, withPWA]

module.exports = withSentryConfig(
  composePlugins(...plugins)(nextConfig),
  sentryPluginOptions
)
