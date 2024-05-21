// @ts-check
const { composePlugins, withNx } = require('@nx/next')
const createNextIntlPlugin = require('next-intl/plugin')

// Next.js Internationalization plugin
const withNextIntl = createNextIntlPlugin()

/**
 * Adds a polyfill entry to the webpack configuration.
 * @param config - The webpack configuration object.
 * @returns void
 */
const polyfills = (/** @type {{ entry: () => Promise<any>; }} */ config) => {
  const originalEntry = config.entry

  config.entry = async () => {
    const entries = await originalEntry()

    if (
      entries['main.js'] &&
      !entries['main.js'].includes('./src/configs/polyfills.ts')
    ) {
      entries['main.js'].unshift('./src/configs/polyfills.ts')
    }

    return entries
  }
}

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
    key: 'Content-Security-Policy',
    value: `frame-ancestors 'self' https://app.contentful.com https://app.eu.contentful.com`
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

  pageExtensions: ['js', 'ts', 'tsx'],

  // TODO: Add i18n configuration here

  // Environment variables configuration
  env: {
    COIN_COLORFUL_SITE_URL: process.env.COIN_COLORFUL_SITE_URL || '',
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
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

  // Image optimization configuration
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    domains: ['images.ctfassets.net', 'images.eu.ctfassets.net'],
    formats: ['image/avif', 'image/webp'],
    path: '/_next/image',
    loader: 'default'
  },

  // Circular dependency plugin configuration
  webpack(config, options) {
    if (!options.isServer || process.env.circularDependencies) {
      import('circular-dependency-plugin').then(
        ({ default: CircularDependencyPlugin }) => {
          config.plugins.push(
            new CircularDependencyPlugin({
              exclude: /a\.js|node_modules/,
              failOnError: false,
              allowAsyncCycles: true,
              cwd: process.cwd()
            })
          )
        }
      )
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    polyfills(config)

    return config
  }
}

// PWA configuration
const withPWA = require('@ducanh2912/next-pwa').default({
  disable: process.env.NODE_ENV === 'development',
  dest: 'public',
  publicExcludes: ['!favicon/**/*']
})

// Next.js plugins
const plugins = [withNx, withPWA, withNextIntl]

module.exports = composePlugins(...plugins)(nextConfig)
