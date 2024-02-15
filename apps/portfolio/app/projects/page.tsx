import { FC } from 'react'

import { Metadata } from 'next'

import ProjectsApp from '@/components/app/Projects'

import ProjectsData from '@/data/projects'

const data = ProjectsData()

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
  return <ProjectsApp className="sm:px-8 mt-16 sm:mt-32" data={data} />
}

export default Page
