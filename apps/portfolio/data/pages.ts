export type TPagesData<T = object> = T & {
  pages: Array<{
    title: string
    link: string
  }>
  articles: Array<never>
  projects: Array<never>
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
  ]
  const articles = []
  const projects = []

  return { pages, articles, projects }
}

export default PagesData
