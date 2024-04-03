import { apiUrls } from '@guy-romelle-magayano/portfolio/configs'
import {
  NavigationData,
  PagesData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'
import { fetchPageData } from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Fetches the pages data.
 * @returns The pages data.
 */
export const pagesData = async (): Promise<Array<PagesData>> =>
  await fetchPageData(apiUrls.pages)

/**
 * Fetches the social data.
 * @returns The social data.
 */
export const socialData = async (): Promise<Array<SocialLinksData>> =>
  await fetchPageData(apiUrls.social)

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
