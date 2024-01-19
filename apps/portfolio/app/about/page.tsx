import { Metadata } from 'next'

import AboutApp from '@/components/app/About'

import AboutData from '@/data/about'

const data = AboutData()

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
  return <AboutApp {...data} />
}

export default Page
