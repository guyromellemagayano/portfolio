import rehypePrism from '@mapbox/rehype-prism'
import nextMDX from '@next/mdx'
import { withSentryConfig } from '@sentry/nextjs'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    reactStrictMode: true,
    experimental: {
        scrollRestoration: true,
    },
    sentry: {
        hideSourceMaps: true,
    },
}

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
    },
})

const sentryWebpackPluginOptions = {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: true,
}

export default withSentryConfig(withMDX(nextConfig), sentryWebpackPluginOptions)
