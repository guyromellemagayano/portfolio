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
const Page = async (): Promise<JSX.Element> => {
  return <ArticlesApp {...data} />
}

export default Page
