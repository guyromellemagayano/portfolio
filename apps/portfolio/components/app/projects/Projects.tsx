'use client'

import { ProjectsList, ProjectsListCards } from '@components/List'
import { SimpleLayout } from '@components/layouts'
import { TBaseCommonAppComponentProps } from 'types/common'

/**
 * Renders the projects page.
 * @param translations - The translations to use.
 * @param projects - The projects to display.
 * @returns The projects page component.
 */
export default function ProjectsApp({
  translations,
  projects,
  ...props
}: TBaseCommonAppComponentProps): JSX.Element {
  return (
    <SimpleLayout
      id="hero"
      title={props?.hero?.heading || ''}
      intro={props?.hero?.description || []}
    >
      <ProjectsList>
        {projects?.map(project => (
          <ProjectsListCards
            key={project.link?.url || project.name}
            {...project}
          />
        ))}
      </ProjectsList>
    </SimpleLayout>
  )
}
