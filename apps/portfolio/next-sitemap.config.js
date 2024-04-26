const { SITE_URL } = require('@guy-romelle-magayano/portfolio/configs')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  basePath: '/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/thank-you'],
  priority: 1
}
