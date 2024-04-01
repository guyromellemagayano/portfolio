import { Metadata } from 'next'

import { HomeApp } from '@guy-romelle-magayano/portfolio/components/Apps/Home'
import { homeData, socialData } from '@guy-romelle-magayano/portfolio/data/page'

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
  const page = await homeData(),
    social = await socialData()

  let data =
    (await Promise.all([page, social]).then(([page, social]) => {
      const { meta, ...rest } = page

      return {
        ...rest,
        links: social
      }
    })) || undefined

  return <HomeApp {...data}></HomeApp>
}

export default Page
