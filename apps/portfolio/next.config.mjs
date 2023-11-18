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
  nx: {
    svgr: false
  },
  compiler: {
    styledComponents: true
  },
  reactStrictMode: true,
  sentry: {
    hideSourceMaps: true,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: true
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
