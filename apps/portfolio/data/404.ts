import { TGenericPageData } from '@/types/common'

export type TNotFoundPageData<T = object> = TGenericPageData<T>

/**
 * Returns the data for the 404 page.
 * @returns {TNotFoundPageData} The data for the 404 page.
 */
const NotFoundPageData = (): TNotFoundPageData => {
  const meta = {
    title: '404 - Page Not Found - Guy Romelle Magayano',
    description: 'Page not found.',
    keywords:
      'guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs, 404, page not found'
  }

  const hero = {
    heading: 'Page not found.',
    description: [
      'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
    ]
  }

  return { meta, hero }
}

export default NotFoundPageData
