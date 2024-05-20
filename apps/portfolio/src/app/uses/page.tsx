import { Metadata } from 'next'

import { UsesApp } from '@guy-romelle-magayano/portfolio/components'
import {
  usesAppData,
  usesPageData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the uses page.
 * @returns The metadata for the uses page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await usesPageData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    keywords: meta?.keywords || ''
  }
}

/**
 * Renders the uses page.
 * @returns The uses page component.
 */
const Page = async () => {
  const data = await usesAppData()

  return <UsesApp {...data} />
}

export default Page
