import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'

import { HomeApp } from '@portfolio/components'
import { homeAppData, homePageData } from '@portfolio/utils'
import { FC } from 'react'

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

export type THomePageProps = {
  params: THomePageParamsData
}
export type THomePageParamsData = {
  locale: string
}

/**
 * Renders the home app page.
 * @returns The rendered home page app
 */
const Page: FC<THomePageProps> = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale)

  const data = await homeAppData()

  return <HomeApp {...data} />
}

export default Page
