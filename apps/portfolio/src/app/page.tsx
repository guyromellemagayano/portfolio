import { Metadata } from 'next'

import { HomeApp } from '@portfolio/components'
import { homeAppData, homePageData } from '@portfolio/utils'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await homePageData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    keywords: meta?.keywords || ''
  }
}

/**
 * Renders the home app page.
 * @returns The rendered home page app
 */
const Page = async () => {
  const data = await homeAppData()

  return <HomeApp {...data} />
}

export default Page
