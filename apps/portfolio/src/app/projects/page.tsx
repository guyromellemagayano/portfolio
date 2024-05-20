import { Metadata } from 'next'

import { ProjectsApp } from '@guy-romelle-magayano/portfolio/components'
import {
  projectsAppData,
  projectsPageData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the projects page.
 * @returns The metadata for the projects page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await projectsPageData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    keywords: meta?.keywords || ''
  }
}

/**
 * Renders the projects page.
 * @returns The projects page component.
 */
const Page = async () => {
  const data = await projectsAppData()

  return <ProjectsApp {...data} />
}

export default Page
