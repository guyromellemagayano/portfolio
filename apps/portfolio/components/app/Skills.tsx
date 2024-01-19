'use client'

import ContentLayout from '@/components/layouts/Content'
import SkillsList from '@/components/list/Skills'
import SkillsCardsList from '@/components/list/SkillsCards'

import { TSkillsData } from '@/data/skills'

/**
 * Renders the skills page.
 * @returns The skills page component.
 */
const SkillsApp = (data: TSkillsData): JSX.Element => {
  const heading = data?.hero?.heading || ''
  const description = data?.hero?.description || []
  const skills = data?.skills || []

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
              {items?.map(
                (rest) => {
                const title = rest?.title || ''

                  return (
                    <SkillsCardsList
                      key={title}
                      {...rest}
                    />
                  )
                }
              )}
            </SkillsList>
          )
        })}
      </div>
    </ContentLayout>
  )
}

export default SkillsApp
