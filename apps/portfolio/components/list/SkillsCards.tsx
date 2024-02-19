'use client'

import { FC } from 'react'

import Card from '@/components/Card'

import type {
  TSkillsItemsProps,
  TSkillsItemsTechnologiesProps
} from '@/data/skills'

import { isArrayType, isEmpty, isStringType } from '@/utils/checkTypes'

import type { TCommonComponentProps } from '@/types/common'

export type TSkillsCardsListProps = TCommonComponentProps &
  Pick<TSkillsItemsProps, 'title' | 'description' | 'technologies'> & {
    cta?: Array<{
      projects: string[]
      text: string
    }> | null
  }

/**
 * Renders the skills cards list component.
 * @param title - The title of the skill.
 * @param description - The description of the skill.
 * @param technologies - The technologies used in the skill.
 * @param cta - The call to action for the skill.
 * @param rest - The rest of the props.
 * @returns The rendered skills cards list component.
 */
const SkillsCardsList: FC<TSkillsCardsListProps> = ({
  title,
  description,
  technologies,
  cta,
  ...rest
}) => {
  return (
    <Card as="article" {...rest}>
      {isStringType(title) && title?.length > 0 && (
        <Card.Title as="h3" title={title}>
          {title}
        </Card.Title>
      )}

      {isArrayType(description) &&
        !isEmpty(description) &&
        description.map(text => (
          <Card.Description key={text}>{text}</Card.Description>
        ))}

      {isArrayType(technologies) && !isEmpty(technologies) && (
        <div className="flex flex-row items-start gap-x-6 my-2">
          <Card.Eyebrow
            as="h4"
            className="text-rose-400 dark:text-rose-500 text-base"
          >
            Technologies
          </Card.Eyebrow>

          <Card.Eyebrow
            as="ul"
            className="flex-wrap gap-x-4 text-zinc-400 dark:text-zinc-500"
          >
            {technologies.map(
              ({ name, link }: TSkillsItemsTechnologiesProps, index) =>
                isStringType(link) &&
                !isEmpty(link) &&
                isStringType(name) &&
                !isEmpty(name) && (
                  <li key={index}>
                    <a
                      href={link}
                      className="hover:text-amber-500 dark:hover:text-amber-400 transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {name}
                    </a>
                  </li>
                )
            )}
          </Card.Eyebrow>
        </div>
      )}

      {isArrayType(cta) && !isEmpty(cta) && (
        <span className="flex items-start gap-x-4">
          {cta.map(({ projects, text }, index) => {
            const projectCtaText = 'See projects'

            !isEmpty(projects) && (text = projectCtaText)

            return (
              !isEmpty(projects) && (
                <Card.Cta key={index} title={text}>
                  {text}
                </Card.Cta>
              )
            )
          })}
        </span>
      )}
    </Card>
  )
}

export default SkillsCardsList
