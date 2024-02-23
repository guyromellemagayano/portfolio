'use client'

import { FC, useId } from 'react'

import ContentLayout from '@guy-romelle-magayano/portfolio/components/layouts/Content'
import WorkList from '@guy-romelle-magayano/portfolio/components/list/Work'

import type {
  TWorkData,
  TWorkExperiences
} from '@guy-romelle-magayano/portfolio/data/work'

import {
  isArrayType,
  isEmpty
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

import WorkCardsList from '@guy-romelle-magayano/portfolio/components/list/WorkCards'

import { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TWorkAppDataProps = {
  data: TWorkData
}

export type TWorkAppProps = TCommonComponentProps & TWorkAppDataProps

/**
 * Renders the work page.
 * @param id The work page id.
 * @param data The work page data.
 * @param rest The work page props.
 * @returns The work page component.
 */
const WorkApp: FC<TWorkAppProps> = ({ id, data, ...rest }) => {
  const customId = useId()

  return (
    <ContentLayout
      id={id || customId}
      title={data.hero?.heading || ''}
      intro={data.hero?.description || []}
      {...rest}
    >
      <div className="grid gap-y-12">
        {isArrayType(data.workExperiences) &&
          !isEmpty(data.workExperiences) &&
          data.workExperiences.map(
            ({ duration, ...rest }: TWorkExperiences, index: number) => (
              <WorkList key={index} title={duration || ''} {...rest}>
                <WorkCardsList {...rest} />
              </WorkList>
            )
          )}
      </div>
    </ContentLayout>
  )
}

export default WorkApp
