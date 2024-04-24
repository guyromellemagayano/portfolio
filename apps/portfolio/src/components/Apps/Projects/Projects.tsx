'use client'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import { ContentLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Content'
import { ProjectsList } from '@guy-romelle-magayano/portfolio/components/Lists/Projects'
import { ProjectsCardsList } from '@guy-romelle-magayano/portfolio/components/Lists/ProjectsCards'
import type {
  ProjectsData,
  ProjectsPageData
} from '@guy-romelle-magayano/portfolio/types'

export type ProjectsAppProps = ProjectsPageData & {
  projects?: Array<ProjectsData>
}

/**
 * Render the projects application component.
 * @param props - The props of the projects application.
 * @returns The rendered projects application component.
 */
const ProjectsApp = (props: ProjectsAppProps) => {
  const { hero, projects } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    !isEmpty(heading) &&
    isStringType(heading) &&
    !isEmpty(description) &&
    (isStringType(description) || isArrayType(description)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {!isEmpty(projects) && isArrayType(projects) && (
          <ProjectsList>
            {projects?.map((project, index) => (
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
