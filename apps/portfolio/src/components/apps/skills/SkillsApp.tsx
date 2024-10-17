import { memo } from 'react'

import dynamic from 'next/dynamic'

import type { SkillsPageAppDataQuery } from '@portfolio/graphql'

// Dynamic imports
const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)

export type TSkillsAppProps = {
  data: SkillsPageAppDataQuery
}

const SkillsApp = memo(({ data }: TSkillsAppProps) => {
  return (
    <ContentSimpleLayout
      heading={data?.skillsPage?.hero?.heading}
      description={data?.skillsPage?.hero?.description}
    />
  )
})

SkillsApp.displayName = 'SkillsApp'

export default SkillsApp
