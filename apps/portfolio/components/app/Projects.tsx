'use client'

import { ProjectsData } from '@/data'

import { ContentLayout, ProjectsList } from '@/components'

/**
 * Renders the projects page.
 * @returns The projects page component.
 */
const ProjectsApp = (): JSX.Element => {
  const { hero } = ProjectsData()

  return (
    <ContentLayout
      id="hero"
      title={hero?.heading || ''}
      intro={hero?.description || []}
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
