import { MetadataRoute } from 'next'

import { PORTFOLIO_SITE_URL } from '@portfolio/configs'

/**
 * Generates the robots for the portfolio application.
 * @returns An array of metadata routes for the robots.
 */
const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '*',
      disallow: '/api/'
    },
    sitemap: `${PORTFOLIO_SITE_URL}/sitemap.xml`
  }
}

export default robots
