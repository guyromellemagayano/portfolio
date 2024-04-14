'use client'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import { ContentLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Content'
import { SkillsList } from '@guy-romelle-magayano/portfolio/components/Lists/Skills'
import { SkillsCardsList } from '@guy-romelle-magayano/portfolio/components/Lists/SkillsCards'
import {
  SkillsData,
  SkillsItemData,
  SkillsPageData
} from '@guy-romelle-magayano/portfolio/types'

export type SkillsAppProps = SkillsPageData

/**
 * Renders the skills page component.
 * @param props - The props of the skills page.
 * @returns The rendered skills page component.
 */
const SkillsApp = (props: SkillsAppProps) => {
  const { hero, skills } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    !isEmpty(heading) &&
    isStringType(heading) &&
    !isEmpty(description) &&
    (isStringType(description) || isArrayType(description)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {!isEmpty(skills) && isArrayType(skills) && (
          <Div className="grid gap-y-12">
            {skills?.map(({ name, items }: SkillsData, index: number) => (
              <SkillsList key={index} title={name}>
                {!isEmpty(items) &&
                  isArrayType(items) &&
                  items?.map((rest: SkillsItemData, index: number) => (
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

export default SkillsApp
