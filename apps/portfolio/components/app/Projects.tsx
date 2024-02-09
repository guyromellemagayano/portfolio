'use client'

import { ReactNode } from 'react'

import ContentLayout from '@/components/layouts/Content'
import ProjectsList from '@/components/list/Projects'

import { TProjectsData } from '@/data/projects'

type TProjectsApp = (data: TProjectsData) => ReactNode

/**
 * Renders the projects page.
 * @returns The projects page component.
 */
const ProjectsApp: TProjectsApp = data => {
  const heading = data?.hero?.heading || '',
    description = data?.hero?.description || []

  return (
    <ContentLayout
      id="hero"
      title={heading}
      intro={description}
      className="sm:px-8 mt-16 sm:mt-32"
    >
      <ProjectsList>
        {/* {projects?.map(project => (
          <ProjectsListCards
            key={project.link?.url || project.name}
            {...project}
          />
        ))} */}
      </ProjectsList>
    </ContentLayout>
  )
}

export default ProjectsApp
