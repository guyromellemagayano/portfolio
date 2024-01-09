'use client'

import { SkillsData } from '@/data'

import { ContentLayout, SkillsList, SkillsListCards } from '@/components'

/**
 * Renders the skills page.
 * @returns The skills page component.
 */
const SkillsApp = (): JSX.Element => {
  const { hero, skills } = SkillsData()

  return (
    <ContentLayout
      id="hero"
      title={hero?.heading || ''}
      intro={hero?.description || []}
      className="mt-16 sm:mt-32"
    >
      <div className="grid gap-y-12">
        {skills?.map(skill => (
          <SkillsList key={skill.name} title={skill.name}>
            {skill.items?.map(({ skillLevel, ...rest }) => (
              <SkillsListCards key={rest.title} {...rest} />
            ))}
          </SkillsList>
        ))}
      </div>
    </ContentLayout>
  )
}

export default SkillsApp
