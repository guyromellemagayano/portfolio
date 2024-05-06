import { Metadata } from 'next'

import { AboutApp } from '@guy-romelle-magayano/portfolio/components/apps/about'
import {
  aboutAppData,
  aboutPageData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the about page.
 * @returns The metadata for the about page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await aboutPageData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    keywords: meta?.keywords || ''
  }
}

/**
 * Renders the about page.
 * @returns The about page component.
 */
const Page = async () => {
  const data = await aboutAppData()

  return <AboutApp {...data} />
}

export default Page
