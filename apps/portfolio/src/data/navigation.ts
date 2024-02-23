import type { TPagesData } from '@guy-romelle-magayano/portfolio/data/pages'
import PagesData from '@guy-romelle-magayano/portfolio/data/pages'

import type { TCommonAdditionalProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TNavigationData = TCommonAdditionalProps & {
  menu?: Array<TNavigationMenuData>
  headerNav?: TPagesData['pages']
  footerNav?: TPagesData['pages']
  copyright?: TNavigationCopyrightData
}

export type TNavigationMenuData = TCommonAdditionalProps & {
  title: string
  link: string
}

export type TNavigationCopyrightData = TCommonAdditionalProps & {
  year: number
  text: string
}

export type THeaderNavFilter = Array<string>

/**
 * Returns an object containing the navigation menu and copyright information.
 * @returns An object containing the navigation menu and copyright information.
 */
const NavigationData = (): TNavigationData => {
  const menu: TPagesData['pages'] = [],
    headerNavFilter: THeaderNavFilter = [
      'Skills',
      'Work',
      'Articles',
      'Projects',
      'About'
    ]

  // Destructure the data from the PagesData function
  const { pages } = PagesData()

  // Add the pages to the menu
  pages?.filter(item => item.title !== 'Home')?.map(item => menu.push(item))

  // Selected pages on header
  const headerNav: typeof menu = menu
    .filter(item => headerNavFilter.includes(item.title))
    .sort((a, b) => (a.title === 'Articles' && a.title > b.title ? -1 : 1))

  // Selected pages on footer
  const footerNav: typeof menu = menu
    .filter(item => !headerNavFilter.includes(item.title))
    .sort()

  const copyright: TNavigationCopyrightData = {
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
