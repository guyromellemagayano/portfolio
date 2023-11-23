import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import { composePlugins, withNx } from '@nx/next'
import { withSentryConfig } from '@sentry/nextjs'
import remarkGfm from 'remark-gfm'

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  env: {
    nextPublicGaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    nextCmsWordPressUrl: process.env.NEXT_CMS_WORDPRESS_URL,
    sentryAuthToken: process.env.SENTRY_AUTH_TOKEN,
    sentryDsn: process.env.SENTRY_DSN,
    sentryOrg: process.env.SENTRY_ORG,
    sentryProject: process.env.SENTRY_PROJECT,
    sentryEnvironment: process.env.SENTRY_ENVIRONMENT
  },
  nx: {
    svgr: false
  },
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
    authToken: process.env.sentryAuthToken,
    silent: true
  },
  redirects: async () => {
    return [
      {
        source: '/welcome',
        destination: '/',
        permanent: true
      }
    ]
  }
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism]
  }
})

const plugins = [withNx]

export default composePlugins(...plugins)(withSentryConfig(withMDX(nextConfig)))
