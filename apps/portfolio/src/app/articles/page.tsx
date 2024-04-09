import { Metadata } from 'next'

import ArticlesApp from '@guy-romelle-magayano/portfolio/components/Apps/Articles/Articles'
import {
  articlesAppData,
  articlesPageData
} from '@guy-romelle-magayano/portfolio/utils/page'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await articlesPageData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    keywords: meta?.keywords || ''
  }
}

/**
 * Renders the articles page.
 * @returns The articles page component.
 */
const Page = async () => {
  const data = await articlesAppData()

  return <ArticlesApp {...data} />
}

export default Page
