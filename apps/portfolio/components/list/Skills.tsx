'use client'

import { FC, useId } from 'react'

import SectionLayout from '@/components/layouts/Section'

import { TContainerProps } from '@/types/common'

export type TSkillsListProps = TContainerProps & {
  title: string
}

/**
 * Renders the skills list component.
 * @param id - The additional ID for the component.
 * @param title - The title of the skills list.
 * @param children - The children of the skills list.
 * @param rest - The rest of the props of the skills list.
 * @returns The rendered skills list component.
 */
const SkillsList: FC<TSkillsListProps> = ({ id, children, title, ...rest }) => {
  const customId = useId()

  return (
    children && (
      <SectionLayout id={id || customId} title={title} {...rest}>
        <div className="space-y-16">{children}</div>
      </SectionLayout>
    )
  )
}

export default SkillsList
