'use client'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  ContentLayout,
  WorkCardsList,
  WorkList
} from '@guy-romelle-magayano/portfolio/components'
import {
  type WorkExperienceData,
  type WorkPageData
} from '@guy-romelle-magayano/portfolio/types'

export type WorkAppProps = WorkPageData

/**
 * Render the work application component.
 * @param {WorkAppProps} props - The props of the work application.
 * @returns The rendered work application component.
 */
const WorkApp = (props: WorkAppProps) => {
  const { hero, workExperiences } = props,
    heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    heading &&
    heading?.length > 0 &&
    description &&
    ((typeof description === 'string' && description?.length > 0) ||
      (Array.isArray(description) && description?.length > 0)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {workExperiences && workExperiences?.length > 0 && (
          <Div className="grid gap-y-12">
            {workExperiences.map(
              ({ duration, ...rest }: WorkExperienceData, index: number) => (
                <WorkList key={index} title={duration} {...rest}>
                  <WorkCardsList {...rest} />
                </WorkList>
              )
            )}
          </Div>
        )}
      </ContentLayout.Simple>
    )
  )
}

WorkApp.displayName = 'WorkApp'

export default WorkApp
