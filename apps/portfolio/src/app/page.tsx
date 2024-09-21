import { Metadata } from 'next'

import { HomeApp } from '@portfolio/components'
// import { getQueryClient } from '@portfolio/libs'
import { faviconsData, homeAppData, homePageData } from '@portfolio/utils'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await homePageData()
  const { icons, manifest } = await faviconsData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    manifest,
    icons
  }
}

/**
 * Renders the home page.
 * @param {THomePageProps} props - The page props
 * @returns The rendered home page
 */
const HomePage = async () => {
  // const queryClient = getQueryClient()

  const data = await homeAppData()

  return <HomeApp {...data} />
}

export default HomePage
