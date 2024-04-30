import { MetadataRoute } from 'next'

import { SITE_URL } from '@guy-romelle-magayano/portfolio/configs'

/**
 * Generates the robots for the portfolio application.
 * @returns An array of metadata routes for the robots.
 */
const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/'
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  }
}

export default robots
