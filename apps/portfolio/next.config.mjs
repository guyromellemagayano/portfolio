// @ts-check
import * as NextPWA from '@ducanh2912/next-pwa'
import createMDX from '@next/mdx'
import { composePlugins, withNx } from '@nx/next'
import { withSentryConfig } from '@sentry/nextjs'

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
    svgr: true
  },

  pageExtensions: ['js', 'mdx', 'ts', 'tsx'],
  poweredByHeader: false,

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
  headers,

  // Image optimizations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ctfassets.net'
      }
    ]
  },

  // Custom Webpack config
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

// Sentry configuration
const sentryConfigOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN || '',
  autoInstrumentServerFunctions: false,
  automaticVercelMonitors: process.env.NODE_ENV === 'production',
  disableLogger: process.env.NODE_ENV === 'development',
  hideSourceMaps: process.env.NODE_ENV === 'development',
  org: process.env.SENTRY_ORG || '',
  project: process.env.SENTRY_PROJECT || '',
  silent: process.env.NODE_ENV === 'development',
  transpileClientSDK: process.env.NODE_ENV === 'production',
  tunnelRoute: '/monitoring',
  widenClientFileUpload: process.env.NODE_ENV === 'production'
}

// MDX configuration
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

// PWA configuration
const withPWA = NextPWA.default({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  publicExcludes: ['!favicon/**/*']
})

// Next.js plugins
const plugins = [withNx, withMDX, withPWA]

export default withSentryConfig(
  composePlugins(...plugins)(nextConfig),
  sentryConfigOptions
)
