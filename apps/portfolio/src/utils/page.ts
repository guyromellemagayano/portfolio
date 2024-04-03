import { headers } from 'next/headers'

import {
  HomeAppData,
  HomePageData,
  NavigationData,
  PagesData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'
import { articlesData } from '@guy-romelle-magayano/portfolio/utils'

const apiUrls = {
  home: 'api/json?data=home',
  social: 'api/json?data=social',
  pages: 'api/json?data=pages'
}

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param pathname - The pathname to use.
 * @returns The full server URL.
 */
export const fullServerUrl = (pathname: string): string => {
  const headersList = headers()

  return (
    `${headersList.get('x-forwarded-proto') + '://' + headersList.get('host') + '/'}` +
    pathname
  )
}

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param url - The URL to fetch.
 * @returns The page data.
 */
const fetchPageData = async (url: string): Promise<any> =>
  await fetch(fullServerUrl(url))
    .then(res => res.json())
    .catch(() => ({}))

/**
 * Fetches the home page data.
 * @returns The home page data.
 */
export const homeData = async (): Promise<HomePageData> =>
  await fetchPageData(apiUrls.home)

/**
 * Fetches the social data.
 * @returns The social data.
 */
export const socialData = async (): Promise<Array<SocialLinksData>> =>
  await fetchPageData(apiUrls.social)

/**
 * Fetches the pages data.
 * @returns The pages data.
 */
export const pagesData = async (): Promise<Array<PagesData>> =>
  await fetchPageData(apiUrls.pages)

/**
 * Retrieves the navigation data for the base layout.
 * @returns An object containing the header and footer menu data.
 */
export const navigationData = async (): Promise<NavigationData> => {
  const pages = await pagesData(),
    pageFilter = ['skills', 'work', 'articles', 'projects', 'about'],
    headerMenu = pages.filter(page => pageFilter.includes(page.slug)),
    footerMenu = pages.filter(
      page => !pageFilter.includes(page.slug) && page.slug !== 'home'
    )

  return {
    headerMenu,
    footerMenu
  }
}

/**
 * Returns the home app data.
 * @returns The home app data.
 */
export const homeAppData = async (): Promise<HomeAppData> => {
  const page = await homeData(),
    social = await socialData(),
    articles = await articlesData(),
    data = await Promise.all([page, social, articles]).then(
      ([page, social, articles]) => {
        const { meta, ...newPage } = page,
          newArticles = articles.map(({ component, ...article }) => article)

        return {
          ...newPage,
          links: social,
          articles: newArticles
        }
      }
    )

  return data
}
