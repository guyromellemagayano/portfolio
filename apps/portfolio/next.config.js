// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')
const { withSentryConfig } = require('@sentry/nextjs')
const nextMDX = require('@next/mdx')
const rehypePrism = require('@mapbox/rehype-prism')
const remarkGfm = require('remark-gfm')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true
  },
  env: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    NX_VERCEL_REMOTE_CACHE_TOKEN: process.env.NX_VERCEL_REMOTE_CACHE_TOKEN,
    NX_VERCEL_REMOTE_CACHE_TEAM: process.env.NX_VERCEL_REMOTE_CACHE_TEAM,
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN || '',
    SENTRY_ORG: process.env.SENTRY_ORG || '',
    SENTRY_PROJECT: process.env.SENTRY_PROJECT || '',
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || ''
  },
  compiler: {
    // For other options, see https://nextjs.org/docs/architecture/nextjs-compiler#emotion
    emotion: true
  },
  sentry: {
    hideSourceMaps: true
  }
}

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG || '',
  project: process.env.SENTRY_PROJECT || '',
  authToken: process.env.SENTRY_AUTH_TOKEN || '',
  silent: true
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism]
  }
})

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withMDX
]

module.exports = withSentryConfig(
  composePlugins(...plugins)(nextConfig),
  sentryWebpackPluginOptions
)
