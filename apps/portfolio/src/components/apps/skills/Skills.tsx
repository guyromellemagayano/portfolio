'use client'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  ContentLayout,
  SkillsCardsList,
  SkillsList
} from '@guy-romelle-magayano/portfolio/components'
import {
  type SkillsData,
  type SkillsItemData,
  type SkillsPageData
} from '@guy-romelle-magayano/portfolio/types'

export type SkillsAppProps = SkillsPageData

/**
 * Renders the skills page component.
 * @param {SkillsAppProps} props - The props of the skills page.
 * @returns The rendered skills page component.
 */
const SkillsApp = (props: SkillsAppProps) => {
  const { hero, skills } = props,
    heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    heading &&
    heading?.length > 0 &&
    description &&
    ((typeof description === 'string' && description?.length > 0) ||
      (Array.isArray(description) && description?.length > 0)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {skills && skills?.length > 0 && (
          <Div className="grid gap-y-12">
            {skills.map(({ name, items }: SkillsData, index: number) => (
              <SkillsList key={index} title={name}>
                {items &&
                  items?.length > 0 &&
                  items.map((rest: SkillsItemData, index: number) => (
                    <SkillsCardsList key={index} {...rest} />
                  ))}
              </SkillsList>
            ))}
          </Div>
        )}
      </ContentLayout.Simple>
    )
  )
}

SkillsApp.displayName = 'SkillsApp'

export default SkillsApp
