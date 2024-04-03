import { apiUrls } from '@guy-romelle-magayano/portfolio/configs'
import {
  ArticlesAppData,
  ArticlesPageData,
  HomeAppData,
  HomePageData
} from '@guy-romelle-magayano/portfolio/types'
import { articlesData } from '@guy-romelle-magayano/portfolio/utils'
import {
  fullServerUrl,
  socialData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Returns the full server URL with its protocol, host, and pathname.
 * @param url - The URL to fetch.
 * @returns The page data.
 */
export const fetchPageData = async (url: string): Promise<any> =>
  await fetch(fullServerUrl(url))
    .then(res => res.json())
    .catch(() => ({}))

/**
 * Fetches the home page data.
 * @returns The home page data.
 */
export const homePageData = async (): Promise<HomePageData> =>
  await fetchPageData(apiUrls.home)

/**
 * Returns the home app data.
 * @returns The home app data.
 */
export const homeAppData = async (): Promise<HomeAppData> => {
  const page = await homePageData(),
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

/**
 * Returns the articles page data.
 * @returns The articles page data.
 */
export const articlesPageData = async (): Promise<ArticlesPageData> =>
  await fetchPageData(apiUrls.articles)

/**
 * Returns the articles app data.
 * @returns The articles app data.
 */
export const articlesAppData = async (): Promise<ArticlesAppData> => {
  const page = await articlesPageData(),
    articles = await articlesData(),
    data = await Promise.all([page, articles]).then(([page, articles]) => {
      const { meta, ...newPage } = page,
        newArticles = articles.map(({ component, ...article }) => article)

      return {
        ...newPage,
        articles: newArticles
      }
    })

  return data
}
