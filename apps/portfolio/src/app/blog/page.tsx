import { Metadata } from 'next'

import { ArticlesApp } from '@guy-romelle-magayano/portfolio/components'
import {
  articlesAppData,
  articlesPageData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the blog page.
 * @returns The metadata for the blog page.
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
 * Renders the blog page.
 * @returns The blog page component.
 */
const Page = async () => {
  const data = await articlesAppData()

  return <ArticlesApp {...data} />
}

export default Page
