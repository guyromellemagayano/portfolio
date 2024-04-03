import { Metadata } from 'next'

import { HomeApp } from '@guy-romelle-magayano/portfolio/components/Apps/Home'
import {
  homeAppData,
  homeData
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
  const data = await homeAppData()

  return <HomeApp {...data}></HomeApp>
}

export default Page
