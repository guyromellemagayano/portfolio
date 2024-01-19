import type { TPagesData } from '@/data/pages'
import PagesData from '@/data/pages'

export type TNavigationData<T = object> = T & {
  menu: Array<TNavigationMenuData>
  headerNav: TNavigationData['menu']
  footerNav: TNavigationData['headerNav']
  copyright: {
    year: number
    text: string
  }
}

export type TNavigationMenuData<T = object> = T & {
  title: string
  link: string
}

/**
 * Returns an object containing the navigation menu and copyright information.
 * @returns An object containing the navigation menu and copyright information.
 */
const NavigationData = (): TNavigationData => {
  const menu: TPagesData['pages'] = []
  const headerNavFilter: string[] = [
    'Skills',
    'Work',
    'Articles',
    'Projects',
    'About'
  ]

  // Destructure the data from the PagesData function
  const { pages } = PagesData()

  // Add the pages to the menu
  pages.filter(item => item.title !== 'Home').map(item => menu.push(item))

  // Selected pages on header
  const headerNav: typeof menu = menu
    .filter(item => headerNavFilter.includes(item.title))
    .sort((a, b) => (a.title === 'Articles' && a.title > b.title ? -1 : 1))

  // Selected pages on footer
  const footerNav: typeof menu = menu
    .filter(item => !headerNavFilter.includes(item.title))
    .sort()

  const copyright: TNavigationData['copyright'] = {
    year: new Date().getFullYear(),
    text: 'Guy Romelle Magayano. All rights reserved.'
  }

  return {
    menu,
    headerNav,
    footerNav,
    copyright
  }
}

export default NavigationData
