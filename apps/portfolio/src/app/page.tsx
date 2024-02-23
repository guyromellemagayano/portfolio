import { FC } from 'react'

import { Metadata } from 'next'

import HomeApp from '@guy-romelle-magayano/portfolio/components/app/Home'

import HomeData from '@guy-romelle-magayano/portfolio/data/home'

// import { getAllArticles } from '@/lib/articles'

const data = HomeData()

export const metadata: Metadata = {
  title: data.meta?.title || '',
  description: data.meta?.description || '',
  keywords: data.meta?.keywords || ''
}

/**
 * Renders the home page.
 * @returns The home page component.
 */
const Page: FC = async () => {
  return <HomeApp className="mt-9 sm:mt-9" data={data} />
}

export default Page
