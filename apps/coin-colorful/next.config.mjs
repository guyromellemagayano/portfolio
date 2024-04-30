// @ts-nocheck
import { composePlugins, withNx } from '@nx/next'

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false
  },
  pageExtensions: ['js', 'ts', 'tsx'],
  env: {},
  compiler: {
    removeConsole: {
      exclude: ['error', 'log']
    }
  }
}

const plugins = [withNx]

export default composePlugins(...plugins)(nextConfig)
