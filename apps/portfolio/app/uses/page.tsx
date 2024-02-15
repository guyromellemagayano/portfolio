import { FC } from 'react'

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
const Page: FC = async () => {
  return <UsesApp className="sm:px-8 mt-16 sm:mt-32" data={data} />
}

export default Page
