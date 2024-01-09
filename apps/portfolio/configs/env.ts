export const NEXT_CMS_WORDPRESS_URL: any =
  process.env.NODE_ENV === 'production'
    ? process.env.nextCmsWordPressUrl
    : 'http://guy-romelle-magayano.lndo.site/graphql'
export const LAZY_LOADING_DURATION: number = 1000
