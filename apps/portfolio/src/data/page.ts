import {
  HomePageData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types/data'
import { fullServerUrl } from '@guy-romelle-magayano/portfolio/utils'

const apiUrls = {
  home: 'api/json?data=home',
  social: 'api/json?data=social'
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
export const socialData = async (): Promise<SocialLinksData[]> =>
  await fetch(fullServerUrl(apiUrls.social))
    .then(res => res.json())
    .catch(() => [])
