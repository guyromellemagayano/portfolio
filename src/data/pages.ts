import { IPagesData } from '@/interfaces/data'

const PagesData = (): IPagesData => {
  const pages = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Skills',
      link: '/skills',
    },
    {
      title: 'Work',
      link: '/work',
    },
    {
      title: 'Projects',
      link: '/projects',
    },
    {
      title: 'Articles',
      link: '/articles',
    },
    {
      title: 'Uses',
      link: '/uses',
    },
    {
      title: 'About',
      link: '/about',
    },
  ]

  const articles = []

  const projects = []

  return { pages, articles, projects }
}

export default PagesData
