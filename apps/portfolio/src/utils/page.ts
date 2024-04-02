import { headers } from 'next/headers'

import {
  HomePageData,
  PagesData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types/data'

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
