import { Metadata } from 'next'

import UsesApp from '@/components/app/Uses'

import UsesData from '@/data/uses'

const data = UsesData()

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
  return <UsesApp {...data} />
}

export default Page
