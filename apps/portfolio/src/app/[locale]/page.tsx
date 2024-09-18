import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'

import { HomeApp } from '@portfolio/components'
import { homeAppData, homePageData } from '@portfolio/utils'

import { TRootLayoutProps } from './layout'

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

export type THomePageProps = Pick<TRootLayoutProps, 'params'>

/**
 * Renders the home app page.
 * @param {THomePageProps} props - The app props
 * @returns The rendered home page app
 */
const Page = async ({ params }: THomePageProps) => {
  unstable_setRequestLocale(params.locale)

  const data = await homeAppData()

  return <HomeApp {...data} />
}

export default Page
