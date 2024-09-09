import { apiUrls } from '@portfolio/configs'
import type {
  NavigationData,
  PagesData,
  PhotosData,
  SocialLinksData
} from '@portfolio/types'

import { fetchPageData } from './page'

/**
 * Fetches the pages data.
 * @returns The pages data.
 */
export const pagesData = async (): Promise<PagesData[]> =>
  await fetchPageData(apiUrls.pages)

/**
 * Fetches the social data.
 * @returns The social data.
 */
export const socialData = async (): Promise<SocialLinksData[]> =>
  await fetchPageData(apiUrls.social)

/**
 * Returns the photos data.
 * @returns The photos data.
 */
export const photosData = async (): Promise<PhotosData> =>
  await fetchPageData(apiUrls.photos)

/**
 * The pages to filter.
 */
// const pageFilter = ['articles', 'projects', 'about']
const pageFilter: string[] = []

/**
 * Retrieves the navigation data for the base layout.
 * @returns An object containing the header and footer menu data.
 */
export const navigationData = async (): Promise<NavigationData> => {
  const pages = await pagesData()

  const headerMenu =
    pages?.filter(item => pageFilter.includes(item.slug)) || null
  const footerMenu =
    pages?.filter(
      item => !pageFilter.includes(item.slug) && item.slug !== 'home'
    ) || null

  return {
    headerMenu,
    footerMenu
  }
}
