'use client'

import { ContentLayout, WorkList, WorkListCards } from '@/components'

import { WorkData } from '@/data'

/**
 * Renders the work page.
 * @returns The work page component.
 */
const WorkApp = (): JSX.Element => {
  const { hero, workExperiences } = WorkData()

  return (
    <ContentLayout
      id="hero"
      title={hero?.heading || ''}
      intro={hero?.description || []}
      className="mt-16 sm:mt-32"
    >
      <div className="grid gap-y-12">
        {workExperiences?.map(item => (
          <WorkList
            key={item.duration || ''}
            title={item?.duration || ''}
            {...item}
          >
            <WorkListCards {...item} />
          </WorkList>
        ))}
      </div>
    </ContentLayout>
  )
}

export default WorkApp
