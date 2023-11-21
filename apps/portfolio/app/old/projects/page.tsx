import { ProjectsApp } from '@components/app/projects'
import ProjectsData from '@data/projects'
import { getAllProjects } from '@lib/projects'
import { Metadata } from 'next'

const { meta, ...rest } = ProjectsData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders the projects page
 * @param locale - The locale to use.
 * @returns The projects page component
 */
export default async function ProjectPage({
  params: { locale }
}): Promise<JSX.Element> {
  const projects = await getAllProjects()
  const translations = {}

  return (
    <ProjectsApp translations={translations} projects={projects} {...rest} />
  )
}
