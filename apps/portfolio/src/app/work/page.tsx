import { Metadata } from 'next'

import { WorkApp } from '@guy-romelle-magayano/portfolio/components/Apps/Work'
import {
  workAppData,
  workPageData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await workPageData()

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
  const data = await workAppData()

  return <WorkApp {...data} />
}

export default Page
