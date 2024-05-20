import { Metadata } from 'next'

import { WorkApp } from '@guy-romelle-magayano/portfolio/components'
import {
  workAppData,
  workPageData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the work page.
 * @returns The metadata for the work page.
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
 * Renders the work page.
 * @returns The work page component.
 */
const Page = async () => {
  const data = await workAppData()

  return <WorkApp {...data} />
}

export default Page
