'use client'

import { ReactNode } from 'react'

import ContentLayout from '@/components/layouts/Content'
import WorkList from '@/components/list/Work'
import WorkListCards from '@/components/list/WorkCards'

import type { TWorkData } from '@/data/work'

type TWorkApp = (data: TWorkData) => ReactNode

/**
 * Renders the work page.
 * @returns The work page component.
 */
const WorkApp: TWorkApp = data => {
  const heading = data?.hero?.heading || '',
    description = data?.hero?.description || [],
    workExperiences = data?.workExperiences || []

  return (
    <ContentLayout
      id="hero"
      title={heading}
      intro={description}
      className="mt-16 sm:mt-32"
    >
      <div className="grid gap-y-12">
        {workExperiences?.map(item => {
          const duration = item?.duration || ''

          return (
            <WorkList key={duration} title={duration} {...item}>
              <WorkListCards {...item} />
            </WorkList>
          )
        })}
      </div>
    </ContentLayout>
  )
}

export default WorkApp
