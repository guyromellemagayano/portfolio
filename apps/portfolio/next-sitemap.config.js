/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.guyromellemagayano.dev',
  basePath: '/',
  sitemapBaseFileName: 'sitemap',
  generateRobotsTxt: true,
}
