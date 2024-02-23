import { Metadata } from 'next'

import WorkApp from '@guy-romelle-magayano/portfolio/components/app/Work'

import WorkData from '@guy-romelle-magayano/portfolio/data/work'

const data = WorkData()

export const metadata: Metadata = {
  title: data.meta?.title || '',
  description: data.meta?.description || '',
  keywords: data.meta?.keywords || ''
}

/**
 * Renders the about page.
 * @returns The about page component.
 */
const Page = async (): Promise<JSX.Element> => {
  return <WorkApp className="mt-16 sm:mt-32" data={data} />
}

export default Page
