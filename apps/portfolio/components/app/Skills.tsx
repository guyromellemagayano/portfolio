'use client'

import { ReactNode } from 'react'

import ContentLayout from '@/components/layouts/Content'
import SkillsList from '@/components/list/Skills'
import SkillsCardsList from '@/components/list/SkillsCards'

import { TSkillsData } from '@/data/skills'

type TSkillsApp = (data: TSkillsData) => ReactNode

/**
 * Renders the skills page.
 * @returns The skills page component.
 */
const SkillsApp: TSkillsApp = data => {
  const heading = data?.hero?.heading || '',
    description = data?.hero?.description || [],
    skills = data?.skills || []

  return (
    <ContentLayout
      id="hero"
      title={heading}
      intro={description}
      className="mt-16 sm:mt-32"
    >
      <div className="grid gap-y-12">
        {skills?.map(skill => {
          const name = skill?.name || ''
          const items = skill?.items || []

          return (
            <SkillsList key={name} title={name}>
              {items?.map(rest => {
                const title = rest?.title || ''

                return <SkillsCardsList key={title} {...rest} />
              })}
            </SkillsList>
          )
        })}
      </div>
    </ContentLayout>
  )
}

export default SkillsApp
