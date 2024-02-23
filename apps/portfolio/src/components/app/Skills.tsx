'use client'

import { FC, useId } from 'react'

import ContentLayout from '@guy-romelle-magayano/portfolio/components/layouts/Content'
import SkillsList from '@guy-romelle-magayano/portfolio/components/list/Skills'
import SkillsCardsList from '@guy-romelle-magayano/portfolio/components/list/SkillsCards'

import {
  TSkillsData,
  TSkillsDataProps,
  TSkillsItemsProps
} from '@guy-romelle-magayano/portfolio/data/skills'

import type { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'
import {
  isArrayType,
  isEmpty
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

export type TSkillsAppDataProps = {
  data: TSkillsData
}

export type TSkillsAppProps = TCommonComponentProps & TSkillsAppDataProps

/**
 * Renders the skills page.
 * @param id The skills page id.
 * @param data The skills page data.
 * @param rest The skills page props.
 * @returns The skills page component.
 */
const SkillsApp: FC<TSkillsAppProps> = ({ id, data, ...rest }) => {
  const customId = useId()

  return (
    <ContentLayout
      id={id || customId}
      title={data.hero?.heading || ''}
      intro={data.hero?.description || []}
      {...rest}
    >
      <div className="grid gap-y-12">
        {isArrayType(data.skills) &&
          !isEmpty(data.skills) &&
          data.skills.map((skill: TSkillsDataProps, index: number) => (
            <SkillsList key={index} title={skill?.name || ''}>
              {isArrayType(skill?.items) &&
                !isEmpty(skill?.items) &&
                skill.items.map((rest: TSkillsItemsProps, index: number) => (
                  <SkillsCardsList key={index} {...rest} />
                ))}
            </SkillsList>
          ))}
      </div>
    </ContentLayout>
  )
}

export default SkillsApp
