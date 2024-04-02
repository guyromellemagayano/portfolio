import { Metadata } from 'next'

import { HomeApp } from '@guy-romelle-magayano/portfolio/components/Apps/Home'
import { articlesData } from '@guy-romelle-magayano/portfolio/utils'
import {
  homeData,
  socialData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await homeData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    keywords: meta?.keywords || ''
  }
}

/**
 * Renders the home page.
 * @returns The home page component.
 */
const Page = async () => {
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

  return <HomeApp {...data}></HomeApp>
}

export default Page
