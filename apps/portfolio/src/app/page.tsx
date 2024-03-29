import { Metadata } from 'next'

import { HomeApp } from '@guy-romelle-magayano/portfolio/components/Apps/Home'
import { fullServerUrl } from '@guy-romelle-magayano/portfolio/utils'

/**
 * Fetches the data for the home page.
 * @returns The data for the home page.
 */
const homeData = async () =>
  await fetch(fullServerUrl('api/json?data=home')).then(res => res.json())

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const data = await homeData()

  return {
    title: data?.meta?.title || '',
    description: data?.meta?.description || '',
    keywords: data?.meta?.keywords || ''
  }
}

/**
 * Renders the home page.
 * @returns The home page component.
 */
const Page = async () => {
  const data = await homeData()

  return <HomeApp {...data}></HomeApp>
}

export default Page
