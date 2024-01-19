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
const Page = async (): Promise<JSX.Element> => {
  return <ProjectsApp {...data} />
}

export default Page
