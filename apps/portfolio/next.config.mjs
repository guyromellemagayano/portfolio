// @ts-check
import withPWAInit from '@ducanh2912/next-pwa'
import rehypePrism from '@mapbox/rehype-prism'
import withBundleAnalyzer from '@next/bundle-analyzer'
import createMDX from '@next/mdx'
import { composePlugins, withNx } from '@nx/next'
import { withSentryConfig } from '@sentry/nextjs'
import remarkGfm from 'remark-gfm'

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
    mdxRs: true
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
  headers,

  // Sentry configuration
  sentry: {
    disableServerWebpackPlugin: process.env.NODE_ENV === 'development',
    disableClientWebpackPlugin: process.env.NODE_ENV === 'development',
    hideSourceMaps: process.env.NODE_ENV === 'production',
    automaticVercelMonitors: process.env.NODE_ENV === 'production',
    disableLogger: process.env.NODE_ENV === 'production',
    transpileClientSDK: process.env.NODE_ENV === 'production',
    widenClientFileUpload: process.env.NODE_ENV === 'production'
  }
}

// Sentry webpack plugin configuration
const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG || '',
  project: process.env.SENTRY_PROJECT || '',
  authToken: process.env.SENTRY_AUTH_TOKEN || '',
  silent: process.env.NODE_ENV === 'development'
}

// MDX configuration
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism]
  }
})

// PWA configuration
const withPWA = withPWAInit({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  scope: '/app',
  sw: 'service-worker.js',
  publicExcludes: ['!favicon/**/*']
})

// Bundle analyzer configuration
const withBA = withBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE !== 'true'
})

// Next.js plugins
const plugins = [withNx, withMDX, withBA, withPWA]

export default withSentryConfig(
  composePlugins(...plugins)(nextConfig),
  sentryWebpackPluginOptions
)
