'use client'

import { FC, useId } from 'react'

import ContentLayout from '@guy-romelle-magayano/portfolio/components/layouts/Content'
import ProjectsList from '@guy-romelle-magayano/portfolio/components/list/Projects'

import { TProjectsData } from '@guy-romelle-magayano/portfolio/data/projects'

import type { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TProjectsAppDataProps = {
  data: TProjectsData
}

export type TProjectsAppProps = TCommonComponentProps & TProjectsAppDataProps

/**
 * Renders the projects page.
 * @param id The projects page id.
 * @param data The projects page data.
 * @param rest The projects page props
 * @returns The projects page component.
 */
const ProjectsApp: FC<TProjectsAppProps> = ({ id, data, ...rest }) => {
  const customId = useId()

  return (
    <ContentLayout
      id={id || customId}
      title={data.hero?.heading || ''}
      intro={data.hero?.description || []}
      {...rest}
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
