import { Metadata } from 'next'

import WorkApp from '@/components/app/Work'

import WorkData from '@/data/work'

const data = WorkData()

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
  return <WorkApp data={data} />
}

export default Page
