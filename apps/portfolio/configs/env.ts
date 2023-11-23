export const NEXT_CMS_WORDPRESS_URL: any =
  process.env.NODE_ENV === 'production'
    ? process.env.nextCmsWordPressUrl
    : 'http://guy-romelle-magayano.lndo.site/graphql'
