'use client'

import { FC, useId } from 'react'

import ContentLayout from '@/components/layouts/Content'
import SkillsList from '@/components/list/Skills'
import SkillsCardsList from '@/components/list/SkillsCards'

import { TSkillsData, TSkillsDataProps, TSkillsItemsProps } from '@/data/skills'

import type { TCommonComponentProps } from '@/types/common'
import { isArrayType, isEmpty } from '@/utils/checkTypes'

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
      title={data?.hero?.heading || ''}
      intro={data?.hero?.description || []}
      {...rest}
    >
      <div className="grid gap-y-12">
        {isArrayType(data?.skills) &&
          !isEmpty(data?.skills) &&
          data.skills.map((skill: TSkillsDataProps, index) => (
            <SkillsList key={index} title={skill?.name || ''}>
              {isArrayType(skill?.items) &&
                !isEmpty(skill?.items) &&
                skill.items.map((rest: TSkillsItemsProps, index) => (
                  <SkillsCardsList key={index} {...rest} />
                ))}
            </SkillsList>
          ))}
      </div>
    </ContentLayout>
  )
}

export default SkillsApp
