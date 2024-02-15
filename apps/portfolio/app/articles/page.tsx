import { FC } from 'react'

import { Metadata } from 'next'

import ArticlesApp from '@/components/app/Articles'

import ArticlesData from '@/data/articles'

const data = ArticlesData()

export const metadata: Metadata = {
  title: data?.meta?.title || '',
  description: data?.meta?.description || '',
  keywords: data?.meta?.keywords || ''
}

/**
 * Renders the about page.
 * @returns The about page component.
 */
const Page: FC = async () => {
  return <ArticlesApp className="mt-16 sm:mt-32" data={data} />
}

export default Page
