import { MetadataRoute } from 'next'

import { PORTFOLIO_SITE_URL } from '@portfolio/configs'

/**
 * Generates the sitemap for the portfolio application.
 * @returns An array of metadata routes for the sitemap.
 */
const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: PORTFOLIO_SITE_URL!,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    }
    // {
    //   url: `${NEXT_PUBLIC_PORTFOLIO_SITE_URL}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8
    // },
    // {
    //   url: `${NEXT_PUBLIC_PORTFOLIO_SITE_URL}/articles`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 1
    // },
    // {
    //   url: `${NEXT_PUBLIC_PORTFOLIO_SITE_URL}/projects`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 1
    // },
    // {
    //   url: `${NEXT_PUBLIC_PORTFOLIO_SITE_URL}/work`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8
    // }
  ]
}

export default sitemap
