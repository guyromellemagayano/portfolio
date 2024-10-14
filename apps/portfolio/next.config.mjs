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
    BUNDLE_ANALYZE: process.env.BUNDLE_ANALYZE,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN:
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    GOOGLE_ADSENSE_CLIENT_ID: process.env.GOOGLE_ADSENSE_CLIENT_ID,
    GOOGLE_ANALYTICS_MEASUREMENT_ID:
      process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
    GOOGLE_TAG_MANAGER_CONTAINER_ID:
      process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID,
    PORTFOLIO_SITE_URL: process.env.PORTFOLIO_SITE_URL,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT
  },

  // React compiler configuration
  compiler: {
    removeConsole: {
      exclude: ['error', 'log']
    }
  },

  // Site headers configuration
  headers,

  // Image optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ctfassets.net'
      }
    ]
  },

  // Custom Webpack config
  webpack: config => {
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack']
      }
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  }
}

// Sentry configuration
const sentryConfigOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  autoInstrumentServerFunctions: false,
  automaticVercelMonitors: process.env.NODE_ENV === 'production',
  disableLogger: process.env.NODE_ENV === 'development',
  hideSourceMaps: process.env.NODE_ENV === 'development',
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
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
