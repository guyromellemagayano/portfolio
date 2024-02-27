import type { TCommonAdditionalProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TPagesData = TCommonAdditionalProps & {
  pages: Array<TPagesPages>
  articles: Array<never>
  projects: Array<never>
}

export type TPagesPages = {
  title: string
  link: string
}

/**
 * Returns an object containing data for the pages, articles, and projects of the portfolio.
 * @returns An object containing data for the pages, articles, and projects of the portfolio.
 */
const PagesData = (): TPagesData => {
  const pages = [
      {
        title: 'Home',
        link: '/'
      },
      {
        title: 'Skills',
        link: '/skills'
      },
      {
        title: 'Work',
        link: '/work'
      },
      {
        title: 'Projects',
        link: '/projects'
      },
      {
        title: 'Articles',
        link: '/articles'
      },
      {
        title: 'Uses',
        link: '/uses'
      },
      {
        title: 'About',
        link: '/about'
      }
    ],
    articles: Array<never> = [],
    projects: Array<never> = []

  return { pages, articles, projects }
}

export default PagesData
