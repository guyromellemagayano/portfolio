import {
  HomePageData,
  PagesData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types/data'
import { fullServerUrl } from '@guy-romelle-magayano/portfolio/utils'

const apiUrls = {
  home: 'api/json?data=home',
  social: 'api/json?data=social',
  pages: 'api/json?data=pages'
}

/**
 * Fetches the home page data.
 * @returns The home page data.
 */
export const homeData = async (): Promise<HomePageData> =>
  await fetch(fullServerUrl(apiUrls.home))
    .then(res => res.json())
    .catch(() => ({}))

/**
 * Fetches the social data.
 * @returns The social data.
 */
export const socialData = async (): Promise<Array<SocialLinksData>> =>
  await fetch(fullServerUrl(apiUrls.social))
    .then(res => res.json())
    .catch(() => [])

/**
 * Fetches the pages data.
 * @returns The pages data.
 */
export const pagesData = async (): Promise<Array<PagesData>> =>
  await fetch(fullServerUrl(apiUrls.pages))
    .then(res => res.json())
    .catch(() => [])
