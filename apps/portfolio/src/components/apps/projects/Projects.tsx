'use client'

import {
  ContentLayout,
  ProjectsCardsList,
  ProjectsList
} from '@guy-romelle-magayano/portfolio/components'
import {
  type ProjectsData,
  type ProjectsPageData
} from '@guy-romelle-magayano/portfolio/types'

export type ProjectsAppProps = ProjectsPageData & {
  projects?: Array<ProjectsData>
}

/**
 * Render the projects application component.
 * @param {ProjectsAppProps} props - The props of the projects application.
 * @returns The rendered projects application component.
 */
const ProjectsApp = (props: ProjectsAppProps) => {
  const { hero, projects } = props,
    heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    heading &&
    heading?.length > 0 &&
    description &&
    ((typeof description === 'string' && description?.length > 0) ||
      (Array.isArray(description) && description?.length > 0)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {projects && projects?.length > 0 && (
          <ProjectsList>
            {projects.map((project, index) => (
              <ProjectsCardsList key={index} {...project} />
            ))}
          </ProjectsList>
        )}
      </ContentLayout.Simple>
    )
  )
}

ProjectsApp.displayName = 'ProjectsApp'

export default ProjectsApp
